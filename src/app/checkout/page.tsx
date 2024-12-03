"use client";
import { Checkout } from "@/components/checkout/checkout";
import { getCartsByUserId } from "@/lib/data";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import LoadingSpinner from "@/components/ui/loading-spinner";

const fetcher = async (userId: string) => {
  return getCartsByUserId(userId);
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || "";
  const { data: carts, isLoading, error } = useSWR(userId, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  return (
    isLoading ? <LoadingSpinner /> :
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
        <Checkout carts={carts || []} />
      </div>
  );
}
