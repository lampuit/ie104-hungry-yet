import React, { useEffect, useState } from 'react';
import { getAllCategory } from '@/lib/data';
import useSWR from "swr";

// Lấy danh sách các danh mục món ăn
export const CategoryFetcher = async () => {
    return getAllCategory();
}

interface CategoryProps {
    clickedIndex: string;
    setClickedIndex: (index: string) => void;
}

export function Category({ clickedIndex, setClickedIndex }: CategoryProps) {
    const { data, error } = useSWR('category', CategoryFetcher);
    const [listCate, setCate] = useState<any[]>([]);

    // Tự động gán dữ liệu vào listCate khi data được fetch
    useEffect(() => {
        if (data) {
            setClickedIndex(localStorage.getItem('clickedIndex') ? (localStorage.getItem('clickedIndex')) || data[0].id : "");
            setCate(data);
        }
    }, [data]);

    return (
        <div className="flex flex-row justify-center items-center gap-4 py-5">
            {listCate.map((cate) => (
                <div key={cate.id} className="flex flex-col justify-end items-center gap-2 w-32">
                    <p
                        className={`md:text-base sm:text-sm font-semibold cursor-pointer ${clickedIndex === cate.id ? 'text-amber-500' : 'text-black'} hover:text-amber-500`}
                        onClick={() => setClickedIndex(cate.id)}
                    >
                        {cate.name}
                    </p>
                    {clickedIndex === cate.id && <Underline />}
                </div>
            ))}
        </div>
    );
}

export const Underline = () => (
    <svg width="123" height="4" viewBox="0 0 123 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 2C0 0.895431 0.89543 0 2 0H121C122.105 0 123 0.895431 123 2C123 3.10457 122.105 4 121 4H2C0.895429 4 0 3.10457 0 2Z" fill="#E99B3F" />
    </svg>

)