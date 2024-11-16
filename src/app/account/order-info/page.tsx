"use client";


import { CardOrderInfo } from "@/components/account/card-order-info";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function OrderInfo() {
    return (
        <div className="grow w-3/5 flex flex-col gap-5">
          <h2 className="font-medium text-2xl text-gray-400">Đơn hàng của tôi</h2>  
          <div className="flex flex-col gap-5">
            <div className="bg-white flex gap-16 justify-center p-2">
                <Button variant={"ghost"} className="w-40 text-lg">Tất cả</Button>
                <Button variant={"ghost"} className="w-40 text-lg">Đang giao</Button>
                <Button variant={"ghost"} className="w-40 text-lg">Hoàn thành</Button>
                <Button variant={"ghost"} className="w-40 text-lg">Đã hủy</Button>
            </div>
            <div className="flex flex-col gap-5">
                <CardOrderInfo />
                <CardOrderInfo />
                <CardOrderInfo />
                <Button variant={"outline"} className="w-1/5">Xem thêm <ChevronDown/></Button>
            </div>
          </div>
        </div>
    )
}