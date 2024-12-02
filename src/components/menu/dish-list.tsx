import React, { use, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { AddToCartButton } from './add-to-cart-btn';
import { Heart, Star } from 'lucide-react';
import { FaCoins } from "react-icons/fa6";
import { createFavorite, deleteFavorite } from '@/lib/actions/favorite';
import { toast } from '@/hooks/use-toast';
import useSWR from 'swr';
import { getAllProducts, getFavoriteByUserId } from '@/lib/data';
import LoadingSpinner from '../ui/loading-spinner';
import { ne } from 'drizzle-orm';

interface Dish {
    id: string;
    name: string;
    image: string;
    price: number;
    des: string;
    published: boolean;
}
interface IsFavorite {
    productId: string;
    status: boolean;
}

interface DishListProps {
    dishesList: Dish[];
}

const favoriteFetcher = async (userId: string) => {
    return await getFavoriteByUserId(userId);
}

const productsFetcher = async () => {
    return await getAllProducts();
}

export const DishList = ({ dishesList }: DishListProps) => {
    const router = useRouter();
    const userId = sessionStorage.getItem("userId") || "";
    const { data: productsData, error: productsError } = useSWR("products", productsFetcher);
    const { data: favoriteData, error: favoriteError } = useSWR(userId, favoriteFetcher);
    const [favorites, setFavorites] = useState<IsFavorite[]>([]);
    
    useEffect(() => {
        if (productsData) {
            const initialFavorites = productsData.map((dish: any) => ({ productId: dish.id, status: false }));
            setFavorites(initialFavorites);
        }
    }, [productsData]);

    useEffect(() => {
        if (favoriteData && favorites.length > 0) {
            const updatedFavorites = favorites.map(favorite => {
                const isFavorite = favoriteData.some((item: any) => item.productId === favorite.productId);
                return { ...favorite, status: isFavorite };
            });
            setFavorites(updatedFavorites);
        }
    }, [favoriteData, favorites.length]);

    console.log("Favorites dfsfs", favorites);

    if (productsError || favoriteError) return <div>Error loading data.</div>;
    if (!productsData || !favoriteData || favorites.length === 0) return <LoadingSpinner />;

    const handleProductOnClick = (productId: string) => {
        router.push(`/detail?id=${productId}`);
    };

    const handleFavoriteOnClick = async (productId: string, productName: string) => {
        if (!userId) {
            router.push("/login");
            return;
        }
        const newFavorites = [...favorites];
        console.log("New", newFavorites);
        const index = newFavorites.findIndex(favorite => favorite.productId === productId);
    
        if (index === -1) {
            console.error("Product not found in favorites");
            return;
        }
    
        if (!newFavorites[index].status) {
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("productId", productId);
            try {
                await createFavorite(formData);
                console.log("Favorite added");
                toast({
                    description: `Đã thêm ${productName.toLowerCase()} vào mục yêu thích`,
                });
                newFavorites[index].status = true;
                setFavorites(newFavorites);
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
                newFavorites[index].status = false;
                setFavorites(newFavorites);
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
    }

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-10 gap-x-8 mx-10 px-10">
            {dishesList?.map((dish: any, index: any) => (
                dish.published ? (
                    <div key={index} className="shadow-md rounded-3xl flex flex-col items-center group">
                        <img src={dish.image} alt={dish.name}
                            onClick={() => handleProductOnClick(dish.id)}
                            className="w-full h-80 rounded-3xl object-cover" />
                        <div className='flex flex-col justify-center items-center gap-3 py-4 w-full px-3'>
                            <div className='flex flex-col justify-between items-start gap-1 w-full'>
                                <div className='flex justify-between items-center w-full'>
                                    <p className='font-semibold text-xl' onClick={() => handleProductOnClick(dish.id)}>{dish.name}</p>
                                    <Heart onClick={() => handleFavoriteOnClick(dish.id, dish.name)}
                                        className={`stroke-amber-500 ${favorites[favorites.findIndex(favor => favor.productId === dish.id)].status ? "fill-amber-500" : ""}`} />
                                </div>
                                <p className='font-normal' onClick={() => handleProductOnClick(dish.id)}>
                                    {`${dish.des.substr(0, 31)}${(dish.des.length > 32) ? "..." : ""}`}
                                </p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <div className='flex justify-center items-center gap-1'>
                                    <Star className='fill-amber-400 stroke-amber-400' />
                                    <p className='font-normal'>4.8</p>
                                </div>
                                <div className='flex justify-end items-center gap-2'>
                                    <FaCoins className='fill-amber-400' />
                                    <div className='flex items-center font-semibold text-red-500 text-xl'>{convertToVND(dish.price)}</div>
                                </div>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <Button onClick={() => handleProductOnClick(dish.id)} className='rounded-3xl bg-black hover:bg-red-500 hidden group-hover:flex transition-all duration-300 ease-in-out'>Xem chi tiết</Button>
                                <AddToCartButton dish={dish} />
                            </div>
                        </div>
                    </div>
                ) : null
            ))}
        </div>
    );
};