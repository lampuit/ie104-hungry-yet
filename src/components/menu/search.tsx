"use client";

import { Input } from "../ui/input";
import React, { useRef } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { Filter, Search, ShoppingCart } from "lucide-react";
import { useRouter } from 'next/navigation';

// interface SearchingAreaProps {
//     totalAmount: number;
// }

export function SearchingArea() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputWidth, setInputWidth] = useState("w-1/4");
    const handleSearchIconClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        setInputWidth("w-2/3");
    };
    const handleInputFocus = () => {
        setInputWidth("w-2/3");
    };

    const handleInputBlur = () => {
        setInputWidth("w-1/3");
    };
    const handlleShoppingCartOnClick = () => {
        router.push('/menu/cart');
    }
    return (
        <div className="flex justify-between items-center px-10 py-5 mx-10">
            <div className="flex flex-col justify-center items-center gap-4">
                <h2 className="italic font-semibold md:text-5xl sm:text-4xl">Thực đơn</h2>
                <Line />
            </div>
            <div className={`flex justify-betwenn items-center ${inputWidth} gap-2 focus:stroke-none`}>
                <div className="relative flex justify-end items-center w-full bg-gray-100 rounded-full">
                    <div className="absolute left-2"><Search onClick={() => handleSearchIconClick()} /></div>
                    <Input
                        ref={inputRef}
                        className="h-8 bg-gray-100 border-none rounded-3xl text-xs text-black pl-10 hover:h-8 focus-visible:ring-0 focus-visible:ring-offset-0"
                        type="text"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                </div>
                <Filter size={24}/>
                <Link href={"/menu/cart"}>
                    <div className="relative">
                        <ShoppingCart size={24} onClick={() => handlleShoppingCartOnClick()}/>
                        <p className="absolute text-center left-3/4 bottom-3/4 p-[2px] text-[0.5rem] font-semibold w-4 h-4 bg-red-500 text-white rounded-full">0</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export const Line = () => (
    <svg width="220" height="2" viewBox="0 0 220 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 1C0 0.447715 0.447715 0 1 0H219C219.552 0 220 0.447715 220 1C220 1.55228 219.552 2 219 2H0.999999C0.447714 2 0 1.55228 0 1Z" fill="#99BD76" />
    </svg>
)
