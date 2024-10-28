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
                        <h2 className='italic text-5xl'>Welcome</h2>
                        <HorizontalLine />
                        <p>
                            Welcome to our family-owned Filipino cuisine restaurant, where we<br />
                            invite you to savor the heartwarming flavors of the Philippines. Our<br />
                            commitment to quality and tradition means that every meal is crafted<br />
                            with care, using time-honored recipes and the freshest ingredients<br />
                            available. We invite you to join us in celebrating the warmth of family,<br />
                            the richness of culture, and the delight of Filipino cuisine!
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={"#"}>About us</Link>
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
                        <h2 className='italic text-5xl'>Vietnam Flavors</h2>
                        <HorizontalLine />
                        <p>
                            Welcome to our family-owned Filipino cuisine restaurant, where we<br />
                            invite you to savor the heartwarming flavors of the Philippines. Our<br />
                            commitment to quality and tradition means that every meal is crafted<br />
                            with care, using time-honored recipes and the freshest ingredients<br />
                            available. We invite you to join us in celebrating the warmth of family,<br />
                            the richness of culture, and the delight of Filipino cuisine!
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={"#"}>About us</Link>
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