import { CreateForm } from "@/components/dashboard/product/create-form";
import { Button } from "@/components/ui/button";
import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema/project";
import { PlusCircle } from "lucide-react";
import { Suspense } from "react";

export default async function Create() {
  const categories = await db.query.categories.findMany();

  return (
    <div className="flex-1 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <CreateForm categories={categories} />
      </Suspense>
    </div>
  );
}
