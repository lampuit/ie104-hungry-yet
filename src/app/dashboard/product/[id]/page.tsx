import { db } from "@/drizzle/db";
import { EditForm } from "@/components/dashboard/product/edit-form";
import { products } from "@/drizzle/schema/project";
import { eq } from "drizzle-orm";

export default async function Edit({ params }: { params: { id: string } }) {
  const categories = db.query.categories.findMany();
  const product = db.query.products.findFirst({
    where: eq(products.id, params.id),
  });

  const data = await Promise.all([categories, product]);

  console.log(data);

  return (
    <div className="flex-1 p-4">
      <EditForm categories={data[0]} products={data[1]} />
    </div>
  );
}
