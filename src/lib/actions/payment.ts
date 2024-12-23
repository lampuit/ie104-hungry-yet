"use server";

import crypto from "crypto";

import { db } from "@/drizzle/db";
import { invoices, orders, payments } from "@/drizzle/schema/project";
import { eq } from "drizzle-orm";
import { clearCart } from "./cart";

export async function createMomoPayment(
  invoiceId: string,
  paymentId: string,
  userId: string,
  amount: number,
  orderInfo: string,
  carts: any[],
) {
  try {
    const accessKey = process.env.MOMO_ACCESS_KEY!;
    const secretKey = process.env.MOMO_SECRET_KEY!;
    const partnerCode = process.env.MOMO_PARTNER_CODE!;
    const redirectUrl = process.env.NEXT_PUBLIC_APP_URL + "/checkout/invoice";
    const ipnUrl = process.env.NEXT_PUBLIC_APP_URL + "/api/momo-webhook";
    const requestType = "payWithMethod";
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const extraData = `${invoiceId}_${paymentId}_${userId}`;
    const autoCapture = true;
    const lang = "vi";

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    const items = carts.map((cart) => ({
      id: cart.userId + cart.productId,
      name: cart.product.name,
      description: cart.product.description,
      category: cart.product.category.name,
      imageUrl: cart.product.imageUrl,
      price: cart.product.price,
      quantity: cart.quantity,
      totalPrice: cart.quantity * cart.product.price,
    }));

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang,
      items,
      requestType,
      autoCapture,
      extraData,
      orderGroupId: "",
      signature,
    };

    const response = await fetch(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      throw new Error(`Thanh toán thất bại: ${response.status}`);
    }

    const result = await response.json();

    if (result.resultCode !== 0) {
      throw new Error(result.message);
    }

    return { success: true, payUrl: result.payUrl };
  } catch (error) {
    console.error("Thanh toán momo lỗi: ", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Thanh toán thất bại",
    };
  }
}

export async function submitPayment(
  carts: any[],
  discountId: string | null,
  totalAmount: number,
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

        return {
          success: true,
          paymentUrl: paymentResult.payUrl,
          invoiceId: invoice.id,
        };
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

      return { success: true, invoiceId: invoice.id };
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
