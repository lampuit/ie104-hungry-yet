import Login from "@/components/auth/login";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function Signin() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  // if (!session || !session.user) redirect("/login");
  // if (!(session.user.role === "admin" || session.user.role === "staff")) redirect("/");

  return (
    <Login />
  );
}
