import { columns } from "@/components/dashboard/discount/columns";
import { DataTable } from "@/components/dashboard/discount/data-table";
import { auth } from "@/lib/auth";
import { fetchDiscounts } from "@/lib/data";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Discount() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session || !session.user) redirect("/login");
  if (session.user.role === "customer") redirect("/");
  if (session.user.role !== "admin") redirect("/dashboard");

  const discounts = await fetchDiscounts();

  return (
    <div className="flex-1 p-4">
      <DataTable columns={columns} data={discounts} />
    </div>
  );
}
