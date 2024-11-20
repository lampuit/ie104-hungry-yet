"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, PackageCheck, PackageX, Image, Paperclip } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function Layout({
    children,
}: {
    children: ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [activeButton, setActiveButton] = useState<string>("Đang giao");

    // useEffect(() => {
    //     if (pathname === "/account/history/complete") {
    //         setActiveButton("Hoàn thành");
    //     } else if (pathname === "/account/history/cancel") {
    //         setActiveButton("Đã hủy");
    //     } else {
    //         setActiveButton("Đang giao");
    //     }
    // }, [pathname]);

    const handleButtonClick = (buttonName: string, path: string) => {
        setActiveButton(buttonName);
        router.push(path);
    };
    return (
        <div className="grow flex flex-col gap-4 px-20">
            <h1 className="text-2xl font-semibold">Đơn hàng của tôi</h1>
            <div className="flex flex-col lg:flex-row gap-8 py-6 bg-gray-100 w-full px-10">
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex gap-4 justify-around bg-white rounded-lg p-2 shadow-md">
                        <Button
                            variant={activeButton === "Đang giao" ? "secondary" : "ghost"}
                            onClick={() => handleButtonClick("Đang giao", "/account/history")}
                        >
                            <Package /> Đang giao
                        </Button>
                        <Button
                            variant={activeButton === "Hoàn thành" ? "secondary" : "ghost"}
                            onClick={() => handleButtonClick("Hoàn thành", "/account/history/complete")}
                        >
                            <PackageCheck /> Hoàn thành
                        </Button>
                        <Button
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