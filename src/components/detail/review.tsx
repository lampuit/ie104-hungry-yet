import { ChevronRight, Ghost, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function DetailReview() {
    return (
        <div className="space-y-6 px-2 py-3 border-b border-b-gray-400">
            <div className="flex gap-2 items-center">
                <Avatar className="w-14 h-14">
                    <AvatarImage src="/images/kimcuc.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="space-y-2 p-4">
                    <h6 className="font-semibold">Lê Thị Kim Cúc</h6>
                    <div className="flex gap-2"><Star className="fill-amber-400 stroke-amber-400 size-5" />
                        <Star className="fill-amber-400 stroke-amber-400 size-5" />
                        <Star className="fill-amber-400 stroke-amber-400 size-5" />
                        <Star className="fill-amber-400 stroke-amber-400 size-5" />
                        <Star className="fill-amber-400 stroke-amber-400 size-5" /></div>
                </div>
            </div>
            <p>Món ăn ngon lắm ạ, giống hình ảnh. Ship nhanh, có tính năng AI hỗ trợ nhanh, hay và tiện lợi ạ. Quá mê shop nên cho 5 sao, mn ghé ăn thử.
                Tích cực rcm cho mọi người món này.</p>
            <div className="flex items-center gap-4">
                <Image className="rounded-md" src={"/images/square.jpg"} alt="review" width={100} height={100}></Image>
                <div className="flex items-center gap-1">
                    <Button className="hover:bg-amber-400 hover:bg-opacity-20" variant={"ghost"}>Xem thêm</Button>
                    <ChevronRight />
                </div>
            </div>
        </div>
    )
}