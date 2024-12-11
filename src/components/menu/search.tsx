"use client";

import { Input } from "../ui/input";
import React, { useRef } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { Filter, Search, ShoppingCart } from "lucide-react";
import { useRouter } from 'next/navigation';

interface SearchingAreaProps {
    totalAmount: number;
}

export function SearchingArea({ totalAmount }: SearchingAreaProps) {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputWidth, setInputWidth] = useState("w-1/4");
    const handlleShoppingCartOnClick = () => {
        router.push('/menu/cart');
    }
    const handleSearchOnFocus = () => {
        setInputWidth("w-full");
    }
    const handleSearchOnBlur = () => {
        setInputWidth("w-72");
    }
    return (
        <div className="flex justify-between items-center sm:px-10 py-5 mx-10 gap-4 sm:gap-16">
            <div className="flex flex-col justify-center items-center gap-4 sm:min-w-40">
                <h2 className="italic font-semibold text-3xl sm:text-4xl md:text-5xl min-w-40">Thực đơn</h2>
                <div className="hidden sm:inline-block"><Line /></div>
            </div>
            <div className={`sm:grow flex justify-end items-center ${inputWidth} gap-2 focus:stroke-none`}>
                <div className="grow max-w-3xl relative flex justify-end items-center rounded-full">
                    <div className="hidden md:inline-block absolute right-2"><Search /></div>
                    <Input
                        ref={inputRef}
                        className="h-8 hidden w-1/3 md:inline-block bg-gray-100 border-none rounded-3xl text-xs text-black pl-3 hover:h-8 focus-visible:ring-0 focus-visible:ring-offset-0"
                        type="text"
                        onFocus={handleSearchOnFocus}
                        onBlur={handleSearchOnBlur}
                    />
                </div>
                <Search className="inline-block md:hidden" />
                <Filter size={24} />
                <Link href={"/menu/cart"}>
                    <div className="relative">
                        <ShoppingCart size={24} onClick={() => handlleShoppingCartOnClick()} />
                        <p className="absolute text-center left-3/4 bottom-3/4 p-[2px] text-[0.5rem] font-semibold w-4 h-4 bg-red-500 text-white rounded-full">{totalAmount}</p>
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
