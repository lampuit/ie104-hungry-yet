import { Camera, Star } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


export function AccountRating() {
    return (
        <div className="flex flex-col gap-3 px-3 py-6">
            <div className="flex gap-4 items-center">
                <img src="/images/appetizers.jpg" alt="" className="w-20 h-20" />
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