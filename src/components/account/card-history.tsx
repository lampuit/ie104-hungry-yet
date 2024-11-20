import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Eye, PhoneCall, RefreshCcw, Star, Truck, X } from "lucide-react";

export function AccountCardHistory() {
    const pathname = usePathname();
    const isCompletePage = pathname.includes("/account/history/complete");
    const isCancelPage = pathname.includes("/account/history/cancel");
    return (
        <div className="flex w-full border-b-2 p-6">
            <div className="flex flex-col gap-4 w-2/3">
                {isCompletePage || isCancelPage ?
                    <div className="flex flex-wrap gap-2">
                        <p className="text-sm text-gray-400 flex gap-1 items-center hover:text-black"><Eye className="w-4 h-4" /> <span className="font-medium">Xem chi tiết</span></p>
                    </div> :
                    <div className="flex flex-col gap-1">
                        <p className="text-sm flex gap-1 items-center"><Truck className="w-4 h-4" /> <span className="font-medium">Ngô Tuấn Kiệt</span></p>
                        <p className="text-sm flex gap-1 items-center"><PhoneCall className="w-4 h-4" /> <span className="font-medium">0901429731</span></p>
                    </div>
                }
                <p className="text-xl py-6">Thành tiền: <span className="font-semibold text-red-500">100.000đ</span></p>
            </div>
            <div className="flex flex-col gap-12 items-end w-1/3">
                <div className="flex flex-col gap-1 items-end">
                    {isCompletePage ?
                        <p className="text-gray-500 text-xs">Trạng thái: <span className="font-semibold text-green-500">Hoàn thành</span></p> :
                        isCancelPage ?
                            <p className="text-gray-500 text-xs">Trạng thái: <span className="font-semibold text-red-500">Đã hủy</span></p> :
                            <p className="text-gray-500 text-xs">Trạng thái: <span className="font-semibold text-green-500">Đang giao</span></p>
                    }
                    <p className="text-gray-500 text-xs">Ngày đặt hàng: <span className="text-amber-500 font-semibold">12/12/2021</span></p>
                </div>
                {isCompletePage ?
                    <div className="flex justify-end gap-4 mt-2">
                        <Button variant={"outline"} className="w-auto text-xs"><Star/>Đánh giá</Button>
                        <Button className="bg-amber-500 w-auto text-xs"><RefreshCcw/> Mua lại</Button>
                    </div> :
                isCancelPage ?
                    <div className="flex justify-end gap-4 mt-2">
                        <Button className="bg-amber-500 w-auto text-xs"><RefreshCcw/>Mua lại</Button>
                    </div> :
                    <div className="flex justify-end gap-4 mt-2">
                        <Button variant={"outline"} className="w-auto text-xs hover:bg-red-500 hover:text-white"><X/>Hủy đơn</Button>
                        <Button className="bg-amber-500 w-auto text-xs"><Eye/>Xem chi tiết</Button>
                    </div>
                }
            </div>
        </div>
    )
}