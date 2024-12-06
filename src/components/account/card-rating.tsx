import { Camera, Star } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";


export function AccountRating() {
    return (
        <div className="flex flex-col gap-3 px-3 py-6 border-2">
            <div className="flex gap-4 items-center">
                <div className="relative w-20 h-20">
                    <Image src={"/images/appetizers.jpg"}
                        alt="..."
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center">
                    </Image>
                </div>
                <p>Tên món ăn</p>
            </div>
            <div className="flex gap-6">
                <p className="font-medium text-sm">Chất lượng sản phẩm: </p>
                <div className="flex gap-1">
                    <Star className=" stroke-amber-400 fill-amber-400" />
                    <Star className=" stroke-amber-400 fill-amber-400" />
                    <Star className=" stroke-amber-400 fill-amber-400" />
                    <Star className=" stroke-amber-400 fill-amber-400" />
                    <Star className=" stroke-amber-400 fill-amber-400" />
                    <p className="text-amber-400 font-medium text-sm">Tuyệt vời</p>
                </div>
            </div>
            <div className="flex gap-3 justify-between items-center">
                <p className="font-medium text-sm">Đánh giá:</p>
                <Input className="w-3/4"></Input>
            </div>
            <Button variant={"outline"} className="px-2"><Camera /> Thêm hình ảnh</Button>
        </div>
    )
}  