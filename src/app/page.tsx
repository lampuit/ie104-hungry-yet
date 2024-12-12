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
const charm = Charm({
  subsets: ["vietnamese"],
  weight: ["400", "700"],
});

export default function Homepage() {

  return (
    <main>
      {/*Herosection ở màn hình Desktop*/}
      <header className="hidden relative sm:flex flex-col justify-between items-center h-[calc(100vh-80px)] w-screen overflow-hidden bg-black" >
        <div className="absolute right-full h-[calc(100vh-80px)] z-0">
          <ImgBg />
        </div>
        <div className="absolute right-full h-[calc(100vh-80px)] z-10">
          <ImgBgHover />
        </div>
        <div className="absolute w-full h-[calc(100vh-80px)] bg-gradient-radial from-black to-transparent z-0"></div>
        <motion.div className="relative top-1/3 flex flex-col justify-between items-center min-h-52 max-h-64 text-white z-10 py-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}>
          <h1 className={`${charm.className} text-7xl md:text-8xl text-center`}>Hungry Yet?</h1>
          <p className="text-xl md:text-2xl text-center">Chọn hương vị, nhận yêu thương - chỉ từ một cú CLICK!</p>
          <div className="flex justify-around min-w-72 gap-x-3">
            <Button asChild className="bg-amber-500 rounded-3xl hover:bg-red-500">
              <Link href={"/menu/cart"}>Đặt hàng ngay</Link>
            </Button>
            <Button asChild className="bg-black rounded-3xl hover:bg-red-500">
              <Link href={"/menu"}>Xem thực đơn</Link>
            </Button>
          </div>
        </motion.div>
        <div className="relative center sm:end-1/4 md:end-1/3 z-10">
          <TimeAndAddress />
        </div>
      </header>

      {/*Herosection ở màn hình Mobile*/}
      <MobileHero />

      <section className="hidden sm:inline-block my-16 overflow-clip">
        <Categories />
      </section>

      <section className="flex flex-col items-center mt-10 lg:mb-20">
      <div className="flex flex-col justify-center items-center gap-y-4">
        <p className={`${charm.className} inline-block sm:hidden italic font-semibold text-4xl text-center`}>Dịch vụ cung cấp</p>
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

      <section className="flex flex-col items-center mx-10 mb-12 px-10 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 w-full max-w-screen-2xl">
          <div className="flex flex-col gap-y-4">
            <h2 className='italic font-semibold text-4xl text-center sm:text-5xl'>Best Seller</h2>
            <HorizontalLine />
          </div>
          <Button asChild className="hidden sm:inline-block bg-black hover:bg-red-500 rounded-3xl">
            <Link href={"/exhibition"}>Xem blog</Link>
          </Button>
        </div>
        <div className="flex justify-center w-full">
          <Exhibition />
        </div>
        <Button asChild className="inline-block sm:hidden bg-black hover:bg-red-500 rounded-3xl">
            <Link href={"/exhibition"}>Xem blog</Link>
          </Button>
      </section>

      <section className="flex flex-col items-center mx-10 md:px-10 px-6 mb-16 space-y-8">
        <div className="flex flex-col justify-between items-center sm:items-start gap-4 w-full max-w-screen-2xl">
          <h2 className="italic font-semibold text-4xl text-center sm:text-5xl">Nhận xét & đánh giá</h2>
          <HorizontalLine />
        </div>
        <Testimonials />

      </section>

      <section className="mx-10 px-10 mb-16 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10 lg:gap-40">
        <div className="flex flex-col justify-center gap-4">
          <h2 className="italic font-semibold text-4xl text-center lg:text-start sm:text-5xl">FAQs</h2>
          <HorizontalLine />
        </div>
        <ScrollArea className="h-[400px]">
          <FAQ />
        </ScrollArea>
      </section>
    </main>
  );
}


