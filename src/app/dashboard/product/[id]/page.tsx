import { EditForm } from "@/components/dashboard/product/edit-form";
import { auth } from "@/lib/auth";
import { fetchProductId } from "@/lib/data";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Edit({ params }: { params: { id: string } }) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session || !session.user) redirect("/login");
  if (session.user.role === "customer") redirect("/");
  if (session.user.role !== "admin") redirect("/dashboard");

  const [categories, product] = await fetchProductId(params.id);

  return (
    <div className="flex-1 p-4">
      <EditForm categories={categories} product={product} />
    </div>
  );
}
