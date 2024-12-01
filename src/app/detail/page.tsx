"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Badge } from "@/components/ui/badge"
import { Bookmark, MessageCircle, MessageCircleMore, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DetailReview } from "@/components/detail/review"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import useSWR from "swr";
import { getFavoriteByUserId, getProductById } from "@/lib/data"
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { TbCurrencyDong } from "react-icons/tb";
import { get } from "http";
import { createFavorite } from "@/lib/actions/favorite";
import { toast } from "@/hooks/use-toast";

const fetcher = async (id: string) => {
    return await getProductById({ id });
}

const favoriteFetcher = async (userId: string) => {
    return await getFavoriteByUserId(userId);
}

interface Dish {
    categoryId: string;
    categoryName: string;
    createdAt: Date;
    des: string;
    id: string;
    imageUrl: string;
    price: number;
    name: string;
}

export default function Detail() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const userId = sessionStorage.getItem("userId");
    const { data, error } = useSWR(id, fetcher);
    const { data: favoriteData, error: favoriteError } = useSWR(userId, favoriteFetcher);
    const [favorite, setFavorite] = useState<boolean>(false);

    if (error || favoriteError) return <div>Error loading data.</div>;
    if (!data || !favoriteData) {
        return <LoadingSpinner />;
    }

    const dish: Dish = {
        categoryId: data[0]?.categoryId || "",
        categoryName: data[0]?.categoryName || "/images/fallback.jpg",
        createdAt: data[0]?.createdAt || undefined,
        des: data[0]?.description || "",
        id: data[0]?.id,
        imageUrl: data[0]?.imageUrl,
        price: data[0]?.price,
        name: data[0]?.name,
    };

    const checkFavorite = (productId: string) => {
        return favoriteData.some((item: any) => item.productId === productId);
    }

    const handleBookmarkOnClick = async (productId: string, productName: string) => {
        
    }

const convertToVND = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
}

return (
    <main>
        <section className="my-10 mx-10 w-80 text-base font-semibold">
            <Breadcrumb>
                <BreadcrumbList className="text-black">
                    <BreadcrumbItem>
                        <BreadcrumbLink className="hover:text-amber-500" href="/">Trang chủ</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="hover:text-amber-500" href="/menu">Thực đơn</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold text-amber-500">Chi tiết món ăn</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </section>
        <section className="flex justify-center">
            <div className="flex border p-5 gap-24 items-center justify-between max-w-5xl rounded-md">
                <img src={dish.imageUrl} alt={dish.name} className="w-80 h-80" />
                <div>
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <div className="flex gap-52 items-center">
                                <div className="flex gap-7 items-center">
                                    <h1 className="font-semibold text-4xl">{dish.name}</h1>
                                    <Badge variant="outline" className="rounded-md bg-amber-400">{dish.categoryName}</Badge>
                                </div>
                                <Bookmark size={28} />
                            </div>
                            <div className="space-x-24">
                                <div className="inline-flex gap-2">
                                    <Star className="fill-amber-400 stroke-amber-400 size-5" />
                                    <span>4.9</span>
                                </div>
                                <div className="inline-flex gap-2">
                                    <MessageCircleMore className="stroke-red-500 size-5" />
                                    <span>50</span>
                                </div>
                            </div>
                            <div className="flex items-center font-bold text-4xl text-red-500">{convertToVND(dish.price)}</div>
                        </div>
                        <div className="flex items-center gap-8">
                            <Button variant={"outline"}
                                className="font-semibold border-amber-500 border-2 text-amber-500 
                                    hover:bg-amber-500 hover:bg-opacity-20 hover:text-amber-500 gap-2">
                                <ShoppingCart /> <span>Thêm giỏ hàng</span>
                            </Button>
                            <Button className="font-semibold border-red-500 bg-red-500 border-2
                                    hover:bg-red-500 hover:shadow-md hover:text-white">Mua ngay</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="flex justify-center my-10">
            <div className="p-5 gap-3 max-w-5xl">
                <h1 className="font-semibold text-2xl">Mô tả món ăn</h1>
                <p className="max-w-5xl">{dish.des}</p>
            </div>
        </section>
        <section className="space-y-10 mx-10 px-5">
            <h1 className="font-semibold text-2xl">Nhận xét & Đánh giá</h1>
            <div className="flex gap-32 justify-center items-center bg-amber-400 bg-opacity-20 rounded-md px-20 py-16">
                <div className="gap-4">
                    <h1 className="font-semibold text-5xl text-red-500">4.9</h1>
                    <div className="flex gap-2"><Star className="fill-red-500 stroke-red-500 size-8" />
                        <Star className="fill-red-500 stroke-red-500 size-8" />
                        <Star className="fill-red-500 stroke-red-500 size-8" />
                        <Star className="fill-red-500 stroke-red-500 size-8" />
                        <Star className="fill-red-500 stroke-red-500 size-8" /></div>
                </div>
                <div className="flex gap-8">
                    <Button className="bg-white text-black border-2 border-black hover:bg-amber-500 hover:bg-opacity-20">Tất cả</Button>
                    <Button className="bg-white text-black border-2 border-black
                         hover:bg-amber-500 hover:bg-opacity-20">5  <Star className="fill-amber-400 stroke-amber-400 size-5" /></Button>
                    <Button className="bg-white text-black border-2 border-black
                         hover:bg-amber-500 hover:bg-opacity-20">4  <Star className="fill-amber-400 stroke-amber-400 size-5" /></Button>
                    <Button className="bg-white text-black border-2 border-black
                         hover:bg-amber-500 hover:bg-opacity-20">3  <Star className="fill-amber-400 stroke-amber-400 size-5" /></Button>
                    <Button className="bg-white text-black border-2 border-black
                         hover:bg-amber-500 hover:bg-opacity-20">2  <Star className="fill-amber-400 stroke-amber-400 size-5" /></Button>
                    <Button className="bg-white text-black border-2 border-black
                         hover:bg-amber-500 hover:bg-opacity-20">1  <Star className="fill-amber-400 stroke-amber-400 size-5" /></Button>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="max-w-5xl space-y-6">
                    <DetailReview />
                    <DetailReview />
                    <DetailReview />
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </section>
    </main>
)
}
