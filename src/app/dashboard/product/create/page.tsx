import { CreateForm } from "@/components/dashboard/product/create-form";
import { Button } from "@/components/ui/button";
import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema/project";
import { PlusCircle } from "lucide-react";
import { unstable_cache } from "next/cache";
import { Suspense } from "react";

const getCategories = unstable_cache(
  async () => {
    return await db.query.categories.findMany();
  },
  ["categories"],
  { revalidate: 3600, tags: ["categories"] },
);

export default async function Create() {
  const categories = await getCategories();

  console.log(categories);

  return (
    <div className="flex-1 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <CreateForm categories={categories} />
      </Suspense>
    </div>
  );
}
