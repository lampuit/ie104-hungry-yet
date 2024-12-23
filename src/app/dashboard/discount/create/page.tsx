import { CreateForm } from "@/components/dashboard/discount/create-form";
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
  return (
    <div className="max-w-md p-4">
      <div className="rounded-sm border p-4">
        <CreateForm />
      </div>
    </div>
  );
}
