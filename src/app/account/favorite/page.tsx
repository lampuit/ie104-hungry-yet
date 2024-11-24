"use client";

import { AccountFavorite } from "@/components/account/card-favorite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

export default function Favorite() {
    return (
        <div className="grow flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Danh mục yêu thích</h1>
            <div className="grow flex justify-between lg:flex-row gap-8 p-6 bg-gray-100">
                <div className="flex flex-col w-2/3 gap-3">
                    <AccountFavorite />
                    <AccountFavorite />
                    <AccountFavorite />
                    <Button variant={"outline"}>Xem thêm<ChevronDown /> </Button>
                </div>
                <div className="flex flex-col h-1/2 w-1/3 bg-white rounded-lg p-4 shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Chat</h2>
                    <p>Chat content goes here...</p>
                    <Input className="focus-visible:ring-0 focus-visible:ring-offset-0"></Input>
                </div>
            </div>
        </div>
    )
}
