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
import { Star, Stars } from 'lucide-react';

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
                                    <Star className='fill-amber-400 stroke-amber-400' size={30}/>
                                    <Star className='fill-amber-400 stroke-amber-400' size={30}/>
                                    <Star className='fill-amber-400 stroke-amber-400' size={30}/>
                                    <Star className='fill-amber-400 stroke-amber-400' size={30}/>
                                    <Star className='fill-amber-400 stroke-amber-400' size={30}/>
                                </div>
                                <p className="text-center">
                                    "Food here is absolutely outstanding! Every dish bursts with so much flavor and authenticity.
                                    Friendly staff, great food, and exceptional service makes dining here an unforgettable experience.
                                    Highly recommend!"
                                </p>
                                <ThinLine />
                                <div className="flex justity-start items-center gap-4">
                                    <Avatar className='w-12 h-12'>
                                        <AvatarImage src="/images/main-dishes.jpg" sizes=''/>
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

export const ThinLine = () => (
    <svg width="360" height="2" viewBox="0 0 360 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="1" x2="360" y2="1" stroke="#F1F1F1" strokeWidth="2" />
    </svg>
)