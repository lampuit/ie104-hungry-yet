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
import { redirect } from "next/navigation";
import { columns } from "@/components/menu/cart/columns";
import { DataTable } from "@/components/menu/cart/data-table";
import { getCartsByUserId } from "@/lib/data";
import useSWR from "swr";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Footer from "@/components/ui/footer";
import { getSession } from "@/lib/auth-client";

//get shopping cart by userId
const fetcher = async (userId: string) => {
  return getCartsByUserId(userId);
};

export default function CartPage() {
  const [userId, setUserId] = useState<string | null>(null)
  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setUserId(sessionData?.data?.user?.id as string);
    };
    fetchSession();
  }, []);
  const { data: listDish, isLoading, error, mutate } = useSWR(userId, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  const [dishes, setDishes] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (listDish) {
      const formattedData = listDish.map((item: any) => ({
        id: item.productId || undefined,
        img: item.product?.imageUrl || "/images/fallback.jpg",
        name: item.product?.name,
        des: item.product?.description || "",
        cost: item.product?.price,
        amount: item?.quantity,
        isFavorite: item.product?.favorites.length === 0 ? false : true,
      }));
      setDishes(formattedData);
      setTotalAmount(listDish.reduce(
        (acc, item) => acc + item.product?.price * item.quantity,
        0
      ))
    }
  }, [listDish]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    const updatedDishes = dishes.map((dish) =>
      dish.id === id ? { ...dish, amount: newQuantity } : dish
    );
    setDishes(updatedDishes);

    // recalculate total amount
    const newTotalAmount = updatedDishes.reduce(
      (acc, item) => acc + item.amount * item.cost,
      0
    );
    setTotalAmount(newTotalAmount);
  };



  const formattedTotalAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(totalAmount);

  if (error) return <div>Error loading data.</div>;
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main>
      <section className="my-10 mx-10 w-72 text-base font-semibold">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/menu">Thực đơn</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Giỏ hàng</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <section>
        <div className="flex flex-col justify-center items-center">
          <DataTable columns={columns} data={dishes} onQuantityChange={handleQuantityChange}></DataTable>
        </div>
      </section>
      <section className="mx-10 py-5">
        <Summary totalAmount={formattedTotalAmount} />
      </section>
      <Footer />
    </main>
  );
}
