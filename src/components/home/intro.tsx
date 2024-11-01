import React from 'react'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Intro() {
    return (
        <div className="flex flex-col justify-between items-center gap-32">
            <div className="relative flex flex-row justify-center items-center gap-36">
                <div className="flex flex-col justify-center items-start gap-3">
                    <div className='flex flex-col justify-center items-start gap-3'>
                        <h2 className='italic font-semibold text-5xl'>Chào mừng</h2>
                        <HorizontalLine />
                        <p className='max-w-xl'>
                        Chào mừng bạn đến với HungryYet – nơi mang đến những món ăn ngon và chất lượng, 
                        sẵn sàng phục vụ bạn mọi lúc, mọi nơi! Hãy cùng khám phá thế giới ẩm thực đa dạng, 
                        tiện lợi đặt hàng và giao tận nơi, để mỗi bữa ăn đều trở thành niềm vui trọn vẹn. 
                        Chọn món yêu thích và để chúng tôi chăm sóc bữa ăn của bạn!
                        </p>
                    </div>
                    <Button asChild className='bg-black hover:bg-red-500 rounded-3xl'>
                        <Link href={"/about"}>Về chúng tôi</Link>
                    </Button>
                </div>
                <div className='relative'>
                    <Image
                        src="/images/intro-dish.jpg"
                        width={400}
                        height={280}
                        alt="Intro dish">
                    </Image>
                </div>
                <div className='absolute -z-10 start-2/3'>
                    <Bg1 />
                </div>
            </div>

            <div className="relative flex flex-row justify-center items-center gap-36">
                <div className='relative'>
                    <Image
                        src="/images/intro-dish.jpg"
                        width={400}
                        height={280}
                        alt="Intro dish">
                    </Image>
                </div>
                <div className='absolute -z-10 end-2/3'>
                    <Bg2 />
                </div>
                <div className="flex flex-col justify-center items-start gap-3">
                    <div className='flex flex-col justify-center items-start gap-3'>
                        <h2 className='italic font-semibold text-5xl'>Hương vị Việt Nam</h2>
                        <HorizontalLine />
                        <p className='max-w-xl'>
                        Hương vị ẩm thực Việt Nam là sự kết hợp tinh tế giữa các nguyên liệu tự nhiên và gia vị đặc trưng, 
                        mang đến những món ăn vừa ngon mắt vừa đậm đà. Từ vị thanh mát của phở, cái ngọt bùi của bún chả, 
                        đến độ giòn rụm của nem rán, mỗi món ăn đều phản ánh một phần của nền văn hóa và tình yêu dành cho 
                        ẩm thực quê nhà. Với sự cân bằng hoàn hảo giữa ngọt, mặn, chua, cay, ẩm thực Việt Nam không chỉ là 
                        trải nghiệm vị giác mà còn là hành trình khám phá văn hóa, gắn kết người với người qua từng món ăn.
                        </p>
                    </div>
                    <Button asChild className='bg-amber-500 hover:bg-red-500 rounded-3xl'>
                        <Link href={"/menu"}>Đặt hàng ngay</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export const HorizontalLine = () => (
    <svg width="220" height="2" viewBox="0 0 220 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 1C0 0.447715 0.447715 0 1 0H219C219.552 0 220 0.447715 220 1C220 1.55228 219.552 2 219 2H0.999999C0.447714 2 0 1.55228 0 1Z" fill="#99BD76" />
    </svg>
)

export const Bg1 = () => (
    <svg width="600" height="357" viewBox="0 0 446 357" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 16C0 7.16344 7.16344 0 16 0H488C496.837 0 504 7.16344 504 16V341C504 349.837 496.837 357 488 357H16C7.16344 357 0 349.837 0 341V16Z" fill="#99BD76" />
    </svg>
)

export const Bg2 = () => (
    <svg width="600" height="357" viewBox="0 0 446 357" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-58 16C-58 7.16344 -50.8366 0 -42 0H430C438.837 0 446 7.16344 446 16V341C446 349.837 438.837 357 430 357H-42C-50.8366 357 -58 349.837 -58 341V16Z" fill="#F1C964" />
    </svg>
)