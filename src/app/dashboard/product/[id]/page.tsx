import { EditForm } from "@/components/dashboard/product/edit-form";
import { fetchProductId } from "@/lib/data";

export default async function Edit({ params }: { params: { id: string } }) {
  const [categories, product] = await fetchProductId(params.id);

  return (
    <div className="flex-1 p-4">
      <EditForm categories={categories} product={product} />
    </div>
  );
}
