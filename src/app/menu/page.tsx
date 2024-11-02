"use client";

import { useState } from "react";
import { Navbar } from "@/components/home/nav-bar";
import { Search } from "@/components/menu/search";
import { Category } from "@/components/menu/category";
import { DishList } from "@/components/menu/menu";
import { listCategory } from "@/components/menu/category";
import { dishes } from "@/components/menu/category";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function MenuPage() {
    const [clickedIndex, setClickedIndex] = useState<number>(0);
    return (
        <main className="w-screen">
            <header className="flex flex-col justify-center items-center w-screen bg-black z-10">
                <Navbar />
            </header>
            <section className="my-8">
                <Search />
            </section>
            <section>
                <Category clickedIndex={clickedIndex} setClickedIndex={setClickedIndex} />
            </section>
            <section>
                <DishList category={listCategory[clickedIndex]} dishes={dishes} />
            </section>
            <Pagination className="mt-8">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    {/* <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem> */}
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <footer className="mt-10 h-80 bg-black">
            </footer>
        </main>
    );
}