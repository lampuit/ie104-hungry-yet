import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCart, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


export function AccountFavorite() {
    return (
        <div className="bg-white rounded shadow border-b-2 relative">
            <div className="flex gap-7 p-4 items-end">
                <Image className="rounded" src={"/images/long1.jpg"} alt="review" width={120} height={180}></Image>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">Tên món ăn</p>
                            </div>
                            <p className="text-amber-500">Phân loại</p>
                        </div>
                        <p className="text-lg flex gap-2 items-center">
                            Giá: <span className="text-red-500 font-semibold text-2xl">45000đ</span>
                        </p>
                    </div>
                    <div className="flex gap-4 items-end justify-end">
                        <Button variant={"outline"}>Xem chi tiết</Button>
                        <Button className="bg-amber-500">
                            <ShoppingCart /> Thêm giỏ hàng
                        </Button>
                    </div>
                </div>
            </div>
            <div className="absolute top-1 right-1">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <X className="bg-red-500 text-white rounded-sm hover:bg-red-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Bỏ yêu thích</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}