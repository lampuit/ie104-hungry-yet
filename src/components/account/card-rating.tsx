import { Camera, Star } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

export function AccountRating() {
  return (
    <div className="flex flex-col gap-3 border-2 px-3 py-6">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={"/images/appetizers.jpg"}
            alt="..."
            fill
            sizes="100%"
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          ></Image>
        </div>
        <p>Tên món ăn</p>
      </div>
      <div className="flex gap-6">
        <p className="text-sm font-medium">Chất lượng sản phẩm: </p>
        <div className="flex gap-1">
          <Star className="fill-amber-400 stroke-amber-400" />
          <Star className="fill-amber-400 stroke-amber-400" />
          <Star className="fill-amber-400 stroke-amber-400" />
          <Star className="fill-amber-400 stroke-amber-400" />
          <Star className="fill-amber-400 stroke-amber-400" />
          <p className="text-sm font-medium text-amber-400">Tuyệt vời</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">Đánh giá:</p>
        <Input className="w-3/4"></Input>
      </div>
      <Button variant={"outline"} className="px-2">
        <Camera /> Thêm hình ảnh
      </Button>
    </div>
  );
}
