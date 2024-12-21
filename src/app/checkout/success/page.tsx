import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-green-50">
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-white p-8 text-center shadow-lg">
        <CircleCheck className="size-16 stroke-green-500" />
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Thanh toán thành công!
        </h1>
        <p className="mb-6 text-gray-600">
          Cảm ơn bạn đã đặt đồ ăn. Hóa đơn và thông tin chi tiết sẽ được hiển
          thị trong phần thông tin đơn hàng.
        </p>
        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
          <Button className="inline-block rounded-lg bg-amber-500 px-4 py-2 font-medium text-white hover:bg-amber-600">
            <Link href="/account/history">Chi tiết đơn hàng</Link>
          </Button>
          <Button className="inline-block rounded-lg bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600">
            <Link href="/">Quay về trang chủ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
