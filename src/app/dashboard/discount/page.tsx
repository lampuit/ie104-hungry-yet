import { columns } from "@/components/dashboard/discount/columns";
import { DataTable } from "@/components/dashboard/discount/data-table";
import { db } from "@/drizzle/db";
import { unstable_cache } from "next/cache";
import { Suspense } from "react";

const getDiscounts = unstable_cache(
  async () => {
    return await db.query.discounts.findMany();
  },
  ["discounts"],
  { revalidate: 3600, tags: ["discounts"] },
);

export default async function Discount() {
  const discounts = await getDiscounts();

  return (
    <div className="flex-1 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={discounts} />
      </Suspense>
    </div>
  );
}
