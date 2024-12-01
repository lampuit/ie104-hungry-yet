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
import { Heart, MessageCircleMore, ShoppingCart, Star } from "lucide-react"
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
import { useSearchParams } from "next/navigation";
import { createFavorite, deleteFavorite } from "@/lib/actions/favorite";
import { toast } from "@/hooks/use-toast";
import router from "next/router";
import { createCart } from "@/lib/actions/shopping-cart";


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
    const id = searchParams.get("id") || "";
    const userId = sessionStorage.getItem("userId") || "";
    const { data, error } = useSWR(id, fetcher);
    const { data: favoriteData, error: favoriteError } = useSWR(userId, favoriteFetcher);
    const [favorite, setFavorite] = useState<boolean>(false);

    useEffect(() => {
        if (data && favoriteData) {
            const checkFavorite = (productId: string) => {
                return favoriteData.some((item: any) => item.productId === productId);
            };

            setFavorite(checkFavorite(data[0]?.id));
        }
    }, [data, favoriteData]);

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

    const handleFavoriteOnClick = async (productId: string, productName: string) => {
        if (!userId) {
            router.push("/login");
        }
        if (!favorite) {
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("productId", productId);
            try {
                await createFavorite(formData);
                console.log("Favorite added");
                toast({
                    description: `Đã thêm ${productName.toLowerCase()} vào mục yêu thích`,
                });
                setFavorite(true);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: `KHÔNG THỂ THÊM ${productName.toUpperCase()}.`,
                    description: "Có lỗi gì đó đã xảy ra",
                });
            }
        } else {
            try {
                await deleteFavorite(userId, productId);
                console.log("Favorite removed");
                toast({
                    description: `Đã xóa ${productName.toLowerCase()} khỏi mục yêu thích`,
                });
                setFavorite(false);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: `KHÔNG THỂ XÓA ${productName.toUpperCase()}.`,
                    description: "Có lỗi gì đó đã xảy ra",
                });
            }
        }
    };

    const convertToVND = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    const handleAddToCartOnClick = async () => {
        const data = new FormData();
        if (!userId) {
            router.push("/login");
        }
        else {
            data.append('userId', userId as string);
            data.append('productId', dish.id);
            data.append('quantity', '1');

            try {
                await createCart(data);
                toast({
                    description: `Đã thêm ${dish.name.toLowerCase()} vào giỏ hàng`,
                });
            }
            catch (error) {
                toast({
                    variant: "destructive",
                    title: `KHÔNG THỂ THÊM ${dish.name.toUpperCase()}.`,
                    description: "Có lỗi gì đó đã xảy ra",
                });
            }
        }
    };

    const handleBuyNowOnClick = async () => {
        if (!userId) {
            router.push("/login");
        }
        handleAddToCartOnClick();
        router.push("/checkout");
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
            <section className="w-full flex justify-center">
                <div className="flex border p-5 gap-12 items-center justify-between w-4/5 rounded-md">
                    <img src={dish.imageUrl} alt={dish.name} className="w-80 h-80" />
                    <div className="grow space-y-8">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <div className="grow flex gap-7 items-center">
                                    <h1 className="font-semibold text-4xl">{dish.name}</h1>
                                    <Badge variant="outline" className="rounded-md bg-amber-400">{dish.categoryName}</Badge>
                                </div>
                                <Heart size={28} onClick={() => handleFavoriteOnClick(dish.id, dish.name)}
                                    className={`stroke-amber-500 ${favorite ? "fill-amber-500" : ""}`} />
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
                                    hover:bg-amber-500 hover:bg-opacity-20 hover:text-amber-500 gap-2"
                                onClick={() => handleAddToCartOnClick()}>
                                <ShoppingCart /> <span>Thêm giỏ hàng</span>
                            </Button>
                            <Button className="font-semibold border-red-500 bg-red-500 border-2
                                    hover:bg-red-500 hover:shadow-md hover:text-white"
                                onClick={() => handleBuyNowOnClick()}>
                                Mua ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex my-10 mx-10 px-5">
                <div className="space-y-3 max-w-5xl">
                    <h1 className="font-semibold text-2xl">Mô tả món ăn</h1>
                    <p>{dish.des}</p>
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

