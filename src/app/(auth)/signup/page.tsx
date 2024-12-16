import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import FormSignUp from "@/components/auth/signup";

export default async function Signup() {

  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (session?.user) {
    if (session.user.role === "admin" || session.user.role === "staff") {
      redirect("/dashboard"); // Redirect to admin/staff dashboard
    } else {
      redirect("/"); // Redirect to home page for other authenticated users
    }
  }

  return (
    <FormSignUp />
  );
}
