'use client'

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
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";


export default function Homepage() {
  return (
    <main>
      <header className="p-10">
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

        <section className="flex flex-col justify-center items-center">
          <div className="text-center">
            <p>Hmmmm</p>
            <h1 className="font-semibold text-2xl">Trending Food</h1>
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
                    <CarouselItem key={index} className="flex lg:basis-1/3 justify-center items-center">
                      <div className="p-1">
                        <div className="relative text-center bg-lime-100 border-4 border-lime-500 rounded-lg py-24 px-2 max-w-64 my-48">
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
                <CarouselNext className="bg-green-500"/>
              </Carousel>

            </div>
          </div>
        </section>

      </header>
    </main>
  );
}
