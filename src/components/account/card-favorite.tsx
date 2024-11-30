"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Eye, ShoppingCart, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getFavoriteByUserId } from "@/lib/data";
import useSWR from "swr";
import LoadingSpinner from "../ui/loading-spinner";

export const favoriteFetcher = async (userId: string) => {
    return await getFavoriteByUserId(userId);
}

export function AccountFavorite() {
    const userId = sessionStorage.getItem("userId");

    const { data, isLoading, error } = useSWR(userId, favoriteFetcher);

    const convertToVND = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    }

    return (
        isLoading ? <LoadingSpinner /> :
            data?.map((item: any, index: any) => (
                <div className="bg-white rounded shadow-md border-b-2 relative p-4">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-7 items-start md:items-end">
                        {/* Hình ảnh */}
                        <Image
                            className="rounded w-full md:w-auto"
                            src={new URL(item.imageUrl).toString()}
                            alt="review"
                            width={120}
                            height={180}
                        />

                        {/* Nội dung */}
                        <div className="flex flex-col gap-4 md:gap-6 flex-1">
                            {/* Thông tin món ăn */}
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <p className="text-lg font-semibold">{item.productName}</p>
                                    </div>
                                    <p className="text-amber-500">Phân loại</p>
                                </div>
                                <p className="text-lg flex gap-2 items-center">
                                    Giá: <span className="text-red-500 font-semibold text-2xl">{convertToVND(item.productPrice)}</span>
                                </p>
                            </div>

                            {/* Nút hành động */}
                            <div className="flex gap-2 md:gap-4 items-center justify-between md:justify-end">
                                <Button
                                    variant={"outline"}
                                    className="text-xs flex-grow md:flex-grow-0"
                                >
                                    <Eye />Xem chi tiết
                                </Button>
                                <Button
                                    className="bg-amber-500 text-xs flex-grow md:flex-grow-0"
                                >
                                    <ShoppingCart /> Thêm giỏ hàng
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* Nút xóa yêu thích */}
                    <div className="absolute top-1 right-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <X className="text-white bg-gray-200 p-1 rounded hover:bg-red-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Bỏ yêu thích</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            ))
    );
}
