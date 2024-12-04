"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TimeAndAddress } from "@/components/home/time-address";
import { Categories } from "@/components/home/categories";
import { ImgBg } from "@/components/home/img-bg";
import { Benefit } from "@/components/home/benefit";
import { Intro } from "@/components/home/intro";
import { Menu } from "@/components/home/menu";
import { OrderOnline } from "@/components/home/order-online";
import { Exhibition } from "@/components/home/exhibition";
import { Testimonials } from "@/components/home/testimonials";
import { HorizontalLine } from "@/components/home/intro";
import { FAQ } from "@/components/home/faq";
import { Charm } from "next/font/google";

const charm = Charm({
  subsets: ["vietnamese"],
  weight: ["400", "700"],
});

export default function Homepage() {

  return (
    <main>
      <header className="relative flex flex-col justify-between items-center h-[calc(100vh-80px)] w-screen overflow-hidden z-0 bg-black">
        <div className="absolute right-full h-5/6">
          <ImgBg />
        </div>
        <div className="relative top-1/3 flex flex-col justify-between items-center min-h-52 max-h-64 text-white z-10">
          <h1 className={`${charm.className} sm:text-7xl md:text-8xl text-center`}>Hungry Yet?</h1>
          <p className="sm:text-xl md:text-2xl text-center">Chọn hương vị, nhận yêu thương - chỉ từ một cú CLICK!</p>
          <div className="flex justify-around min-w-72 gap-x-3">
            <Button asChild className="bg-amber-500 rounded-3xl hover:bg-red-500">
              <Link href={"/menu/cart"}>Đặt hàng ngay</Link>
            </Button>
            <Button asChild className="bg-black rounded-3xl hover:bg-red-500">
              <Link href={"/menu"}>Xem thực đơn</Link>
            </Button>
          </div>
        </div>
        <div className="relative end-1/3">
          <TimeAndAddress />
        </div>
      </header>

      <section className="my-16">
        <Categories />
      </section>

      <section className="mb-20">
        <Benefit />
      </section>

      <section className="mb-20">
        <Intro />
      </section>

      <section className="mb-16">
        <Menu />
      </section>

      <section className="mb-16">
        <OrderOnline />
      </section>

      <section className="flex flex-col items-center mx-10 mb-16 px-10 space-y-8">
        <div className="flex justify-between items-center w-full max-w-screen-2xl">
          <div className="flex flex-col gap-y-4">
            <h2 className='italic font-semibold text-5xl'>Món ăn trưng bày</h2>
            <HorizontalLine />
          </div>
          <Button asChild className="bg-black hover:bg-red-500 rounded-3xl">
            <Link href={"/exhibition"}>Xem triển lãm</Link>
          </Button>
        </div>
        <div className="flex justify-center">
          <Exhibition />
        </div>
      </section>

      <section className="flex flex-col items-center mx-10 mb-16 space-y-8">
        <div className="flex flex-col justify-between px-10 gap-4 w-full max-w-screen-2xl">
          <h2 className="italic font-semibold text-5xl">Nhận xét & đánh giá</h2>
          <HorizontalLine />
        </div>
        <Testimonials />

      </section>

      <section className="mx-10 px-10 mb-16 flex flex-col md:flex-row justify-center items-center md:items-start gap-10 md:gap-20 lg:gap-40">
        <div className="flex flex-col justify-center gap-4">
          <h2 className="italic font-semibold text-5xl">FAQ</h2>
          <HorizontalLine />
        </div>
        <ScrollArea className="h-[400px]">
          <FAQ />
        </ScrollArea>
      </section>
    </main>
  );
}


