"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Summary } from "@/components/menu/cart/summary";
import { columns } from "@/components/menu/cart/columns";
import { DataTable } from "@/components/menu/cart/data-table";
import { getCartsByUserId } from "@/lib/data";
import useSWR from "swr";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { getSession } from "@/lib/auth-client";
import { set } from "date-fns";
import { AnyARecord } from "dns";

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

// Tổng số lượng và tổng giá tiền
interface CartTotal {
  totalAmount: number;
  totalPrice: number;
};

export default function CartPage() {
  const { data: userId } = useSWR('userId', fetcherUserId);
  const { data: listDish, isLoading, error } = useSWR(userId, fetcherCarts, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  const [dishes, setDishes] = useState<any[]>([]);
  const [total, setTotal] = useState<CartTotal>({ totalAmount: 0, totalPrice: 0 });

  useEffect(() => {
    if (listDish) {
      const formattedData = listDish.map((item: any) => ({
        id: item.productId || undefined,
        img: item.product?.imageUrl || "",
        name: item.product?.name,
        des: item.product?.description || "",
        cost: item.product?.price,
        amount: item?.quantity,
        category: item.product?.category?.name,
        isFavorite: item.product?.favorites?.length === 0 ? false : true,
      }));
      setDishes(formattedData);
      setTotal({
        totalAmount: formattedData.length,
        totalPrice: formattedData.reduce(
          (acc:any, item:any) => acc + item.cost * item.amount,
          0
        ),
      });
    }
  }, [listDish]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    const updatedDishes = dishes.map((dish) =>
      dish.id === id ? { ...dish, amount: newQuantity } : dish
    );
    setDishes(updatedDishes);

    // recalculate total amount
    const newTotalAmount = updatedDishes.length;
    const newTotalPrice = updatedDishes.reduce(
      (acc, item) => acc + item.amount * item.cost,
      0
    );
    setTotal({ totalPrice: newTotalPrice, totalAmount: newTotalAmount });
  };

  if (error) return <div>Error loading data.</div>;
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="grow flex flex-col h-full">
      <section className="my-10 mx-10 w-72 text-base font-semibold">
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
      </section>
      <section className="flex flex-col justify-center items-center">
        <DataTable columns={columns} data={dishes} onQuantityChange={handleQuantityChange}></DataTable>
      </section>
      <section className="sticky bottom-0 grow flex flex-col justify-end items-center shadow-lg mt-4">
        <Summary total={total} />
      </section>
    </main>
  );
}
