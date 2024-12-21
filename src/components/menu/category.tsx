import React, { useEffect, useState } from "react";
import { getAllCategory } from "@/lib/data";
import useSWR from "swr";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Lấy danh sách các danh mục món ăn
export const CategoryFetcher = async () => {
  return getAllCategory();
};

interface CategoryProps {
  clickedIndex: string;
  setClickedIndex: (index: string) => void;
}

export function Category({ clickedIndex, setClickedIndex }: CategoryProps) {
  const { data, error } = useSWR("category", CategoryFetcher);
  const [listCate, setCate] = useState<any[]>([]);

  // Tự động gán dữ liệu vào listCate khi data được fetch
  useEffect(() => {
    if (data) {
      setClickedIndex(
        localStorage.getItem("clickedIndex")
          ? localStorage.getItem("clickedIndex") || data[0].id
          : "",
      );
      setCate(data);
    }
  }, [data, setClickedIndex]);

  return (
    <ScrollArea>
      <div className="flex flex-row items-center justify-center gap-4 px-4 py-5">
        {listCate.map((cate) => (
          <div
            key={cate.id}
            className="flex w-32 flex-col items-center justify-end gap-2"
          >
            <p
              className={`cursor-pointer text-center text-sm font-semibold md:text-base ${clickedIndex === cate.id ? "text-amber-500" : "text-black"} hover:text-amber-500`}
              onClick={() => setClickedIndex(cate.id)}
            >
              {cate.name}
            </p>
            {clickedIndex === cate.id && <Underline />}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export const Underline = () => (
  <svg
    width="60"
    height="4"
    viewBox="0 0 60 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 0H58C59.1046 0 60 0.895431 60 2C60 3.10457 59.1046 4 58 4H2C0.89543 4 0 3.10457 0 2C0 0.895431 0.89543 0 2 0Z"
      fill="#E99B3F"
      rx="2"
      ry="2"
    />
  </svg>
);
