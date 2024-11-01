"use client";

import Link from "next/link";
import { Navbar } from "@/components/home/nav-bar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
    <main className="overflow-hidden w-screen">
      <section className="bg-black z-0">
        <header className="flex flex-col justify-between items-center h-screen overflow-hidden z-10">
          <div className="bg-black opacity z-20">
            <Navbar />
          </div>
          <div className="absolute right-full top-24 h-4/5">
            <ImgBg />
          </div>
          <div className="flex flex-col justify-between items-center min-h-52 max-h-64 text-white z-10">
            <h1 className="text-8xl text-center">Hungry Yet?</h1>
            <p className="text-2xl text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime assumenda natus</p>
            <div className="flex flex-row justify-around min-w-64">
              <Button asChild>
                <Link href={"#"}>Order Now</Link>
              </Button>
              <Button asChild>
                <Link href={"#"}>View Menu</Link>
              </Button>
            </div>
          </div>
          <div className="relative end-1/3">
            <TimeAndAddress />
          </div>
        </header>
      </section>

      <section>
        <Categories />
      </section>

      <section>
        <div className="bg-neutral-100 my-16 py-12">
          <Benefit />
        </div>
      </section>

      <section className="mb-16">
        <Intro />
      </section>

      <section className="my-24">
        <Menu />
      </section>

      <section className="">
        <OrderOnline />
      </section>

      <section className="my-16">
        <Exhibition />
      </section>

      <section className="">
        <div className="flex flex-col justify-between items-start gap-4">
          <h2 className="italic text-5xl px-12">Testimonials</h2>
          <div className="px-12"><HorizontalLine /></div>
          <div className="mt-4 grid grid-cols-4 overflow-hidden w-screen gap-8">
            <Testimonials />
            <Testimonials />
            <Testimonials />
            <Testimonials />
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-row justify-center items-start gap-24 w-2/3 mt-16 mx-12">
          <div className="flex flex-col justify-center items-start gap-4">
            <h2 className="italic text-5xl">FAQ</h2>
            <div>
              <HorizontalLine />
            </div>
          </div>
          <FAQ />
        </div>
      </section>

      <footer className="mt-10 h-80 w-screen bg-black">
      </footer>
    </main>
  );
}
