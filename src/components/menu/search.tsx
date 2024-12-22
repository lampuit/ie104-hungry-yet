"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Filter, Search, ShoppingCart, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { filterAndSearch } from "@/lib/data";
import { useDebouncedCallback } from "use-debounce";

interface SearchingAreaProps {
  totalAmount: number;
  filter: {
    minPrice: number;
    maxPrice: number;
    rating: number;
    search: string;
    categoryId: string;
  };
  onFilterChange: (newFilter: SearchingAreaProps["filter"]) => void;
}

export function SearchingArea({
  totalAmount,
  filter,
  onFilterChange,
}: SearchingAreaProps) {
  const [rating, setRating] = useState<string>("");
  const [search, setSearch] = useState<string>(filter.search);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const [priceRanges, setPriceRanges] = useState([
    { checked: false, min: 0, max: 20000 },
    { checked: false, min: 20000, max: 40000 },
    { checked: false, min: 40000, max: 60000 },
    { checked: false, min: 60000, max: 100000 },
    { checked: false, min: 100000, max: Infinity },
  ]);

  const ratingOptions = [
    { value: "5", label: "5.0" },
    { value: "4", label: "Từ 4.0 trở lên" },
    { value: "3", label: "Từ 3.0 trở lên" },
  ];

  const debouncedFilterAndSearch = useDebouncedCallback((newFilter) => {
    const formData = new FormData();
    Object.entries(newFilter).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    filterAndSearch(formData);
  }, 300);

  useEffect(() => {
    const newFilter = {
      ...filter,
      search,
      rating: parseFloat(rating) || 0,
    };
    onFilterChange(newFilter);
    debouncedFilterAndSearch(newFilter);
  }, [search, rating]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePriceChange = (index: number) => {
    const newPriceRanges = priceRanges.map((range, i) =>
      i === index ? { ...range, checked: !range.checked } : range,
    );
    setPriceRanges(newPriceRanges);
    updateFilter(newPriceRanges, rating, search);
  };

  const handleRatingChange = (value: string) => {
    setRating(value);
    updateFilter(priceRanges, value, search);
  };

  const updateFilter = (
    newPriceRanges: typeof priceRanges,
    newRating: string,
    newSearch: string,
  ) => {
    const checkedRanges = newPriceRanges.filter((range) => range.checked);
    const minPrice =
      checkedRanges.length > 0
        ? Math.min(...checkedRanges.map((r) => r.min))
        : 0;
    const maxPrice =
      checkedRanges.length > 0
        ? Math.max(...checkedRanges.map((r) => r.max))
        : Infinity;

    const newFilter = {
      ...filter,
      minPrice,
      maxPrice,
      rating: parseFloat(newRating) || 0,
      search: newSearch,
    };

    onFilterChange(newFilter);
    debouncedFilterAndSearch(newFilter);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="flex flex-col items-center justify-between space-y-4 px-4 py-6 sm:flex-row sm:space-x-4 sm:space-y-0">
      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-3xl font-semibold italic text-gray-800 sm:text-4xl">
          Thực đơn
        </h2>
        <div className="hidden sm:block">
          <svg
            width="220"
            height="2"
            viewBox="0 0 220 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 1C0 0.447715 0.447715 0 1 0H219C219.552 0 220 0.447715 220 1C220 1.55228 219.552 2 219 2H0.999999C0.447714 2 0 1.55228 0 1Z"
              fill="#99BD76"
            />
          </svg>
        </div>
      </div>

      <div className="flex w-full items-center justify-end space-x-2 px-6 sm:w-auto sm:space-x-4">
        <div
          className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-white p-4 shadow-md transition-all duration-300 ease-in-out sm:relative sm:inset-auto sm:flex-1 sm:p-0 sm:shadow-none ${isSearchVisible ? "translate-y-0" : "-translate-y-full sm:translate-y-0"}`}
        >
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 sm:w-64"
            placeholder="Nhập tên món ăn"
          />
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={toggleSearch}
          >
            <X size={20} />
          </Button>
        </div>

        <div className="flex items-center space-x-2 pr-2 sm:pr-0">
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={toggleSearch}
          >
            <Search size={20} />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <Filter size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-lg bg-white p-2 shadow-lg">
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
                    : `Từ ${range.min.toLocaleString()} - ${range.max.toLocaleString()} VNĐ`}
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />
              <DropdownMenuLabel>Xếp hạng</DropdownMenuLabel>

              <DropdownMenuRadioGroup
                value={filter.rating.toString()}
                onValueChange={handleRatingChange}
              >
                {ratingOptions.map((option) => (
                  <DropdownMenuRadioItem
                    key={option.value}
                    value={option.value}
                  >
                    <div className="flex items-center">
                      <span>{option.label}</span>
                      <Star className="ml-2 h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                    </div>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/menu/cart" className="relative">
            <div className="relative rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
              <ShoppingCart size={20} />
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {totalAmount}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
