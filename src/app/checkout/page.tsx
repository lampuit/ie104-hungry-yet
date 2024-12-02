"use client";
import { Checkout } from "@/components/checkout/checkout";
import { getCartsByUserId } from "@/lib/data";
import { useSearchParams } from "next/navigation";



export default async function CheckoutPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || "";
  const carts = await getCartsByUserId(userId);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      <Checkout carts={carts} />
    </div>
  );
}
