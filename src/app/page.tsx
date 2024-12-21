"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TimeAndAddress } from "@/components/home/time-address";
import { Categories } from "@/components/home/categories";
import { ImgBg, ImgBgHover } from "@/components/home/img-bg";
import { Benefit } from "@/components/home/benefit";
import { Intro } from "@/components/home/intro";
import { Menu } from "@/components/home/menu";
import { OrderOnline } from "@/components/home/order-online";
import { Exhibition } from "@/components/home/exhibition";
import { Testimonials } from "@/components/home/testimonials";
import { HorizontalLine } from "@/components/home/intro";
import { FAQ } from "@/components/home/faq";
import { motion } from "framer-motion";
import { MobileHero } from "@/components/home/mobile-hero";
import { MobileBenefit } from "@/components/home/mobile-benefit";
import { Charm } from "next/font/google";
import Chatbot from "@/components/chatbot/chat-bot";

const charm = Charm({
  subsets: ["vietnamese"],
  weight: ["400", "700"],
});

export default function Homepage() {
  return (
    <main>
      {/*Herosection ở màn hình Desktop*/}
      <header className="relative hidden h-[calc(100vh-80px)] w-screen flex-col items-center justify-between overflow-hidden bg-black sm:flex">
        <div className="absolute right-full z-0 h-[calc(100vh-80px)]">
          <ImgBg />
        </div>
        <div className="absolute right-full z-10 h-[calc(100vh-80px)]">
          <ImgBgHover />
        </div>
        <div className="absolute z-0 h-[calc(100vh-80px)] w-full bg-gradient-radial from-black to-transparent"></div>
        <motion.div
          className="relative top-1/3 z-10 flex max-h-64 min-h-52 flex-col items-center justify-between gap-8 py-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <h1 className={`${charm.className} text-center text-7xl md:text-8xl`}>
            Hungry Yet?
          </h1>
          <p className="text-center text-xl md:text-2xl">
            Chọn hương vị, nhận yêu thương - chỉ từ một cú CLICK!
          </p>
          <div className="flex min-w-72 justify-around gap-x-3">
            <Button
              asChild
              className="rounded-3xl bg-amber-500 hover:bg-red-500"
            >
              <Link href={"/menu/cart"}>Đặt hàng ngay</Link>
            </Button>
            <Button asChild className="rounded-3xl bg-black hover:bg-red-500">
              <Link href={"/menu"}>Xem thực đơn</Link>
            </Button>
          </div>
        </motion.div>
        <div className="center relative z-10 sm:end-1/4 md:end-1/3">
          <TimeAndAddress />
        </div>
      </header>

      {/*Herosection ở màn hình Mobile*/}
      <MobileHero />

      <section className="my-16 hidden w-full overflow-hidden sm:inline-block">
        <Categories />
      </section>

      <section className="mt-10 flex flex-col items-center lg:mb-20">
        <div className="flex flex-col items-center justify-center gap-y-4">
          <p
            className={`${charm.className} inline-block text-center text-4xl font-semibold italic sm:hidden`}
          >
            Dịch vụ cung cấp
          </p>
          <div className="inline-bock sm:hidden">
            <HorizontalLine />
          </div>
        </div>
        <Benefit />
        <MobileBenefit />
      </section>

      <section className="mb-16">
        <Intro />
      </section>

      <section className="mb-16">
        <Menu />
      </section>

      <section className="mb-16">
        <OrderOnline />
      </section>

      <section className="mx-5 mb-12 flex flex-col items-center space-y-8 sm:mx-10 sm:px-10">
        <div className="flex w-full max-w-screen-2xl flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
          <div className="flex flex-col gap-y-4">
            <h2
              className={`${charm.className} text-center text-4xl font-semibold italic sm:text-5xl`}
            >
              Best Seller
            </h2>
            <HorizontalLine />
          </div>
          <Button
            asChild
            className="hidden items-center rounded-3xl bg-black hover:bg-red-500 sm:flex"
          >
            <Link href={"/exhibition"}>Xem blog</Link>
          </Button>
        </div>
        <div className="flex w-full justify-center">
          <Exhibition />
        </div>
        <Button
          asChild
          className="rounded-3xl bg-black hover:bg-red-500 sm:hidden"
        >
          <Link href={"/exhibition"}>Xem blog</Link>
        </Button>
      </section>

      <section className="mx-10 mb-16 flex flex-col items-center space-y-8 px-6 md:px-10">
        <div className="flex w-full max-w-screen-2xl flex-col items-center justify-between gap-4 sm:items-start">
          <h2
            className={`${charm.className} text-center text-4xl font-semibold italic sm:text-5xl`}
          >
            Nhận xét & đánh giá
          </h2>
          <HorizontalLine />
        </div>
        <Testimonials />
      </section>

      <section className="mx-10 mb-16 flex flex-col items-center justify-center gap-10 px-10 lg:flex-row lg:items-start lg:gap-40">
        <div className="flex flex-col justify-center gap-4">
          <h2
            className={`${charm.className} text-center text-4xl font-semibold italic sm:text-5xl lg:text-start`}
          >
            FAQs
          </h2>
          <HorizontalLine />
        </div>
        <ScrollArea className="h-[400px]">
          <FAQ />
        </ScrollArea>
      </section>

      <Chatbot />
    </main>
  );
}
