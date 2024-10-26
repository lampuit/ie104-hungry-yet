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

export default function Homepage() {
  return (
    <main>
      <section>
        <header className="flex flex-col h-screen justify-between items-center">
          <div className="bg-black">
            <Navbar />
          </div>
          <div className="relative">
            {/* Cái này cho 3 hàng ảnh */}
          </div>

          <div className="flex flex-col justify-between items-center min-h-52 max-h-64">
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
        
      </section>

      {/* <header className="p-10">
        <Navbar />

        <section className="relative mt-40 flex flex-row justify-between px-40">
          <Image
            alt="hero-big"
            width={1092}
            height={1092}
            className="absolute -left-[352px] -top-[462px] -z-10 hidden xl:block"
            src="/images/dishes-background.png"
          />
          <Image
            alt=""
            width={600}
            height={600}
            className="relative hidden xl:block"
            src="/images/empty-1092.png"
          />
          <div>
            <h1 className="text-7xl font-bold">Hungry Yet?</h1>
            <p className="max-w-md py-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              tristique turpis lobortis, aliquet purus in, pellentesque odio.
              Aliquam erat volutpat. Quisque sit amet condimentum nulla.
            </p>
            <Button asChild>
              <Link href={"#"}>Đặt hàng ngay</Link>
            </Button>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center">
          <div className="text-center">
            <p>Hmmmm</p>
            <h1 className="text-2xl font-semibold">Trending Food</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="flex">
            <div className="flex gap-2">
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-5xl"
              >
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="flex items-center justify-center lg:basis-1/3"
                    >
                      <div className="p-1">
                        <div className="relative my-48 max-w-64 rounded-lg border-4 border-lime-500 bg-lime-100 px-2 py-24 text-center">
                          <Image
                            alt="bla bla 1"
                            width={154}
                            height={154}
                            className="absolute -top-24 left-11"
                            src={"/images/eclipse.png"}
                          />
                          <p className="font-semibold">Bla bla 1</p>
                          <p>Lorem ipsum dolor sit amet</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-green-500" />
                <CarouselNext className="bg-green-500" />
              </Carousel>
            </div>
          </div>
        </section>
      </header> */}
    </main>
  );
}
