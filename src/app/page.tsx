import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: headers(), // you need to pass the headers object.
  });

  return <div>{session?.user.id}</div>;
}
