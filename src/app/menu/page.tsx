"use client";

import { useState } from "react";
import { Search } from "@/components/menu/search";
import { Category } from "@/components/menu/category";
import { DishList } from "@/components/menu/dish-list";
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
import { ScrollArea } from "@/components/ui/scroll-area"

export default function MenuPage() {
    const [clickedIndex, setClickedIndex] = useState<number>(0);
    return (
        <main className="w-screen">
            <header className="mt-8">
                <Search />
            </header>

            <section className="flex flex-col items-center">
                <section className="sticky">
                    <Category clickedIndex={clickedIndex} setClickedIndex={setClickedIndex} />
                </section>

                <section className="mb-10 max-w-screen-xl">
                    <DishList category={listCategory[clickedIndex]} dishes={dishes} />
                </section>
                <Pagination className="mb-20">
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
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </section>
            <footer className="h-80 bg-black">
            </footer>
        </main>
    );
}