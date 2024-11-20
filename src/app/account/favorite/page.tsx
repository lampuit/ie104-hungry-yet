"use client";

import { AccountFavorite } from "@/components/account/card-favorite";

export default function Favorite() {
    return (
        <div className="grow flex flex-col gap-4 px-20">
            <h1 className="text-2xl font-semibold">Danh mục yêu thích</h1>
            <div className="grow flex justify-between lg:flex-row gap-8 px-10 py-6 bg-gray-100 items-center">
                <div className="flex flex-col w-full gap-3">
                    <AccountFavorite />
                    <AccountFavorite />
                    <AccountFavorite />
                </div>
            </div>
        </div>
    )
}
