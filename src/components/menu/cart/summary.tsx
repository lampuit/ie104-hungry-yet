"use client";
import { Button } from "@/components/ui/button"
import { ShoppingCart, Tag } from "lucide-react"
import { useRouter } from "next/navigation";
import Link from "next/link"
interface MoneyProps {
    totalAmount: string
}

export function Summary({ totalAmount }: MoneyProps) {
    const router = useRouter();
    const userId = sessionStorage.getItem('userId');

    return (
        <div className="flex flex-col">
            {/* <div className="flex justify-end items-center py-4 gap-32">
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
                            discount.toDate && new Date(discount.toDate) > new Date() &&
                            <div key={discount.id} className="flex justify-between items-center gap-4">
                                <Label>{discount.code}</Label>
                                <Button onClick={() => {
                                    setDiscountPercent(discount?.discount ?? 0);
                                }} className="bg-amber-500 hover:bg-amber-500 hover:drop-shadow-lg">Chọn</Button>
                            </div>
                        )))}
                    </DialogContent>
                </Dialog>
            </div> */}
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
        </div>
    )
}