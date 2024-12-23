import { Checkout } from "@/components/checkout/checkout";
import { getCartsByUserId } from "@/lib/data";
import { redirect, useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function CheckoutPage() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) redirect("/login");

  const carts = await getCartsByUserId(session.user.id);

  if (!carts.length) redirect("/menu");

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="p-4">
        <h1 className="mb-8 text-3xl font-bold">Thanh toán</h1>
        <div>
          <Checkout carts={carts} userId={session.user.id} />
        </div>
      </div>
    </Suspense>
  );
}
