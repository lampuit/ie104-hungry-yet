import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { FaCoins } from "react-icons/fa6";
import { createFavorite, deleteFavorite } from '@/lib/actions/favorite';
import { toast } from '@/hooks/use-toast';
import useSWR from 'swr';
import { getAllProducts, getCartsByUserId, getFavoriteByUserId } from '@/lib/data';
import LoadingSpinner from '../ui/loading-spinner';
import { getSession } from "@/lib/auth-client";
import Image from 'next/image';
import { createCart } from '@/lib/actions/cart';
import { AddToCartButton } from './add-to-cart-btn';

// Lấy userId từ session
const fetcherUserId = async () => {
    const response = await getSession();
    const userId = response?.data?.user?.id as string;
    return userId;
};

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
    isHovered?: boolean; // Added to track hover state
}

interface DishListProps {
    dishesList: Dish[];
    // onTotalAmountChange: (totalAmount: number) => void;
}

const favoriteFetcher = async (userId: string) => {
    return await getFavoriteByUserId(userId);
};

const productsFetcher = async () => {
    return await getAllProducts();
};

// //get shopping cart by userId
// const cartFetcher = async (userId: string) => {
//     return getCartsByUserId(userId);
// };

export const DishList = ({ dishesList }: DishListProps) => {
    const router = useRouter();
    const { data: userId, error: userIdError } = useSWR("userId", fetcherUserId);
    const { data: productsData, error: productsError } = useSWR("products", productsFetcher);
    const { data: favoriteData, error: favoriteError } = useSWR(`id-${userId}`, () => favoriteFetcher(userId || ""));
    // const { data: cartData, error: cartError } = useSWR(userId, cartFetcher);
    // const [totalAmount, setTotalAmount] = useState<number>(0);
    const [favorites, setFavorites] = useState<IsFavorite[]>([]);

    // useEffect(() => {
    //     if (cartData) {
    //         setTotalAmount(cartData.length);
    //         onTotalAmountChange(cartData.length); // Pass totalAmount to parent
    //     }
    // }, [cartData]);

    useEffect(() => {
        if (productsData) {
            const initialFavorites = productsData.map((dish: any) => ({ productId: dish.id, status: false, isHovered: false }));
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
        const index = newFavorites.findIndex(favorite => favorite.productId === productId);

        if (index === -1) return;

        if (!newFavorites[index].status) {
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("productId", productId);
            try {
                await createFavorite(formData);
                toast({ description: `Đã thêm ${productName.toLowerCase()} vào mục yêu thích` });
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
                toast({ description: `Đã xóa ${productName.toLowerCase()} khỏi mục yêu thích` });
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

    // const handleAddToCartOnClick = async (productId: string) => {
    //     const data = new FormData();
    //     if (!userId) {
    //         router.push("/login");
    //     } else {
    //         data.append('userId', userId as string);
    //         data.append('productId', productId);
    //         data.append('quantity', '1');
    
    //         await createCart(data);
    
    //         // setTotalAmount(prevTotal => {
    //         //     const newTotal = prevTotal + 1;
    //         //     onTotalAmountChange(newTotal); // Update parent with new total
    //         //     return newTotal;
    //         // });
    
    //         toast({ description: `Đã thêm ${.toLowerCase()} vào giỏ hàng` });
    //     }
    // };

    const convertToVND = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-10 gap-x-8 mx-10 px-10">
            {dishesList?.map((dish: any) => (
                dish.published ? (
                    <div
                        key={dish.id}
                        className="relative shadow-md rounded-3xl flex flex-col items-center group"
                        onMouseEnter={() =>
                            setFavorites(prev =>
                                prev.map(fav =>
                                    fav.productId === dish.id ? { ...fav, isHovered: true } : fav
                                )
                            )
                        }
                        onMouseLeave={() =>
                            setFavorites(prev =>
                                prev.map(fav =>
                                    fav.productId === dish.id ? { ...fav, isHovered: false } : fav
                                )
                            )
                        }
                    >
                        <div className='w-80 h-80 relative'>
                            <Image src={dish.image}
                                alt={dish.name}
                                layout="fill"
                                objectFit='cover'
                                objectPosition='center'
                                className='rounded-3xl p-2'
                                onClick={() => handleProductOnClick(dish.id)}>
                            </Image>
                        </div>
                        <div
                            className={`flex flex-col ${favorites.find(fav => fav.productId === dish.id)?.isHovered
                                ? 'justify-start'
                                : 'justify-center'
                                } items-center gap-3 py-4 pt-6 w-full h-44 px-3 transition-all duration-300 ease-in-out`}
                        >
                            <div
                                className={`flex flex-col justify-between items-start gap-1 w-full transform transition-transform duration-300 ${favorites.find(fav => fav.productId === dish.id)?.isHovered
                                    ? 'translate-y-[-10px]'
                                    : 'translate-y-[0]'
                                    }`}
                            >
                                <div className="flex justify-between items-center w-full">
                                    <p
                                        className="font-semibold text-xl"
                                        onClick={() => handleProductOnClick(dish.id)}
                                    >
                                        {dish.name}
                                    </p>
                                    <Heart
                                        onClick={() => handleFavoriteOnClick(dish.id, dish.name)}
                                        className={`stroke-amber-500 ${favorites.find(favor => favor.productId === dish.id)?.status
                                            ? 'fill-amber-500'
                                            : ''
                                            }`}
                                    />
                                </div>
                                <p
                                    className="font-normal"
                                    onClick={() => handleProductOnClick(dish.id)}
                                >
                                    {`${dish.des.substr(0, 31)}${dish.des.length > 32 ? '...' : ''}`}
                                </p>
                            </div>
                            <div className={`flex justify-between items-center w-full transform transition-transform duration-300 ${favorites.find(fav => fav.productId === dish.id)?.isHovered
                                ? 'translate-y-[-10px]'
                                : 'translate-y-[0]'
                                }`}>
                                <div className="flex justify-center items-center gap-1">
                                    <Star className="fill-amber-400 stroke-amber-400" />
                                    <p className="font-normal">4.8</p>
                                </div>
                                <div className="flex justify-end items-center gap-2">
                                    <FaCoins className="fill-amber-400" />
                                    <div className="flex items-center font-semibold text-red-500 text-xl">
                                        {convertToVND(dish.price)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out px-3 py-2">
                            <Button
                                onClick={() => handleProductOnClick(dish.id)}
                                className="rounded-3xl bg-black hover:bg-red-500"
                            >
                                Xem chi tiết
                            </Button>
                            <AddToCartButton dish={dish}/>
                            {/* <Button onClick={() => handleAddToCartOnClick(dish.id, dish.name)}
                                className='rounded-3xl bg-amber-500 hover:bg-red-500'>
                                <ShoppingCart /> <span>Thêm giỏ hàng</span>
                            </Button> */}
                        </div>
                    </div>
                ) : null
            ))}
        </div>
    );
};