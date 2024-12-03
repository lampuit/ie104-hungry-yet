"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Eye, ShoppingCart, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import LoadingSpinner from "../ui/loading-spinner";
import { createCart } from "@/lib/actions/cart";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { deleteFavorite } from "@/lib/actions/favorite";
import { getSession } from "@/lib/auth-client";
import useSWR from "swr";

//get userId from session
const fetcherUserId = async () => {
    const response = await getSession();
    const userId = response?.data?.user?.id as string;
    return userId;
};

export function AccountFavorite({ listFavorite, isLoading, mutate }: { listFavorite: any, isLoading: boolean, mutate: any }) {
    const { data: userId } = useSWR('userId', fetcherUserId);
    const router = useRouter();

    const convertToVND = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    }

    const handleDeleteFavorite = async (userId: string, productId: string) => {
        try {
            await deleteFavorite(userId, productId);
            toast.success("Xóa yêu thích thành công");
            // router.push("/account/favorite");
            mutate();
        } catch (error) {
            console.error("Error deleting favorite:", error);
            toast("Xóa yêu thích thất bại");
        }
    };
    return (
        listFavorite?.map((item: any) => (
            isLoading ? <LoadingSpinner key={item.id} /> :
                <div key={item.id} className="bg-white rounded shadow-md border-b-2 relative p-4">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-7 items-start md:items-end">
                        <div className="flex flex-col h-full justify-center">
                            <Image
                                className="rounded w-full md:w-auto"
                                src={item?.products.imageUrl}
                                alt="review"
                                width={120}
                                height={180}
                            />
                        </div>

                        {/* Nội dung */}
                        <div className="flex flex-col gap-4 md:gap-6 flex-1">
                            {/* Thông tin món ăn */}
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <p className="text-lg font-semibold">{item?.products?.name}</p>
                                    </div>
                                    <p className="text-amber-500">{item.products.category.name}</p>
                                </div>
                                <p className="text-lg flex gap-2 items-center">
                                    Giá: <span className="text-red-500 font-semibold text-2xl">{convertToVND(item?.products.price) || '0'}</span>
                                </p>
                            </div>

                            {/* Nút hành động */}
                            <div className="flex gap-2 md:gap-4 items-center justify-between md:justify-end">
                                <Button
                                    onClick={() => {
                                        console.log("Xem chi tiết");
                                        router.push(`/product-detail?id=${item?.productId}`);
                                    }}
                                    variant={"outline"}
                                    className="text-xs flex-grow md:flex-grow-0"
                                >
                                    <Eye />Xem chi tiết
                                </Button>
                                <Button
                                    className="bg-amber-500 text-xs flex-grow md:flex-grow-0"
                                    onClick={async () => {
                                        try {
                                            const data = new FormData();
                                            if (userId) {
                                                data.append("userId", userId);
                                            }
                                            data.append("productId", item?.productId);
                                            data.append("quantity", '1');
                                            await createCart(data);
                                            toast.success("Thêm vào giỏ hàng thành công");
                                        } catch (error) {
                                            console.error(error);
                                            toast.error("Thêm vào giỏ hàng thất bại");
                                        }

                                    }}
                                >
                                    <ShoppingCart /> Thêm giỏ hàng
                                </Button>
                            </div>
                        </div>
                    </div >
                    {/* Nút xóa yêu thích */}
                    <div className="absolute top-1 right-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="w-6 h-6 text-white bg-gray-200 hover:bg-red-500 hover:text-white"
                                        onClick={() => handleDeleteFavorite(item?.userId, item?.productId)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Bỏ yêu thích</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div >
        ))
    );
}
