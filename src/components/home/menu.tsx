import { HorizontalLine } from "./intro"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { getAllCategory } from "@/lib/data";
import useSWR from "swr";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


const categoriesFectcher = async () => {
    return getAllCategory();
}

export function Menu() {
    const { data: categories, error } = useSWR("categories", categoriesFectcher);
    const router = useRouter();
    const handleCategoryClick = (categoryId: string) => {
        localStorage.setItem("category", categoryId);
        router.push("/menu");
    };

    return (
        <div className="mx-5 sm:mx-10 px-10 sm:px-10 flex flex-col justify-center items-center gap-y-8 ">
            <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-screen-2xl gap-y-4">
                <div className="flex flex-col justify-center sm:justify-start gap-y-4">
                    <h2 className='italic font-semibold text-4xl text-center sm:text-5xl'>Thực đơn</h2>
                    <div className="inline-block">
                        <HorizontalLine />
                    </div>
                </div>
                <Button asChild className="hidden sm:inline-block bg-black hover:bg-red-500 rounded-3xl">
                    <Link href={"/menu"}>Xem thực đơn</Link>
                </Button>
            </div>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full max-w-screen-2xl px-4 sm:px-16"
            >
                <CarouselContent>
                    {categories?.map((category) => (
                        <CarouselItem key={category.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 text-center">
                            <div className="overflow-clip h-[200px] relative"
                                onClick={() => handleCategoryClick(category.id)}>
                                <Image
                                    src={category.name === "Cơm" ? "https://aw6zddwvvm1te20u.public.blob.vercel-storage.com/C%C6%A1m%20s%C6%B0%E1%BB%9Dn-Rhh9PxlZbTvaThevBJXUraS3Aqrvl2" :
                                        category.name === "Món nước" ? "https://aw6zddwvvm1te20u.public.blob.vercel-storage.com/Ph%E1%BB%9F%20b%C3%B2-jE3qCxmz6FXq9U01SZ2zAyV83U4XnB" :
                                            category.name === "Đồ uống" ? "https://aw6zddwvvm1te20u.public.blob.vercel-storage.com/C%C3%A0%20ph%C3%AA%20s%E1%BB%AFa%20%C4%91%C3%A1-PFARJLTrTEgr6UEFJeeKpA6jaMc4mK" :
                                                category.name === "Bánh ngọt" ? "https://aw6zddwvvm1te20u.public.blob.vercel-storage.com/B%C3%A1nh%20b%C3%B2-ljJkUSP5kxOQtmEmjvwOKVkoOxeIgo" :
                                                    category.name === "Món lẩu" ? "https://aw6zddwvvm1te20u.public.blob.vercel-storage.com/L%E1%BA%A9u%20th%C3%A1i%20chua%20cay-doiXtZESEyMWNfB2cYi7957M8xTMXt" :
                                                        "https://aw6zddwvvm1te20u.public.blob.vercel-storage.com/B%C3%A1nh%20tr%C3%A1ng%20tr%E1%BB%99n-qvzjvOKGOjQrrD32G8t4VXhbKx4tNW"
                                    }
                                    alt={category.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg hover:scale-125 transition"
                                />
                            </div>
                            <p className="mt-2 text-2xl font-semibold">{category.name}</p>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <Button asChild className="inline-block sm:hidden bg-black hover:bg-red-500 rounded-3xl">
                <Link href={"/menu"}>Xem thực đơn</Link>
            </Button>
        </div>
    )
}