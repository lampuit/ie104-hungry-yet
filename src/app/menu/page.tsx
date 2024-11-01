"use client";

import { Navbar } from "@/components/home/nav-bar";
import { Search } from "@/components/menu/search";
import { Category } from "@/components/menu/category";

export default function MenuPage() {
    return(
        <main className="w-screen">
            <header className="flex flex-col justify-center items-center w-screen bg-black z-10">
                <Navbar />
            </header>
            <section className="my-8">
                <Search />
            </section>
            <section>
                <Category />
            </section>
        </main>
    );
}