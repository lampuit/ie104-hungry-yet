import { unstable_cache } from "next/cache";

import { DataTable } from "@/components/dashboard/product/data-table";
import { columns } from "@/components/dashboard/product/columns";
import { db } from "@/drizzle/db";
import { categories, products } from "@/drizzle/schema/project";
import { eq, getTableColumns } from "drizzle-orm";
import { Suspense } from "react";

const getProducts = unstable_cache(
  async () => {
    return await db
      .select({
        ...getTableColumns(products),
        categoryName: categories.name,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id));
  },
  ["products"],
  { revalidate: 3600, tags: ["products"] },
);

export default async function Product() {
  const products = await getProducts();

  return (
    <div className="flex-1 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={products} />
      </Suspense>
    </div>
  );
}
