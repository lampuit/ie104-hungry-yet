import { ShiftManagement } from "@/components/shift/shift-management";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Shift() {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  if (!session || !session.user) redirect("/login");
  if (session.user.role === "customer") redirect("/");
  if (session.user.role !== "admin") redirect("/dashboard");
  
  return <ShiftManagement />;
}
