import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { AddToCartButton } from "./add-to-cart-btn";
import { Heart, Star } from "lucide-react";
import { FaCoins } from "react-icons/fa6";
import { createFavorite, deleteFavorite } from "@/lib/actions/favorite";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import useSWR from "swr";
import {
  getAllProducts,
  getCartsByUserId,
  getFavoriteByUserId,
} from "@/lib/data";
import LoadingSpinner from "../ui/loading-spinner";
import { getSession } from "@/lib/auth-client";
import Image from "next/image";

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
  avgRating: number;
}

interface IsFavorite {
  productId: string;
  status: boolean;
  isHovered?: boolean; // Added to track hover state
}

interface DishListProps {
  dishesList: Dish[];
  onTotalAmountChange?: (totalAmount: number) => void;
}

const favoriteFetcher = async (userId: string) => {
  return await getFavoriteByUserId(userId);
};

const productsFetcher = async () => {
  return await getAllProducts();
};

export const DishList = ({
  dishesList,
  onTotalAmountChange,
}: DishListProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: userId, error: userIdError } = useSWR("userId", fetcherUserId);
  const { data: productsData, error: productsError } = useSWR(
    "products",
    productsFetcher,
  );
  const { data: favoriteData, error: favoriteError } = useSWR(
    `userId-${userId}`,
    () => favoriteFetcher(userId || ""),
  );
  const [favorites, setFavorites] = useState<IsFavorite[]>([]);

  useEffect(() => {
    if (productsData) {
      const initialFavorites = productsData.map((dish: any) => ({
        productId: dish.id,
        status: false,
        isHovered: false,
      }));
      setFavorites(initialFavorites);
    }
  }, [productsData]);

  useEffect(() => {
    if (favoriteData && favorites.length > 0) {
      const updatedFavorites = favorites.map((favorite) => {
        const isFavorite = favoriteData.some(
          (item: any) => item.productId === favorite.productId,
        );
        return { ...favorite, status: isFavorite };
      });
      setFavorites(updatedFavorites);
    }
  }, [favoriteData, favorites, favorites.length]);

  if (productsError || favoriteError) return <div>Error loading data.</div>;
  if (!productsData || !favoriteData || favorites.length === 0)
    return <LoadingSpinner />;

  const handleProductOnClick = (productId: string) => {
    router.push(`/detail?id=${productId}`);
  };

  const handleFavoriteOnClick = async (
    productId: string,
    productName: string,
  ) => {
    if (!userId) {
      router.push("/login");
      return;
    }
    const newFavorites = [...favorites];
    const index = newFavorites.findIndex(
      (favorite) => favorite.productId === productId,
    );

    if (index === -1) return;

    if (!newFavorites[index].status) {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("productId", productId);
      try {
        await createFavorite(formData);
        toast({
          description: `Đã thêm ${productName.toLowerCase()} vào mục yêu thích`,
          action: (
            <ToastAction
              altText="Xem danh mục yêu thích"
              onClick={() => router.push("/account/favorite")}
            >
              Xem
            </ToastAction>
          ),
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
  };

  return (
    <div className="mx-5 grid grid-cols-1 gap-x-8 gap-y-10 sm:mx-10 sm:px-4 md:grid-cols-2 lg:px-10 xl:grid-cols-3">
      {dishesList?.map((dish: any) =>
        dish.published ? (
          <div
            key={dish.id}
            className="group relative flex h-full w-full flex-col items-center rounded-3xl shadow-md"
            onMouseEnter={() =>
              setFavorites((prev) =>
                prev.map((fav) =>
                  fav.productId === dish.id ? { ...fav, isHovered: true } : fav,
                ),
              )
            }
            onMouseLeave={() =>
              setFavorites((prev) =>
                prev.map((fav) =>
                  fav.productId === dish.id
                    ? { ...fav, isHovered: false }
                    : fav,
                ),
              )
            }
          >
            <div className="relative h-80 w-80">
              <Image
                src={dish.image}
                alt={dish.name}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="w=full h-auto rounded-3xl p-2"
                onClick={() => handleProductOnClick(dish.id)}
              ></Image>
            </div>
            <div
              className={`flex flex-col ${
                favorites.find((fav) => fav.productId === dish.id)?.isHovered
                  ? "justify-start"
                  : "justify-start md:justify-center"
              } w-full items-center gap-3 px-3 py-4 pt-6 transition-all duration-300 ease-in-out md:h-44`}
            >
              <div
                className={`flex w-full transform flex-col items-start justify-between gap-1 transition-transform duration-300 ${
                  favorites.find((fav) => fav.productId === dish.id)?.isHovered
                    ? "md:translate-y-[-10px]"
                    : "translate-y-[0]"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <p
                    className="text-xl font-semibold"
                    onClick={() => handleProductOnClick(dish.id)}
                  >
                    {dish.name}
                  </p>
                  <Heart
                    onClick={() => handleFavoriteOnClick(dish.id, dish.name)}
                    className={`stroke-amber-500 ${
                      favorites.find((favor) => favor.productId === dish.id)
                        ?.status
                        ? "fill-amber-500"
                        : ""
                    }`}
                  />
                </div>
                <p
                  className="font-normal"
                  onClick={() => handleProductOnClick(dish.id)}
                >
                  {`${dish.des.substr(0, 30)}${dish.des.length > 32 ? "..." : ""}`}
                </p>
              </div>
              <div
                className={`flex w-full transform items-center justify-between transition-transform duration-300 ${
                  favorites.find((fav) => fav.productId === dish.id)?.isHovered
                    ? "md:translate-y-[-10px]"
                    : "translate-y-[0]"
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <Star className="fill-amber-400 stroke-amber-400" />
                  <p className="font-normal">
                    {Number(dish.avgRating).toFixed(1)}
                  </p>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <FaCoins className="fill-amber-400" />
                  <div className="flex items-center text-xl font-semibold text-red-500">
                    {convertToVND(dish.price)}
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom-0 left-0 right-0 flex items-center justify-between gap-2 px-3 py-2 duration-300 ease-in-out group-hover:opacity-100 md:absolute md:opacity-0 md:transition-opacity">
              <Button
                onClick={() => handleProductOnClick(dish.id)}
                className="rounded-3xl bg-black hover:bg-red-500"
              >
                Xem chi tiết
              </Button>
              <AddToCartButton dish={dish} onAddToCart={onTotalAmountChange} />
            </div>
          </div>
        ) : null,
      )}
    </div>
  );
};
