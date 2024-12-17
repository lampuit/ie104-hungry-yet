import { HorizontalLine } from "./intro"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { getAllCategory } from "@/lib/data";
import useSWR from "swr";
import Autoplay from "embla-carousel-autoplay"
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
} from "@/components/ui/carousel"
import React from "react";


const categoriesFectcher = async () => {
    return getAllCategory();
}

export function Menu() {
    const { data: categories, error } = useSWR("categories", categoriesFectcher);
    const router = useRouter();
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    const handleCategoryClick = (categoryId: string) => {
        localStorage.setItem("category", categoryId);
        router.push("/menu");
    };

    return (
        <div className="mx-4 sm:mx-10 px-10 sm:px-10 flex flex-col justify-center items-center gap-y-8 ">
            <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-screen-2xl gap-y-4">
                <div className="flex flex-col justify-center sm:justify-start gap-y-4">
                    <h2 className={`${charm.className} italic font-semibold text-4xl text-center sm:text-5xl`}>Thực đơn</h2>
                    <div className="inline-block">
                        <HorizontalLine />
                    </div>
                </div>
                <Button asChild className="hidden sm:flex items-center bg-black hover:bg-red-500 rounded-3xl">
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
                        <CarouselItem key={category.id} className="basis-1/2 lg:basis-1/3 xl:basis-1/4 text-center">
                            <div className="overflow-clip h-[100px] sm:h-[200px] relative"
                                onClick={() => handleCategoryClick(category.id)}>
                                <Image
                                    src={category.imageUrl || ""}
                                    alt={category.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg hover:scale-125 transition"
                                />
                            </div>
                            <p className="mt-2 text-lg sm:text-xl lg:text-2xl font-semibold">{category.name}</p>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="" />
                <CarouselNext className="" />
            </Carousel>
            <Button asChild className="w-full max-w-80 sm:hidden bg-black hover:bg-red-500 rounded-3xl">
                <Link href={"/menu"} className="text-center">Xem thực đơn</Link>
            </Button>
        </div>
    )
}