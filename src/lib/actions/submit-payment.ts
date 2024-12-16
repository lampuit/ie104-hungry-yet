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
  deliveryAddress: string,
  time: number,
  note: string,
  phone: string,
  append?: any,
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
        deliveryAddress: deliveryAddress,
        deliveryTime: time,
        note: note,
        phone: phone,
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
        userId,
        totalAmount,
        `Hóa đơn #${new Date().getTime()}`,
        carts,
      );

      if (paymentResult.success && paymentResult.payUrl) {
        await db
          .update(payments)
          .set({ payUrl: paymentResult.payUrl })
          .where(eq(payments.id, payment.id));

        await clearCart(userId);

        if (append) {
          append({
            role: "assistant",
            content: `Người dùng đặt tạo đơn hàng mới ${invoice.id}`,
            appear: false,
          });
        }

        return { success: true, paymentUrl: paymentResult.payUrl };
      } else {
        await db
          .update(invoices)
          .set({ status: "cancelled" })
          .where(eq(invoices.id, invoice.id));

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
        .where(eq(invoices.id, invoice.id));

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
