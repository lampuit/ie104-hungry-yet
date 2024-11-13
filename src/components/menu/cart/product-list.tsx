"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { init } from "next/dist/compiled/webpack/webpack";
import { getShoppingCartByUserId } from "@/lib/data";
import { getSession } from "@/lib/auth-client";
import useSWR from "swr";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Heart, Trash } from "lucide-react";

// Fetch function dùng cho SWR
const fetcher = async () => {
  const response = await getSession();
  const userId = response?.data?.user?.id as string;
  return getShoppingCartByUserId(userId);
};

export function ProductList() {
  const { data, error } = useSWR("shoppingCartData", fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [dishes, setDishes] = useState<any[]>([]);

  // Function handle when favorite btn is clicked
  const handleFavoriteClick = (id: number) => {
    setDishes(
      dishes.map((dish) =>
        dish.id === id ? { ...dish, favorited: !dish.favorited } : dish,
      ),
    );
  };

  useEffect(() => {
    if (data) {
      const formattedData = data.map((item: any) => ({
        id: item.cartId || undefined,
        img: item.image || "/images/fallback.jpg",
        name: item.name,
        des: item.description || "",
        cost: item.price,
        amount: item.quantity,
        isFavorite: item.isFavorite || false,
      }));
      setDishes(formattedData);
    }
  }, [data]);

  if (error) return <div>Error loading data.</div>;
  if (!data) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-start items-center my-2 max-w-6xl">
        <div className="w-96 text-center">Giỏ hàng</div>
        <div className="w-36 text-center">Giá tiền</div>
        <div className="w-40 text-center">Số lượng</div>
        <div className="w-36 text-center">Thành tiền</div>
        <div className="w-32 text-center"></div>
        <div className="w-32 text-center"></div>
      </div>
      <div className="flex flex-row justify-start items-center">
        <ScrollArea className="h-96 max-w-6xl">
          <Table>
            <TableBody>
              {dishes.map((dish) => (
                <TableRow className="px-0 mx-0" key={dish.id}>
                  <TableCell className="flex flex-row justify-start items-center w-96 text-start gap-4">
                    <Image
                      src={dish.img}
                      alt={dish.name}
                      width={128}
                      height={128}
                    />
                    <div className="flex flex-col justify-center items-start gap-4">
                      <p className="font-bold">{dish.name}</p>
                      <p>{dish.des}</p>
                    </div>
                  </TableCell>
                  <TableCell className="w-36 text-center">{dish.cost}</TableCell>
                  <TableCell className="w-40 text-center">
                    <div className="flex flex-row justify-center items-center gap-4">
                      <Button variant={"outline"} className="border-amber-500 text-amber-500 hover:bg-orange-200 w-8 h-8">-</Button>
                      <div>{dish.amount}</div>
                      <Button className="bg-amber-500 hover:bg-red-500 w-8 h-8">+</Button>
                    </div>
                  </TableCell>
                  <TableCell className="w-36 text-center">{dish.amount * dish.cost}</TableCell>
                  <TableCell className="w-32 text-center">
                    {dish.favorited ? (
                      <Heart className="fill-amber-500 stroke-amber-500" onClick={() => handleFavoriteClick(dish.id)} />
                    ) : (
                      <Heart className="stroke-amber-500" onClick={() => handleFavoriteClick(dish.id)} />
                    )}
                  </TableCell>
                  <TableCell className="w-32 text-center">
                    <Trash className="stroke-amber-500" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
