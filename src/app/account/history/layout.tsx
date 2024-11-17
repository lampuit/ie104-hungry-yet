"use client";

import { Button } from "@/components/ui/button";
import { Package, PackageCheck, PackageX } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// const Status = [
//     { name: "Đang giao", icon: <Package /> },
// ]

export default function Layout({
    children,
}: {
    children: ReactNode;
}) {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);
    return (
        <div className="grow flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Đơn hàng của tôi</h1>
            <div className="grow flex flex-col lg:flex-row gap-8 p-6 bg-gray-100 min-h-screen">
                <div className="flex flex-col gap-5 w-full lg:w-2/3">
                    <div className="flex gap-4 justify-around bg-white rounded-lg p-2 shadow-md">
                        {/* {listCate.map((cate) => (
                            <div key={cate.id} className="flex flex-col justify-end items-center gap-2 w-32">
                                <p
                                    className={`md:text-base sm:text-sm font-semibold cursor-pointer ${clickedIndex === cate.id ? 'text-amber-500' : 'text-black'} hover:text-amber-500`}
                                    onClick={() => setClickedIndex(cate.id)}
                                >
                                    {cate.name}
                                </p>
                                {clickedIndex === cate.id && <Underline />}
                            </div>
                        ))} */}
                        <Button variant={"ghost"}><Package />Đang giao</Button>
                        <Button variant={"ghost"}><PackageCheck /> Hoàn thành</Button>
                        <Button variant={"ghost"}><PackageX /> Đã hủy</Button>
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