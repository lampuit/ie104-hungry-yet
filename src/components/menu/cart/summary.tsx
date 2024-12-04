"use client";
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
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
    totalAmount: string
}

export function Summary({ totalAmount }: MoneyProps) {
    const router = useRouter();
    const { data: userId, error: userIdError } = useSWR("userId", fetcherUserId);

    return (
        <div className="flex justify-between item-center py-2">
            <ShoppingCart size={32} className="stroke-red-500" />
            <div className="flex justify-end items-center gap-32">
                <div className="flex justify-between items-center gap-6">
                    <p className="font-semibold text-2xl">Tổng thanh toán: </p>
                    <p className="font-semibold text-3xl text-red-500">{totalAmount}</p>
                </div>

                <Button onClick={() => {
                    router.push(`/checkout?userId=${userId}`)
                }} className="font-bold text-xl p-6 bg-red-500 hover:bg-red-500 hover:drop-shadow-lg">
                    Thanh toán
                </Button>

            </div>
        </div>
    )
}