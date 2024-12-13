"use server";

import crypto from "crypto";

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
    const redirectUrl = process.env.NEXT_PUBLIC_APP_URL + "/checkout/success";
    const ipnUrl = process.env.NEXT_PUBLIC_APP_URL + "/momo-webhook";
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
