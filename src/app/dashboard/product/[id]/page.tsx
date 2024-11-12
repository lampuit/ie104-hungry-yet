import { db } from "@/drizzle/db";
import { EditForm } from "@/components/dashboard/product/edit-form";
import { products } from "@/drizzle/schema/project";
import { eq } from "drizzle-orm";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";

export default async function Edit({ params }: { params: { id: string } }) {
  const getProductWithCatgories = unstable_cache(
    async () => {
      return await Promise.all([
        db.query.categories.findMany(),
        db.query.products.findFirst({
          where: eq(products.id, params.id),
        }),
      ]);
    },
    [params.id],
    { revalidate: 60, tags: ["product"] },
  );

  const [categories, product] = await getProductWithCatgories();

  console.log(product);

  return (
    <div className="flex-1 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <EditForm categories={categories} product={product} />
      </Suspense>
    </div>
  );
}
