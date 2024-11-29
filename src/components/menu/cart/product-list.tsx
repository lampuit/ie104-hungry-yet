"use client";
import React, { useState, useEffect } from "react";
import { getShoppingCartByUserId } from "@/lib/data";
import useSWR from "swr";
import LoadingSpinner from "@/components/ui/loading-spinner";

import { columns } from "@/app/menu/cart/columns";
import { DataTable } from "@/app/menu/cart/data-table";

// Fetch function dùng cho SWR
const fetcher = async (userId: string) => {
  return getShoppingCartByUserId(userId);
};

export function ProductList() {
  const userId = sessionStorage.getItem("userId");
  const { data, isLoading, error } = useSWR(userId, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
  const [dishes, setDishes] = useState<any[]>([]);
  
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
    </div>
  );
}
