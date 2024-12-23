import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { invoices, payments } from "@/drizzle/schema/project";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const accessKey = process.env.MOMO_ACCESS_KEY!;
    const secretKey = process.env.MOMO_SECRET_KEY!;

    const rawSignature = `accessKey=${accessKey}&amount=${body.amount}&extraData=${body.extraData}&message=${body.message}&orderId=${body.orderId}&orderInfo=${body.orderInfo}&orderType=${body.orderType}&partnerCode=${body.partnerCode}&payType=${body.payType}&requestId=${body.requestId}&responseTime=${body.responseTime}&resultCode=${body.resultCode}&transId=${body.transId}`;

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    if (signature !== body.signature) {
      return NextResponse.json({ message: "Sai Signature" }, { status: 400 });
    }

    const invoiceId = body.extraData.split("_")[0];
    const paymentId = body.extraData.split("_")[1];

    let paymentStatus: any;
    let invoiceStatus: any;

    switch (body.resultCode) {
      case 0:
        paymentStatus = "success";
        invoiceStatus = "accepted";

        break;
      case 9000:
        paymentStatus = "pending";
        invoiceStatus = "pending";
        break;
      default:
        paymentStatus = "failed";
        invoiceStatus = "cancelled";
    }

    await db
      .update(invoices)
      .set({ status: invoiceStatus })
      .where(eq(invoices.id, invoiceId));

    await db
      .update(payments)
      .set({ status: paymentStatus })
      .where(eq(payments.id, paymentId));

    return NextResponse.json({
      message: "Xử lý đơn thành công",
      paymentStatus,
      invoiceStatus,
    });
  } catch (error) {
    console.error("Lỗi trong lúc thanh toán: ", error);
    return NextResponse.json(
      { message: "Lỗi trong lúc thanh toán" },
      { status: 500 },
    );
  }
}
