"use client";
import React, { useState, useEffect } from "react";
import { getShoppingCartByUserId } from "@/lib/data";
import { getSession } from "@/lib/auth-client";
import useSWR from "swr";
import LoadingSpinner from "@/components/ui/loading-spinner";

import { Cart, columns } from "@/app/menu/cart/columns";
import { DataTable } from "@/app/menu/cart/data-table";

// Fetch function dùng cho SWR
const fetcher = async (userId: string) => {
  return getShoppingCartByUserId(userId);
};

const userFetcher = async () => {
  const response = await getSession();
  return response?.data?.user?.id;
}

export function ProductList() {
  const { data: userId, error: userError } = useSWR("userId", userFetcher);
  const { data, error } = useSWR(userId, fetcher, {
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
        id: item.productId || undefined,
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
      <DataTable columns={columns} data={dishes}></DataTable>
                  {/* <TableCell className="w-32 text-center">
                    {dish.favorited ? (
                      <Heart className="fill-amber-500 stroke-amber-500" onClick={() => handleFavoriteClick(dish.id)} />
                    ) : (
                      <Heart className="stroke-amber-500" onClick={() => handleFavoriteClick(dish.id)} />
                    )}
                  </TableCell>
                  <TableCell className="w-32 text-center">
                    <Trash className="stroke-amber-500" />
                  </TableCell> */}
    </div>
  );
}
