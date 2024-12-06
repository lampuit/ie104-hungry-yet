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
    totalAmount: string;
}

export function Summary({ totalAmount }: MoneyProps) {
    const router = useRouter();
    const { data: userId } = useSWR("userId", fetcherUserId);

    return (
        //
        <div className="flex flex-col md:flex-row justify-between items-center py-4 px-2 md:px-8 bg-gray-100 rounded-lg shadow-md w-5/6">
            {/* Shopping Cart Icon */}
            <div className="mb-4 md:mb-0">
                <ShoppingCart size={32} className="stroke-red-500" />
            </div>

            <div className="flex justify-end items-center gap-8 lg:gap-16">
                {/* Total Payment Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
                    <p className="font-semibold text-xl lg:text-2xl text-center md:text-start">
                        Tổng thanh toán:
                    </p>
                    <p className="font-bold text-2xl lg:text-3xl text-red-500 text-center">
                        {totalAmount}
                    </p>
                </div>

                {/* Checkout Button */}
                <Button
                    onClick={() => {
                        router.push(`/checkout?userId=${userId}`);
                    }}
                    className="font-semibold text-lg md:text-xl p-4 md:p-6 bg-red-500 hover:bg-red-600 hover:shadow-lg text-center"
                >
                    Thanh toán
                </Button>
            </div>

        </div>
    );
}
