"use server";

import { db } from "@/drizzle/db";
import { invoices, orders, payments } from "@/drizzle/schema/project";
import { createMomoPayment } from "@/lib/actions/payment";
import { eq } from "drizzle-orm";
import { clearCart } from "./cart";

export async function submitPayment(
  carts: any[],
  totalAmount: number,
  discountId: string | undefined,
  paymentMethod: any,
  userId: string,
  address: string,
  time: number,
) {
  try {
    const [payment] = await db
      .insert(payments)
      .values({
        method: paymentMethod,
        status: "pending",
      })
      .returning();

    const [invoice] = await db
      .insert(invoices)
      .values({
        customerId: userId,
        paymentId: payment.id,
        discountId,
        totalAmount,
        deliveryAddress: address,
        deliveryTime: time,
        status: "pending",
      })
      .returning();

    await db.insert(orders).values(
      carts.map((cart) => ({
        invoiceId: invoice.id,
        productId: cart.productId,
        quantity: cart.quantity,
      })),
    );

    let paymentResult;

    if (paymentMethod == "momo") {
      paymentResult = await createMomoPayment(
        invoice.id,
        payment.id,
        totalAmount,
        `Hóa đơn #${new Date().getTime()}`,
        carts,
      );

      if (paymentResult.success && paymentResult.payUrl) {
        await db
          .update(invoices)
          .set({ status: "accepted" })
          .where(eq(invoices.id, payment.id));

        return { success: true, paymentUrl: paymentResult.payUrl };
      } else {
        await db
          .update(invoices)
          .set({ status: "cancelled" })
          .where(eq(invoices.id, payment.id));

        await db
          .update(payments)
          .set({ status: "failed" })
          .where(eq(payments.id, payment.id));

        throw new Error(paymentResult.error || "Thanh toán thất bại");
      }
    } else if (paymentMethod == "paylater") {
      await db
        .update(invoices)
        .set({ status: "accepted" })
        .where(eq(invoices.id, payment.id));

      await db
        .update(payments)
        .set({ status: "success" })
        .where(eq(payments.id, payment.id));

      await clearCart(userId);

      return { success: true };
    }

    throw new Error("Thanh toán không hợp lệ");
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Thanh toán không thành công",
    };
  }
}
