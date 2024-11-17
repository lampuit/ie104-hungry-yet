"use client";

import { AccountCardHistory } from "@/components/account/card-history";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function History() {
    return (
        <div className="flex flex-col w-full gap-4">
            <h1 className="text-2xl font-semibold">Đơn hàng của tôi</h1>
            <div className="grow flex flex-col lg:flex-row gap-8 p-6 bg-gray-100 min-h-screen">
                <div className="flex flex-col gap-5 w-full lg:w-2/3">
                    <div className="flex gap-4 bg-white rounded-lg p-2 shadow-md">
                        <Button variant={"ghost"} className="focus: bg-gray-300">Đang giao</Button>
                        <Button variant={"ghost"}>Hoàn thành</Button>
                        <Button variant={"ghost"}>Đã hủy</Button>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-md flex flex-col gap-2">
                        <AccountCardHistory />
                        <AccountCardHistory />
                        <AccountCardHistory />
                        <Button variant={"ghost"}>Xem thêm <ChevronDown /></Button>
                    </div>
                </div>
                <div className="flex flex-col w-full lg:w-1/3 bg-white rounded-lg p-4 shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Chat</h2>
                    <p>Chat content goes here...</p>
                </div>
            </div>
        </div>
    )
}