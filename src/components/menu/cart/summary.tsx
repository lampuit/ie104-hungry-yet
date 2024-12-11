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
        <div className="flex flex-col md:flex-row justify-between items-center py-4 md:py-8 px-2 md:px-8 bg-white rounded-lg shadow-[0_-4px_10px_rgba(0,0,0,0.1)] w-11/12 sm:w-3/4">
            {/* Shopping Cart Icon */}
            <div className="mb-4 md:mb-0 relative">
                <ShoppingCart size={32} className="stroke-red-500" />
                <p className="absolute text-center left-3/4 bottom-3/4 p-[2px] text-[0.5rem] font-semibold w-4 h-4 bg-red-500 text-white rounded-full">{totalAmount}</p>
            </div>

            <div className="flex justify-end items-center gap-6 lg:gap-16">
                {/* Total Payment Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-1 md:gap-4 lg:gap-6">
                    <p className="font-semibold text-base md:text-xl lg:text-2xl text-center md:text-start">
                        Tổng thanh toán:
                    </p>
                    <p className="font-bold text-2xl lg:text-3xl text-red-500 text-center">
                        {totalPrice}
                    </p>
                </div>

                {/* Checkout Button */}
                <Button
                    onClick={() => {
                        router.push(`/checkout?userId=${userId}`);
                    }}
                    className="font-semibold text-base md:text-lg lg:text-xl p-4 lg:p-6 bg-red-500 hover:bg-red-600 hover:shadow-lg text-center"
                >
                    Thanh toán
                </Button>
            </div>

        </div>
    );
}
