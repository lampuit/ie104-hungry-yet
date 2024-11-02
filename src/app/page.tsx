"use client";

import Link from "next/link";
import { Navbar } from "@/components/home/nav-bar";
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

export default function Homepage() {
  return (
    <main className="overflow-hidden">
      <section className="flex flex-col justify-center items-center h-screen w-screen">
        <header className="flex flex-col justify-between items-center h-[85%] w-screen overflow-hidden z-0 bg-black">
          <div className="bg-black z-10">
            <Navbar />
          </div>
          <div className="absolute right-full top-16 h-4/6">
            <ImgBg />
          </div>
          <div className="flex flex-col justify-between items-center min-h-52 max-h-64 text-white z-10">
            <h1 className="sm:text-7xl md:text-8xl text-center">Hungry Yet?</h1>
            <p className="sm:text-xl md:text-2xl text-center">Chọn hương vị, nhận yêu thương - chỉ từ một cú CLICK!</p>
            <div className="flex flex-row justify-around min-w-72">
              <Button asChild className="bg-amber-500 rounded-3xl hover:bg-red-500">
                <Link href={"#"}>Đặt hàng ngay</Link>
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
        <div className="h-[15%]">
          <Categories />
        </div>
      </section>

      <section className="flex flex-col justify-center items-center">
        <div className="bg-neutral-100 mt-16 mb-32 py-12">
          <Benefit />
        </div>
      </section>

      <section>
        <Intro />
      </section>

      <section className="mt-24">
        <Menu />
      </section>

      <section className="my-16">
        <OrderOnline />
      </section>

      <section className="my-16">
        <Exhibition />
      </section>

      <section className="">
        <div className="flex flex-col justify-between items-start gap-4 px-32">
          <h2 className="italic font-semibold text-5xl">Nhận xét & đánh giá</h2>
          <div className=""><HorizontalLine /></div>
        </div>
        <div className="mt-4 flex flex-row justify-center item-center">
          <Testimonials />
        </div>

      </section>

      <section>
        <div className="flex flex-row justify-center items-start gap-24 mt-16 mx-12">
          <div className="flex flex-col justify-center items-start gap-4">
            <h2 className="italic text-5xl">FAQ</h2>
            <div>
              <HorizontalLine />
            </div>
          </div>
          <ScrollArea className="h-[240px] rounded-md p-4">
            <FAQ />
          </ScrollArea>
        </div>
      </section>

      <footer className="mt-10 h-80 bg-black">
      </footer>
    </main>
  );
}


