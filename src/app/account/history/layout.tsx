"use client";

import { Button } from "@/components/ui/button";
import { PackageCheck, PackageX, CookingPot, Truck, NotebookPen, CircleCheck } from 'lucide-react';
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import useSWR from "swr";
import { getSession } from "@/lib/auth-client";
import LoginPrompt from "@/components/ui/login-prompt";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Fetch userId from session
const fetcherUserId = async () => {
    const response = await getSession();
    const userId = response?.data?.user?.id as string;
    return userId;
};

export default function Layout({
    children,
}: {
    children: ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: userId } = useSWR('userId', fetcherUserId)

    const buttons = [
        { name: "Chờ xác nhận", icon: NotebookPen, path: "/account/history" },
        { name: "Đã xác nhận", icon: CircleCheck, path: "/account/history/accepted" },
        { name: "Đang chuẩn bị", icon: CookingPot, path: "/account/history/cooking" },
        { name: "Đang giao", icon: Truck, path: "/account/history/ready" },
        { name: "Hoàn thành", icon: PackageCheck, path: "/account/history/delivered" },
        { name: "Đã hủy", icon: PackageX, path: "/account/history/cancel" },
    ];

    const handleButtonClick = (path: string) => {
        router.push(path);
    };

    return (
        !userId ? <LoginPrompt /> :
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-semibold">Đơn hàng của tôi</h1>
                <div className="flex flex-col gap-1 md:gap-5 w-full overflow-x-auto">
                    <ScrollArea className="w-full overflow-hidden flex whitespace-nowrap">
                        <div className="flex lg:gap-2 xl:gap-4 justify-around items-center bg-white rounded-lg xl:px-1 xl:py-2 shadow-md">
                            {buttons.map((button) => (
                                <Button
                                    key={button.name}
                                    className={pathname === button.path ? "bg-slate-200" : ""}
                                    variant={pathname === button.path ? "secondary" : "ghost"}
                                    onClick={() => handleButtonClick(button.path)}
                                >
                                    <button.icon className="h-4 w-4" />
                                    <span className="hidden md:inline text-xs">{button.name}</span>
                                </Button>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    {children}
                </div>
            </div>
    )
}

