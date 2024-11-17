"use client";

import { Button } from "@/components/ui/button";
import { Package, PackageCheck, PackageX } from "lucide-react";
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

    useEffect(() => {
        if (pathname === "/account/history/complete") {
            setActiveButton("Hoàn thành");
        } else if (pathname === "/account/history/cancel") {
            setActiveButton("Đã hủy");
        } else {
            setActiveButton("Đang giao");
        }
    }, [pathname]);

    const handleButtonClick = (buttonName: string, path: string) => {
        setActiveButton(buttonName);
        router.push(path);
    };
    return (
        <div className="grow flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Đơn hàng của tôi</h1>
            <div className="grow flex flex-col lg:flex-row gap-8 p-6 bg-gray-100 min-h-screen">
                <div className="flex flex-col gap-5 w-full lg:w-2/3">
                    <div className="flex gap-4 justify-around bg-white rounded-lg p-2 shadow-md">
                        <Button
                            variant={activeButton === "Đang giao" ? "outline" : "ghost"}
                            onClick={() => handleButtonClick("Đang giao", "/account/history")}
                            className="focus:bg-gray-200"
                        >
                            <Package /> Đang giao
                        </Button>
                        <Button
                            variant={activeButton === "Hoàn thành" ? "outline" : "ghost"}
                            onClick={() => handleButtonClick("Hoàn thành", "/account/history/complete")}
                            className="focus:bg-gray-200"
                        >
                            <PackageCheck /> Hoàn thành
                        </Button>
                        <Button
                            variant={activeButton === "Đã hủy" ? "outline" : "ghost"}
                            onClick={() => handleButtonClick("Đã hủy", "/account/history/cancel")}
                            className="focus:bg-gray-200"
                        >
                            <PackageX /> Đã hủy
                        </Button>
                    </div>
                    <div>{children}</div>
                </div>
                <div className="flex flex-col lg:w-1/3 bg-white rounded-lg p-4 shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Chat</h2>
                    <p>Chat content goes here...</p>
                </div>
            </div>
        </div>
    )
} 