import { Separator } from "@/components/ui/separator";

function DongFormat(number: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
}

export function OrderSummary({
  subtotal,
  discount,
  total,
}: {
  subtotal: number;
  discount: number;
  total: number;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span>Tạm tính</span>
        <span>{DongFormat(subtotal)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Giảm giá</span>
          <span>-{DongFormat(discount)}</span>
        </div>
      )}
      <Separator />
      <div className="flex justify-between font-bold">
        <span>Tổng</span>
        <span>{DongFormat(total)}</span>
      </div>
    </div>
  );
}
