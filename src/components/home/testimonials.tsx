import Image from "next/image";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Stars } from "lucide-react";
import useSWR from "swr";
import { getAllRatings, getProductById } from "@/lib/data";
import { useRouter } from "next/navigation";

const fetcher = async () => {
  const ratings = await getAllRatings();
  return ratings;
};

export function Testimonials() {
  const { data: listRatings, error } = useSWR("ratings", fetcher);
  const router = useRouter();
  const handleCardOnClick = (productId: string) => {
    router.push(`/detail?id=${productId}`);
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="mx-auto mt-8 w-11/12 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl"
    >
      <CarouselContent>
        {listRatings?.map((rating, index) => (
          <CarouselItem
            key={index}
            className="md:basis-full lg:basis-1/2 xl:basis-1/3"
          >
            <Card
              onClick={() => handleCardOnClick(rating.product.id)}
              className="hover:border-black"
            >
              <CardContent className="flex h-full flex-col items-center justify-between gap-4 px-3 py-5">
                <div className="flex gap-2">
                  {Array(rating.star)
                    .fill(0)
                    .map((_, index) => (
                      <Star
                        key={index}
                        className="fill-amber-400 stroke-amber-400"
                        size={30}
                      />
                    ))}
                </div>
                <p className="text-center">{rating?.review}</p>
                <ThinLine />
                <div className="justity-start flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={rating.product.imageUrl || "/images/main-dishes.jpg"}
                      sizes=""
                    />
                    <AvatarFallback>F</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-between">
                    <p className="font-semibold">{rating?.product?.name}</p>
                    <p>{rating?.product?.category?.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export const ThinLine = () => (
  <svg
    width="360"
    height="2"
    viewBox="0 0 360 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line y1="1" x2="360" y2="1" stroke="#F1F1F1" strokeWidth="2" />
  </svg>
);
