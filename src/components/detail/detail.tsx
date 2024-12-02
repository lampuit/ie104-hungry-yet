"use client";

import { getFavoriteByUserId, getProductById, getRatingsByProductId } from "@/lib/data";
import { useSearchParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import useSWR from "swr";
import LoadingSpinner from "../ui/loading-spinner";
import { createFavorite, deleteFavorite } from "@/lib/actions/favorite";
import { toast } from "@/hooks/use-toast";
import { createCart } from "@/lib/actions/cart";
import { Heart, MessageCircleMore, ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button";

const fetcher = async (id: string) => {
    return await getProductById({ id });
}

const favoriteFetcher = async (userId: string) => {
    return await getFavoriteByUserId(userId);
}

export const ratingFetcher = async (id: string) => {
    return await getRatingsByProductId(id);
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

export const ProductDetail = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || "";
    const userId = sessionStorage.getItem("userId") || "";
    const { data: ratingData, error: ratingError } = useSWR(`product-${id}`, () => ratingFetcher(id));
    const { data: productData, error: productError } = useSWR(id, fetcher);
    const { data: favoriteData, error: favoriteError } = useSWR(userId, favoriteFetcher);
    const [favorite, setFavorite] = useState<boolean>(false);
    const router = useRouter();


    useEffect(() => {
        if (productData && favoriteData) {
            const checkFavorite = (productId: string) => {
                return favoriteData.some((item: any) => item.productId === productId);
            };

            setFavorite(checkFavorite(productData[0]?.id));
        }
    }, [productData, favoriteData]);

    if (productError || favoriteError || ratingError) return <div>Error loading data.</div>;
    if (!productData || !favoriteData || !ratingData) {
        return <LoadingSpinner />;
    }

    const averageRating = ratingData.length > 0
        ? ratingData.reduce((acc: number, item: any) => acc + (item.star || 0), 0) / ratingData.length
        : 0;

    const dish: Dish = {
        categoryId: productData[0]?.categoryId || "",
        categoryName: productData[0]?.categoryName || "/images/fallback.jpg",
        createdAt: productData[0]?.createdAt || undefined,
        des: productData[0]?.description || "",
        id: productData[0]?.id,
        imageUrl: productData[0]?.imageUrl,
        price: productData[0]?.price,
        name: productData[0]?.name,
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
        <section>
            <section className="w-full flex justify-center">
                <div className="flex border p-5 gap-12 items-center justify-between w-4/5 max-w-5xl rounded-md">
                    <img src={dish.imageUrl} alt={dish.name} className="w-80 h-80" />
                    <div className="grow flex flex-col justify-start gap-16 p-5 h-full">
                        <div className="space-y-2 ">
                            <div className="flex justify-between items-center gap-7">
                                <div className="grow flex gap-7 items-center">
                                    <h1 className="font-semibold text-4xl">{dish.name}</h1>
                                    <Badge variant="outline" className="rounded-md bg-amber-400">{dish.categoryName}</Badge>
                                </div>
                                <Heart size={40} onClick={() => handleFavoriteOnClick(dish.id, dish.name)}
                                    className={`stroke-amber-500 ${favorite ? "fill-amber-500" : ""}`} />
                            </div>
                            <div className="space-x-24">
                                <div className="inline-flex gap-2">
                                    <Star className="fill-amber-400 stroke-amber-400 size-5" />
                                    <span>{averageRating.toFixed(1)}</span>
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
            <section className="w-full flex justify-start my-10 mx-10 px-5">
                <div className="space-y-3">
                    <h1 className="font-semibold text-2xl">Mô tả món ăn</h1>
                    <p>{dish.des}</p>
                </div>
            </section>
        </section>
    )
}