"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, PackageCheck, PackageX, Image, Paperclip, CookingPot, Truck, NotebookPen } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function Layout({
    children,
}: {
    children: ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [activeButton, setActiveButton] = useState<string>("Chờ xác nhận");

    const handleButtonClick = (buttonName: string, path: string) => {
        setActiveButton(buttonName);
        router.push(path);
    };
    return (
        <div className="grow flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Đơn hàng của tôi</h1>
            <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex gap-4 justify-around bg-white rounded-lg p-2 shadow-md">
                        <Button
                            className={activeButton === "Chờ xác nhận" ? "bg-slate-200" : ""}
                            variant={activeButton === "Chờ xác nhận" ? "secondary" : "ghost"}
                            onClick={() => handleButtonClick("Chờ xác nhận", "/account/history")}
                        >
                            <NotebookPen /> Chờ xác nhận
                        </Button>
                        <Button
                            className={activeButton === "Đang chuẩn bị" ? "bg-slate-200" : ""}
                            variant={activeButton === "Đang chuẩn bị" ? "secondary" : "ghost"}
                            onClick={() => handleButtonClick("Đang chuẩn bị", "/account/history/preparing")}
                        >
                            <CookingPot /> Đang chuẩn bị
                        </Button>
                        <Button
                            className={activeButton === "Chờ đi đơn" ? "bg-slate-200" : ""}
                            variant={activeButton === "Chờ đi đơn" ? "secondary" : "ghost"}
                            onClick={() => handleButtonClick("Chờ đi đơn", "/account/history/waiting")}
                        >
                            <Package /> Chờ đi đơn
                        </Button>
                        <Button
                            className={activeButton === "Đang giao" ? "bg-slate-200" : ""}
                            variant={activeButton === "Đang giao" ? "secondary" : "ghost"}
                            onClick={() => handleButtonClick("Đang giao", "/account/history/delivery")}
                        > 
                            <Truck /> Đang giao
                        </Button>
                        <Button
                            className={activeButton === "Hoàn thành" ? "bg-slate-200" : ""}
                            variant={activeButton === "Hoàn thành" ? "secondary" : "ghost"}
                            onClick={() => handleButtonClick("Hoàn thành", "/account/history/complete")}
                        >
                            <PackageCheck /> Hoàn thành
                        </Button>
                        <Button
                            className={activeButton === "Đã hủy" ? "bg-slate-200" : ""}
                            variant={activeButton === "Đã hủy" ? "secondary" : "ghost"}
                            onClick={() => handleButtonClick("Đã hủy", "/account/history/cancel")}
                        >
                            <PackageX /> Đã hủy
                        </Button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
} 