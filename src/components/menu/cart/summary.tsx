"use client";
import { Button } from "@/components/ui/button"
import { ShoppingCart, Tag } from "lucide-react"
import Link from "next/link"
import { getShoppingCartByUserId, fetchDiscounts } from "@/lib/data"
import useSWR from "swr"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Fetch function dùng cho SWR
const fetcher = async (userId: string) => {
    return getShoppingCartByUserId(userId);
};

const fetcherDiscount = async () => {
    return fetchDiscounts();
}

export function Summary() {

    const userId = sessionStorage.getItem("userId");
    const { data: listDish, isLoading: isLoadingDishes, error } = useSWR(userId, fetcher, {
        revalidateIfStale: true,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
    });

    const { data: discounts, isLoading: isLoadingDiscount } = useSWR("discounts", fetcherDiscount)


    const totalAmount = listDish?.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const price = parseFloat(totalAmount?.toString() || "0");
    const money = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);

    return (
        <div className="flex flex-col">
            <div className="flex justify-end items-center py-4 gap-32">
                <div className="flex items-center gap-2">
                    <Tag size={24} className="stroke-amber-500" />
                    <p className="text-xl">Mã giảm giá</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Chọn mã giảm giá</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Mã giảm giá</DialogTitle>
                            <DialogDescription>
                                Vui lòng chọn mã giảm giá bạn muốn sử dụng
                            </DialogDescription>
                        </DialogHeader>
                        {isLoadingDiscount ? (<p>Loading...</p>) : (discounts?.map((discount) => (
                            <div key={discount.id} className="flex justify-between items-center gap-4">
                                <Label>{discount.name}</Label>
                                <Button className="bg-amber-500 hover:bg-amber-500 hover:drop-shadow-lg">Chọn</Button>
                            </div>
                        )))}
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex justify-between item-center py-2">
                <ShoppingCart size={32} className="stroke-red-500" />
                <div className="flex justify-end items-center gap-32">
                    <div className="flex justify-between items-center gap-6">
                        <p className="font-semibold text-2xl">Tổng thanh toán: </p>
                        <p className="font-semibold text-3xl text-red-500">{money}</p>
                    </div>
                    <Link href="/checkout">
                        <Button className="font-bold text-xl px-5 py-3 bg-red-500 hover:bg-red-500 hover:drop-shadow-lg">
                            Thanh toán
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}