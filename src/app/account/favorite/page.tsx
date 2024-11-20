"use client";

import { AccountFavorite } from "@/components/account/card-favorite";

export default function Favorite() {
    return (
        <div className="grow flex flex-col gap-6 px-20">
            <h1 className="text-2xl font-semibold">Danh mục yêu thích</h1>
            <div className="grow flex justify-between">
                <div className="flex flex-col w-full gap-3">
                    <AccountFavorite />
                    <AccountFavorite />
                    <AccountFavorite />
                </div>
            </div>
        </div>
    )
}
