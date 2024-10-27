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
import { ImgBg } from "@/components/home/img-bg";
import { Benefit } from "@/components/home/benefit";
import { Intro } from "@/components/home/intro";

export default function Homepage() {
  return (
    <main className="w-screen">
      <section>
        <header className="flex flex-col justify-between items-center h-screen bg-black">
          <Navbar />

          <div className="relative">
            {/* Cái này cho 3 hàng ảnh */}
            
          </div>

          <div className="flex flex-col justify-between items-center min-h-52 max-h-64 text-white">
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
        {/* Cái này cho thanh ảnh chạy */}
      </section>

      <section>
        <div className="bg-neutral-100 my-16 py-12">
          <Benefit />
        </div>
      </section>

      <section>
        <Intro />
      </section>

    </main>
  );
}
