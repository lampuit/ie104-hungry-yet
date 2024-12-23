"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/menu/cart/data-table";
import { columns } from "@/components/menu/cart/columns";
import { getCartsByUserId, getFavoriteByUserId } from "@/lib/data";
import useSWR from "swr";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { getSession } from "@/lib/auth-client";
import { Summary } from "@/components/menu/cart/summary";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";

//get shopping cart by userId
const fetcherCarts = async (userId: string) => {
  return getCartsByUserId(userId);
};

// Lấy session
const fetcherUserId = async () => {
  const response = await getSession();
  const userId = response?.data?.user?.id as string;
  return userId;
};

// Lấy danh sách sản phẩm yêu thích
const favoriteFetcher = async (userId: string) => {
  return await getFavoriteByUserId(userId);
};

export default function CartPage() {
  const { data: userId } = useSWR("userId", fetcherUserId);
  const {
    data: listDish,
    isLoading,
    error,
    mutate,
  } = useSWR(`userId${userId}`, () => fetcherCarts(userId || ""), {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
  const { data: favoriteList } = useSWR(`id${userId}`, () =>
    favoriteFetcher(userId || ""),
  );

  const [dishes, setDishes] = useState<any[]>([]);
  const [totalPrice, settotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (listDish && favoriteList) {
      const formattedData = listDish.map((item: any) => ({
        id: item.productId || undefined,
        img: item.product?.imageUrl || "",
        name: item.product?.name,
        des: item.product?.description || "",
        cost: item.product?.price,
        amount: item?.quantity,
        category: item.product?.category?.name,
        isFavorite: favoriteList.some(
          (favorite) => favorite.productId === item.productId,
        ),
      }));
      setDishes(formattedData);
      setTotalAmount(listDish.length);
      settotalPrice(
        listDish.reduce(
          (acc, item) => acc + item.product?.price * item.quantity,
          0,
        ),
      );
    }
  }, [listDish, favoriteList]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    const updatedDishes = dishes.map((dish) =>
      dish.id === id ? { ...dish, amount: newQuantity } : dish,
    );
    setDishes(updatedDishes);

    // recalculate total amount
    const newtotalAmount = updatedDishes.length;
    const newtotalPrice = updatedDishes.reduce(
      (acc, item) => acc + item.amount * item.cost,
      0,
    );
    setTotalAmount(newtotalAmount);
    settotalPrice(newtotalPrice);
  };

  const updateTableData = (id: string, isFavorite: boolean) => {
    const updatedDishes = dishes.map((dish) =>
      dish.id === id ? { ...dish, isFavorite } : dish,
    );
    setDishes(updatedDishes);
  };

  const formattedTotalPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(totalPrice);

  if (error) return <div>Error loading data.</div>;
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="flex h-full grow flex-col">
      {/* <section className="my-10 mx-10 w-72 text-base font-semibold">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="hover:text-amber-500" href="/">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="hover:text-amber-500" href="/menu">Thực đơn</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-amber-500">Giỏ hàng</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section> */}
      <section className="my-10 flex w-full flex-col items-center justify-center">
        <DataTable
          columns={columns(mutate, updateTableData)}
          data={dishes}
          onQuantityChange={handleQuantityChange}
        ></DataTable>
      </section>
      <section className="sticky bottom-0 mt-4 flex grow flex-col items-center justify-end">
        <Summary totalPrice={formattedTotalPrice} totalAmount={totalAmount} />
      </section>
    </main>
  );
}
