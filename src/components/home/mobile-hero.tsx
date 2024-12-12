import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"

const imgList = [
    { name: 'img2', src: '/images/food/img2.jpg', alt: 'food img2' },
    { name: 'img5', src: '/images/food/img5.jpg', alt: 'food img5' },
    { name: 'img6', src: '/images/food/img6.jpg', alt: 'food img6' },
    { name: 'img9', src: '/images/food/img9.jpg', alt: 'food img9' },
    { name: 'img10', src: '/images/food/img10.jpg', alt: 'food img10' },
]

export const MobileHero = () => {
    return (
        <header className="flex flex-col items-center relative sm:hidden w-full my-8 space-y-8">
            <Carousel className="w-full">
                <CarouselContent>
                    {imgList.map((img, index) => (
                        <CarouselItem key={index} className="relative w-full h-[250px]">
                            <Image
                                src={img.src}
                                alt={img.name}
                                layout="fill"
                                objectFit="cover"
                            >
                            </Image>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="flex justify-around min-w-36 gap-x-3">
                <Button asChild className="bg-amber-500 rounded-3xl hover:bg-red-500">
                    <Link href={"/menu/cart"}>Đặt hàng ngay</Link>
                </Button>
            </div>
        </header>
    )
}