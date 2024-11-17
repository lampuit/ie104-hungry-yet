import Image from "next/image";
import { Button } from "../ui/button";


export function AccountCardHistory() {
    return (
        <div className="flex w-full border-b-2 p-4">
            <div className="flex flex-col gap-4 w-2/3">
            <div className="flex flex-col gap-2">
                <p className="text-xs">Người giao hàng: <span className="font-semibold">Ngô Tuấn Kiệt</span></p>
                <p className="text-xs">Số điện thoại: 0901429731</p>
            </div>
                <p>Thành tiền: <span className="font-semibold text-lg text-red-500">100.000đ</span></p>
            </div>
            <div className="flex flex-col gap-12 items-end w-1/3">
                <div className="flex flex-col gap-1 items-end">
                    <p className="text-gray-500 text-xs">Trạng thái: <span className="font-semibold text-green-500">Đang giao</span></p>
                    <p className="text-gray-500 text-xs">Ngày đặt hàng: <span className="text-amber-500 font-semibold">12/12/2021</span></p>
                </div>
                <div className="flex justify-end gap-4 mt-2">
                    <Button variant={"outline"} className="w-auto text-xs">Hủy đơn</Button>
                    <Button className="bg-amber-500 w-auto text-xs">Xem chi tiết</Button>
                </div>
            </div>
        </div>
    )
}