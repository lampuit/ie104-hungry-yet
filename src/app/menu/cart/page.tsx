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
import { ProductList } from "@/components/menu/cart/product-list";
import { Summary } from "@/components/menu/cart/summary";
import { getSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import useSWR from "swr";

// Lấy session
export const fetcher = async () => {
  const session = await getSession();
  return session;
};

export default function CartPage() {
  const { data: userId, error } = useSWR("userId", fetcher);
  if (!userId) {
    redirect("/login");
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
        <ProductList />
      </section>
      <section className="mx-10 py-5">
        <Summary />
      </section>
      <footer className="mt-10 h-80 bg-black"></footer>
    </main>
  );
}