import { HorizontalLine } from "./intro";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAllCategory } from "@/lib/data";
import useSWR from "swr";
import Autoplay from "embla-carousel-autoplay";
import { Charm } from "next/font/google";
const charm = Charm({
  subsets: ["vietnamese"],
  weight: ["400", "700"],
});

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

const categoriesFectcher = async () => {
  return getAllCategory();
};

export function Menu() {
  const { data: categories, error } = useSWR("categories", categoriesFectcher);
  const router = useRouter();
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  const handleCategoryClick = (categoryId: string) => {
    localStorage.setItem("category", categoryId);
    router.push("/menu");
  };

  return (
    <div className="mx-4 flex flex-col items-center justify-center gap-y-8 px-10 sm:mx-10 sm:px-10">
      <div className="flex w-full max-w-screen-2xl flex-col items-center justify-between gap-y-4 sm:flex-row">
        <div className="flex flex-col justify-center gap-y-4 sm:justify-start">
          <h2
            className={`${charm.className} text-center text-4xl font-semibold italic sm:text-5xl`}
          >
            Thực đơn
          </h2>
          <div className="inline-block">
            <HorizontalLine />
          </div>
        </div>
        <Button
          asChild
          className="hidden items-center rounded-3xl bg-black hover:bg-red-500 sm:flex"
        >
          <Link href={"/menu"}>Xem thực đơn</Link>
        </Button>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        plugins={[plugin.current]}
        className="w-full max-w-screen-2xl sm:px-16"
      >
        <CarouselContent>
          {categories?.map((category) => (
            <CarouselItem
              key={category.id}
              className="basis-1/2 text-center lg:basis-1/3 xl:basis-1/4"
            >
              <div
                className="relative h-[100px] overflow-clip sm:h-[200px]"
                onClick={() => handleCategoryClick(category.id)}
              >
                <Image
                  src={category.imageUrl || ""}
                  alt={category.name}
                  fill
                  priority
                  sizes="100%"
                  style={{ objectFit: "cover" }}
                  className="rounded-lg transition hover:scale-125"
                />
              </div>
              <p className="mt-2 text-lg font-semibold sm:text-xl lg:text-2xl">
                {category.name}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="" />
        <CarouselNext className="" />
      </Carousel>
      <Button
        asChild
        className="w-3/4 max-w-80 rounded-3xl bg-black hover:bg-red-500 sm:hidden"
      >
        <Link href={"/menu"} className="text-center">
          Xem thực đơn
        </Link>
      </Button>
    </div>
  );
}
