import { notFound, redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleCheck, AlertCircle, Clock } from "lucide-react";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { invoices, payments } from "@/drizzle/schema/project";
import { db } from "@/drizzle/db";

type PaymentStatus = "success" | "failed" | "pending";

const statusConfig = {
  success: {
    icon: CircleCheck,
    color: "green",
    title: "Thanh toán thành công!",
  },
  failed: {
    icon: AlertCircle,
    color: "red",
    title: "Thanh toán không thành công",
  },
  pending: {
    icon: Clock,
    color: "amber",
    title: "Thanh toán đang xử lý",
  },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const invoiceId = (searchParams.extraData as string)?.split("_")[0];
  const paymentId = (searchParams.extraData as string)?.split("_")[1];

  if (!invoiceId || !paymentId) {
    notFound();
  }

  const invoice = await db.query.invoices.findFirst({
    where: eq(invoices.id, invoiceId),
  });

  if (!invoice) {
    notFound();
  }

  const payment = await db.query.payments.findFirst({
    where: eq(payments.id, paymentId),
  });

  if (!payment) {
    notFound();
  }

  if (payment.status == "cancelled") redirect("/");

  const status: PaymentStatus =
    payment.status == "success"
      ? "success"
      : payment.status == "pending"
        ? "pending"
        : "failed";

  const { icon: StatusIcon, color, title } = statusConfig[status];

  console.log(color);

  return (
    <div
      className={`flex h-screen items-center justify-center bg-${color}-500`}
    >
      <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-2 rounded-lg bg-white p-8 text-center shadow-lg">
        <StatusIcon className={`size-16 stroke-${color}-500`} />
        <h1 className={`mb-4 text-2xl font-bold text-${color}-800`}>{title}</h1>
        {status != "failed" && (
          <p className="mb-6 text-gray-600">
            Cảm ơn bạn đã đặt đồ ăn. Hóa đơn và thông tin chi tiết sẽ được hiển
            thị trong phần thông tin đơn hàng.
          </p>
        )}
        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
          {status == "pending" && (
            <Button asChild className="bg-amber-500 hover:bg-amber-600">
              <Link href={payment.payUrl || "/"}>Thanh toán</Link>
            </Button>
          )}
          {status == "success" && (
            <Button asChild className="bg-amber-500 hover:bg-amber-600">
              <Link href={`/account/order-detail?invoiceId=${invoiceId}`}>
                Chi tiết đơn hàng
              </Link>
            </Button>
          )}
          <Button asChild className="bg-green-500 hover:bg-green-600">
            <Link href="/">Quay về trang chủ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
