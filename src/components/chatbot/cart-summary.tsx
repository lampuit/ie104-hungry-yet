import { columns } from "@/components/checkout/columns";
import { DataTable } from "@/components/checkout/data-table";
import { Separator } from "@/components/ui/separator";

function DongFormat(number: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
}

export function CartSummary({
  carts,
  subtotal,
}: {
  carts: any[];
  subtotal: number;
}) {
  return carts.length > 0 ? (
    <div className="w-[650px] space-y-4 rounded-md border">
      <DataTable columns={columns} data={carts} />
      <div className="flex justify-between p-4 font-bold">
        <span>Tổng</span>
        <span>{DongFormat(subtotal)}</span>
      </div>
    </div>
  ) : null;
}
