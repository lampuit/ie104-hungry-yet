"use client";

import { Input } from "../ui/input";
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { CheckIcon, Filter, Search, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DropdownMenuCheckboxItemProps, ItemIndicator } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { filterAndSearch } from "@/lib/data";

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface SearchingAreaProps {
    totalAmount: number;
    filter: {
        minPrice: number;
        maxPrice: number;
        rating: number;
        search: string;
        categoryId: string;
    };
    onFilterChange: (newFilter: SearchingAreaProps['filter']) => void;
}

export function SearchingArea({ totalAmount, filter, onFilterChange }: SearchingAreaProps) {
    const [priceRanges, setPriceRanges] = useState([
        { checked: false, min: 0, max: 20000 },
        { checked: false, min: 20000, max: 40000 },
        { checked: false, min: 40000, max: 60000 },
        { checked: false, min: 60000, max: 100000 },
        { checked: false, min: 100000, max: Infinity },
    ]);

    const [rating, setRating] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState(filter.search);

    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputWidth, setInputWidth] = useState("w-1/4");

    useEffect(() => {
        setSearchTerm(filter.search);
    }, [filter.search]);

    const handlePriceChange = (index: number) => {
        const newPriceRanges = priceRanges.map((range, i) =>
            i === index ? { ...range, checked: !range.checked } : range
        );
        setPriceRanges(newPriceRanges);
        updateFilter(newPriceRanges, rating, searchTerm);
    };

    const handleRatingChange = (value: string) => {
        setRating(value);
        updateFilter(priceRanges, value, searchTerm);
    };

    const updateFilter = (newPriceRanges: typeof priceRanges, newRating: string, newSearch: string) => {
        const checkedRanges = newPriceRanges.filter(range => range.checked);
        const minPrice = checkedRanges.length > 0 ? Math.min(...checkedRanges.map(r => r.min)) : 0;
        const maxPrice = checkedRanges.length > 0 ? Math.max(...checkedRanges.map(r => r.max)) : Infinity;

        const newFilter = {
            ...filter,
            minPrice,
            maxPrice,
            rating: parseFloat(newRating) || 0,
            search: newSearch,
        };

        onFilterChange(newFilter);
        const formData = new FormData();
        Object.entries(newFilter).forEach(([key, value]) => {
            formData.append(key, value.toString());
        });
        filterAndSearch(formData);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        updateFilter(priceRanges, rating, newSearchTerm);
    };

    const handleShoppingCartClick = () => {
        router.push('/menu/cart');
    };

    const handleSearchFocus = () => {
        setInputWidth("w-full");
    };

    const handleSearchBlur = () => {
        setInputWidth("w-72");
    };

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
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                    />
                </div>
                <Search className="inline-block md:hidden" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Filter size={24} className="hover:stroke-red-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Bộ lọc</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuLabel>Giá</DropdownMenuLabel>
                        {priceRanges.map((range, index) => (
                            <DropdownMenuCheckboxItem
                                key={index}
                                checked={range.checked}
                                onCheckedChange={() => handlePriceChange(index)}
                            >
                                {range.max === Infinity
                                    ? `Trên ${range.min.toLocaleString()} VNĐ`
                                    : `Từ ${range.min.toLocaleString()} - ${range.max.toLocaleString()} VNĐ`
                                }
                            </DropdownMenuCheckboxItem>
                        ))}

                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Xếp hạng</DropdownMenuLabel>

                        <DropdownMenuRadioGroup value={rating} onValueChange={handleRatingChange}>
                            <DropdownMenuRadioItem value="5.0">
                                <ItemIndicator><CheckIcon /></ItemIndicator>
                                5.0
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="4.0">
                                <ItemIndicator><CheckIcon /></ItemIndicator>
                                Từ 4.0 trở lên
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="3.0">
                                <ItemIndicator><CheckIcon /></ItemIndicator>
                                Từ 3.0 trở lên
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>

                    </DropdownMenuContent>
                </DropdownMenu>

                <Link href={"/menu/cart"}>
                    <div className="relative">
                        <ShoppingCart size={24} className="hover:stroke-red-500" onClick={handleShoppingCartClick} />
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
