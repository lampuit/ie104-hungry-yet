"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { ClipboardList, Heart, LogOut, Settings, UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({
    children,
}: {
    children: ReactNode;
    modal: ReactNode;
}) {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);
    return (
        <main className="bg-gray-50 w-full">
            <div className="flex gap-12 justify-around p-10">
                <div className="flex flex-col gap-6 ">
                    <div className="flex mb-4 gap-2 items-center w-full border-b-2 px-4 pb-4">
                        <Avatar>
                            <AvatarImage src="/images/kimcuc.jpg" />
                            <AvatarFallback>KC</AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-semibold">Lê Thị Kim Cúc</p>
                    </div>
                    <div className="flex gap-3 justify-center">
                        <UserIcon className="stroke-amber-500" />
                        <p>Thông tin tài khoản</p>
                    </div>
                    <div className="flex gap-3">
                        <ClipboardList className="stroke-blue-500" />
                        <p>Thông tin đơn hàng</p>
                    </div>
                    <div className="flex gap-3">
                        <Heart className="stroke-red-500" />
                        <p>Danh mục yêu thích</p>
                    </div>
                    <div className="flex gap-3">
                        <Settings className="stroke-gray-500" />
                        <p>Cài đặt</p>
                    </div>
                    <Button variant={"outline"} className="mt-6 w-32 border-gray-400 text-gray-400
                     hover:bg-gray-400 hover:bg-opacity-20 hover:text-gray-400">
                        <LogOut className="stroke-gray-400" /> Đăng xuất</Button>
                </div>
                {children}
            </div>
            <footer className="bg-black h-64"></footer>
        </main>
    );
}