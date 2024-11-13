import { Button } from "@/components/ui/button"
import { ShoppingCart, Tag } from "lucide-react"

export function Summary() {
    return (
        <div className="flex flex-col">
            <div className="flex justify-end items-center py-4 gap-32">
                <div className="flex items-center gap-2">
                    <Tag size={24} className="stroke-amber-500"/>
                    <p className="text-xl">Mã giảm giá</p>
                </div>
                <p className="font-semibold text-sm text-sky-500 px-4">Chọn mã giảm giá</p>
            </div>
            <div className="flex justify-between item-center py-2">
                <ShoppingCart size={32} className="stroke-red-500"/>
                <div className="flex justify-end items-center gap-32">
                    <div className="flex justify-between items-center gap-6">
                        <p className="font-semibold text-2xl">Tổng thanh toán: </p>
                        <p className="font-semibold text-3xl text-red-500">100.000<span className="font-normal text-2xl">đ</span></p>
                    </div>
                    <Button className="font-bold text-xl px-5 py-3 bg-red-500 hover:bg-red-500 hover:drop-shadow-lg">
                        Thanh toán
                    </Button>
                </div>
            </div>
        </div>
    )
}