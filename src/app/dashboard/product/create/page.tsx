import { CreateForm } from "@/components/dashboard/product/create-form";
import { db } from "@/drizzle/db";

export default async function Create() {
  const categories = await db.query.categories.findMany();

  return (
    <div className="flex-1 p-4">
      <CreateForm categories={categories} />
    </div>
  );
}
