import { db } from "@/drizzle/db";
import { EditForm } from "@/components/dashboard/product/edit-form";
import { products } from "@/drizzle/schema/project";
import { eq } from "drizzle-orm";
import { Suspense } from "react";
import { EditSkeleton } from "@/components/dashboard/product/edit-skeleton";

export default async function Edit({ params }: { params: { id: string } }) {
  const [categories, product] = await Promise.all([
    db.query.categories.findMany(),
    db.query.products.findFirst({
      where: eq(products.id, params.id),
    }),
  ]);

  return (
    <div className="flex-1 p-4">
      <Suspense fallback={<EditSkeleton />}>
        <EditForm categories={categories} product={product} />
      </Suspense>
    </div>
  );
}
