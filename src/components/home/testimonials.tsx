import Image from 'next/image';
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Testimonials() {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md mx-auto mt-8">
            <CarouselContent>
                {Array.from({ length: 10 }).map((_, index) => (
                    <CarouselItem key={index} className="md:basis-full lg:basis-1/2 xl:basis-1/3">
                        <Card>
                            <CardContent className="py-5 px-3 flex flex-col justify-between items-center gap-3 h-80">
                                <div className="flex gap-2">
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </div>
                                <p className="text-center">
                                    "Food here is absolutely outstanding! Every dish bursts with so much flavor and authenticity.
                                    Friendly staff, great food, and exceptional service makes dining here an unforgettable experience.
                                    Highly recommend!"
                                </p>
                                <ThinLine />
                                <div className="flex justity-start items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src="/images/main-dishes.jpg" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col justify-between'>
                                        <p className='font-semibold'>Phở bò</p>
                                        <p>Món ăn</p>
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

export const Star = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.7342 10.295L13.9811 3.7547C14.3979 2.9151 15.6021 2.9151 16.0189 3.7547L19.2658 10.295L26.5268 11.3502C27.4585 11.4856 27.8298 12.6242 27.1553 13.2774L21.9022 18.3647L23.1419 25.5518C23.3011 26.4747 22.3267 27.1785 21.4932 26.7427L15 23.3475L8.50684 26.7427C7.67325 27.1785 6.69886 26.4747 6.85807 25.5518L8.09782 18.3647L2.84469 13.2774C2.17022 12.6242 2.54152 11.4856 3.47315 11.3502L10.7342 10.295Z" fill="#F1C964" stroke="#F1C964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export const ThinLine = () => (
    <svg width="360" height="2" viewBox="0 0 360 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="1" x2="360" y2="1" stroke="#F1F1F1" strokeWidth="2" />
    </svg>
)