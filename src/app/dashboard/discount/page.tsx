import { columns } from "@/components/dashboard/discount/columns";
import { DataTable } from "@/components/dashboard/discount/data-table";
import { fetchDiscounts } from "@/lib/data";

export default async function Discount() {
  const discounts = await fetchDiscounts();

  return (
    <div className="flex-1 p-4">
      <DataTable columns={columns} data={discounts} />
    </div>
  );
}
