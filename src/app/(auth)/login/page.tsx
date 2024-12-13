import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/login";

export default async function LoginPage() {
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

  // If no session or user is not logged in, show the login component
  return <LoginForm />;
}

