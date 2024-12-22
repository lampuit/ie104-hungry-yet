"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { getSession } from "@/lib/auth-client";

// Lấy userId từ session
const fetcherUserId = async () => {
  const response = await getSession();
  const userId = response?.data?.user?.id as string;
  return userId;
};

interface MoneyProps {
  totalPrice: string;
  totalAmount: number;
}

export function Summary({ totalPrice, totalAmount }: MoneyProps) {
  const router = useRouter();
  const { data: userId } = useSWR("userId", fetcherUserId);

  return (
    <div className="flex w-11/12 flex-col items-center justify-between rounded-lg bg-white px-2 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] md:flex-row md:px-8 md:py-8 lg:w-3/4">
      {/* Shopping Cart Icon */}
      <div className="relative mb-4 md:mb-0">
        <ShoppingCart size={32} className="stroke-red-500" />
        <p className="absolute bottom-3/4 left-3/4 h-4 w-4 rounded-full bg-red-500 p-[2px] text-center text-[0.5rem] font-semibold text-white">
          {totalAmount}
        </p>
      </div>

      <div className="flex items-center justify-end gap-6 lg:gap-16">
        {/* Total Payment Section */}
        <div className="flex flex-col items-center justify-between gap-1 md:flex-row md:gap-4 lg:gap-6">
          <p className="text-center text-base font-semibold md:text-start md:text-xl lg:text-2xl">
            Tổng thanh toán:
          </p>
          <p className="text-center text-2xl font-bold text-red-500 lg:text-3xl">
            {totalPrice}
          </p>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={() => {
            router.push(`/checkout?userId=${userId}`);
          }}
          className="bg-red-500 p-4 text-center text-base font-semibold hover:bg-red-600 hover:shadow-lg md:text-lg lg:p-6 lg:text-xl"
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
}
