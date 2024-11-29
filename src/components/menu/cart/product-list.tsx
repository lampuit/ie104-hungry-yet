"use client";
import React, { useState, useEffect } from "react";
import { getShoppingCartByUserId } from "@/lib/data";
import LoadingSpinner from "@/components/ui/loading-spinner";

import { DataTable } from "@/components/menu/cart/data-table";
import { columns } from "@/components/menu/cart/columns";

// Fetch function dùng cho SWR
const fetcher = async (userId: string) => {
  return await getShoppingCartByUserId(userId);
};

export function ProductList() {
  const userId = sessionStorage.getItem("userId");
  // const { data, isLoading, error } = useSWR(userId, fetcher, {
  //   revalidateIfStale: true,
  //   revalidateOnFocus: false,
  //   revalidateOnReconnect: true,
  // });
  const [dishes, setDishes] = useState<any[]>([]);
  
  useEffect(() => {
    fetcher(userId || "").then(data => {
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
    });
  }, []);

  // if (error) return <div>Error loading data.</div>;
  if (!dishes) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <DataTable columns={columns} data={dishes}></DataTable>
    </div>
  );
}
