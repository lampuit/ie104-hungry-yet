import { CreateForm } from "@/components/dashboard/product/create-form";
import { db } from "@/drizzle/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Create() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session || !session.user) redirect("/login");
  if (session.user.role === "customer") redirect("/");
  if (session.user.role !== "admin") redirect("/dashboard");

  const categories = await db.query.categories.findMany();

  return (
    <div className="flex-1 p-4">
      <CreateForm categories={categories} />
    </div>
  );
}
