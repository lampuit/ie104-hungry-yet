import { DataTable } from "@/components/dashboard/product/data-table";
import { columns } from "@/components/dashboard/product/columns";
import { fetchProducts } from "@/lib/data";

export default async function Product() {
  const products = await fetchProducts();

  return (
    <div className="flex-1 p-4">
      <DataTable columns={columns} data={products} />
    </div>
  );
}
