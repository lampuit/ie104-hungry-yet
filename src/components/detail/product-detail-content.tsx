"use client";

import {
    getFavoriteByUserId,
    getProductById,
    getRatingsByProductId,
} from "@/lib/data";
import { useEffect, useState } from "react";
import useSWR from "swr";
import LoadingSpinner from "../ui/loading-spinner";
import { createFavorite, deleteFavorite } from "@/lib/actions/favorite";
import { toast } from "@/hooks/use-toast";
import { createCart } from "@/lib/actions/cart";
import {
    Heart,
    MessageCircleMore,
    ShoppingCart,
    Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { getSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

// Lấy userId từ session
const fetcherUserId = async () => {
    const response = await getSession();
    const userId = response?.data?.user?.id as string;
    return userId;
};

const fetcher = async (id: string) => {
    return await getProductById({ id });
};

const favoriteFetcher = async (userId: string) => {
    return await getFavoriteByUserId(userId);
};

const ratingFetcher = async (id: string) => {
    return await getRatingsByProductId(id);
};
export function ProductDetailContent({ id }: { id: string }) {
    const { data: userId } = useSWR("userId", fetcherUserId);
    const { data: ratingData } = useSWR(`product-${id}`, () =>
        ratingFetcher(id)
    );
    const { data: productData } = useSWR(id, fetcher);
    const { data: favoriteData } = useSWR(userId, favoriteFetcher);

    const [favorite, setFavorite] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (productData && favoriteData) {
            const checkFavorite = (productId: string) => {
                return favoriteData.some(
                    (item: any) => item.productId === productId
                );
            };

            setFavorite(checkFavorite(productData[0]?.id));
        }
    }, [productData, favoriteData]);

    if (!productData || !ratingData) {
        return <LoadingSpinner />;
    }

    const averageRating =
        ratingData.length > 0
            ? ratingData.reduce(
                (acc: number, item: any) => acc + (item.star || 0),
                0
            ) / ratingData.length
            : 0;

    const dish: Dish = {
        categoryId: productData[0]?.categoryId || "",
        categoryName: productData[0]?.categoryName || "",
        createdAt: productData[0]?.createdAt || undefined,
        des: productData[0]?.description || "",
        id: productData[0]?.id,
        imageUrl: productData[0]?.imageUrl,
        price: productData[0]?.price,
        name: productData[0]?.name,
    };

    const handleFavoriteOnClick = async (
        productId: string,
        productName: string
    ) => {
        if (!userId) {
            router.push("/login");
        }
        if (!favorite) {
            const formData = new FormData();
            formData.append("userId", userId || "");
            formData.append("productId", productId);
            try {
                await createFavorite(formData);
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
                await deleteFavorite(userId || "", productId);
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
        } else {
            data.append("userId", userId as string);
            data.append("productId", dish.id);
            data.append("quantity", "1");

            try {
                await createCart(data);
                toast({
                    description: `Đã thêm ${dish.name.toLowerCase()} vào giỏ hàng`,
                });
            } catch (error) {
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
    };

    return (
        <section className="w-full flex flex-col items-center">
            <section className=" flex flex-col md:flex-row justify-between border p-5 gap-4 lg:gap-12 items-center max-w-5xl rounded-md">
                <div className="w-72 h-72 md:w-64 md:h-64 lg:w-80 lg:h-80 relative">
                    <Image
                        src={dish.imageUrl}
                        alt={dish.name}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </div>
                <div className="grow flex flex-col justify-start gap-8 md:gap-16 sm:p-5 h-full">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center gap-4 sm:gap-7">
                            <div className="grow flex gap-4 sm:gap-7 items-center">
                                <h1 className="font-semibold text-xl sm:text-2xl lg:text-4xl">{dish.name}</h1>
                                <Badge variant="outline" className="text-xs md:text-sm lg:text-base rounded-md bg-amber-400">{dish.categoryName}</Badge>
                            </div>
                            <Heart size={36} onClick={() => handleFavoriteOnClick(dish.id, dish.name)}
                                className={`stroke-amber-500 ${favorite ? "fill-amber-500" : ""}`} />
                        </div>
                        <div className="space-x-12 sm:space-x-24">
                            <div className="inline-flex gap-2">
                                <Star className="fill-amber-400 stroke-amber-400 size-5" />
                                <span>{averageRating.toFixed(1)}</span>
                            </div>
                            <div className="inline-flex gap-2">
                                <MessageCircleMore className="stroke-red-500 size-5" />
                                <span>50</span>
                            </div>
                        </div>
                        <div className="flex items-center font-bold text-2xl md:text-3xl lg:text-4xl text-red-500">{convertToVND(dish.price)}</div>
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
            </section>
            <section className="flex w-full justify-start my-10 px-10 sm:px-16">
                <div className="space-y-3">
                    <h1 className="font-semibold text-xl sm:text-2xl">Mô tả món ăn</h1>
                    <p className="text-justify">{dish.des}</p>
                </div>
            </section>
        </section>
    )
}
