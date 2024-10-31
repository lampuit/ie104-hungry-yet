import { CreateForm } from "@/components/dashboard/product/create-form";
import { Button } from "@/components/ui/button";
import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema/project";
import { PlusCircle } from "lucide-react";

export default async function Create() {
  const categories = await db.query.categories.findMany();

  console.log(categories);

  return (
    <div className="flex-1 p-4">
      <CreateForm categories={categories} />
    </div>
  );
}
