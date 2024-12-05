import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Bike, Eye, PhoneCall, RefreshCcw, Star, Truck, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { AccountRating } from "./card-rating";
import { ScrollArea } from "@/components/ui/scroll-area"


interface Invoice {
    id: string;
    customerId: string;
    status: string;
    totalAmount: number;
    createdAt: Date;
}

export function CardHistory({ invoice }: { invoice: Invoice }) {
    const pathname = usePathname();
    const isCompletePage = pathname.includes("/account/history/complete");
    const isCancelPage = pathname.includes("/account/history/cancel");
    const isDeliveryPage = pathname.includes("/account/history/delivery");
    const isWaitingPage = pathname.includes("/account/history/waiting");
    const isPreparePage = pathname.includes("/account/history/preparing");
    const router = useRouter();

    return (
        <section>
            <div className="flex justify-between">
                {isWaitingPage || isDeliveryPage ? (
                    <div className="flex flex-col gap-1 text-xs">
                        <p className="flex gap-1 items-center">
                            <Bike className="w-4 h-4" />
                            <span>Ngô Tuấn Kiệt</span>
                        </p>
                        <p className="flex gap-1 items-center">
                            <PhoneCall className="w-4 h-4" />
                            <span>0901429731</span>
                        </p>
                    </div>
                ) : (
                    <div className="flex gap-1 items-center text-xs">
                        Mã đơn hàng:
                        <span>ABCxyz12345678</span>
                    </div>
                )}
                <div className="flex flex-col gap-1 items-start md:items-end text-gray-500 text-xs">
                    {isCompletePage ? (
                        <p>
                            Trạng thái: <span className="font-semibold text-green-500">Hoàn thành</span>
                        </p>
                    ) : isCancelPage ? (
                            <p>
                            Trạng thái: <span className="font-semibold text-red-500">Đã hủy</span>
                        </p>
                        ) : isDeliveryPage ? (
                            <p>
                            Trạng thái: <span className="font-semibold text-green-500">Đang giao</span>
                        </p>
                            ) : isWaitingPage ? (
                                <p>
                                    Trạng thái: <span className="font-semibold text-green-500">Chờ giao hàng</span>
                                </p>
                            ) : isPreparePage ? (
                                <p>
                                    Trạng thái: <span className="font-semibold text-green-500">Đang chuẩn bị</span>
                                </p>
                            ) : (
                                <p>
                                    Trạng thái: <span className="font-semibold text-green-500">Chờ xác nhận</span>
                                </p>
                    )}
                    <p className="text-gray-500 text-xs">
                        Ngày đặt hàng: <span className="text-amber-500 font-semibold">{invoice?.createdAt.toLocaleDateString()}</span>
                    </p>
                </div>
            </div>

            <div>


            </div>

            <div>

            </div>
        </section>
    )
    // return (

    //     <div className="flex flex-col md:flex-row w-full border-b-2 md:p-6 gap-4 md:gap-6">
    //         {/* Thông tin đơn hàng */}
    //         <div className="flex flex-col gap-4 md:w-2/3">
    //             {isCompletePage || isCancelPage ? (
    //                 <div className="flex flex-wrap gap-2">
    //                     <p className="text-sm text-gray-400 flex gap-1 items-center hover:text-black" onClick={() => {
    //                         router.push(`/account/order-detail?invoiceId=${invoice.id}`)
    //                     }}>
    //                         <Eye className="w-4 h-4" />
    //                         <span className="font-medium">Xem chi tiết</span>
    //                     </p>
    //                 </div>
    //             ) : (
    //                 <div>
    //                     <div className="flex flex-col gap-1">
    //                         <p className="text-sm flex gap-1 items-center">
    //                             <Truck className="w-4 h-4" />
    //                             <span className="font-medium">Ngô Tuấn Kiệt</span>
    //                         </p>
    //                         <p className="text-sm flex gap-1 items-center">
    //                             <PhoneCall className="w-4 h-4" />
    //                             <span className="font-medium">0901429731</span>
    //                         </p>
    //                     </div>
    //                     <div className="flex flex-col gap-4 md:gap-12 items-start md:items-end md:w-1/3">
    //                         <div className="flex flex-col gap-1 items-start md:items-end">
    //                             {isCompletePage ? (
    //                                 <p className="text-gray-500 text-xs">
    //                                     Trạng thái: <span className="font-semibold text-green-500">Hoàn thành</span>
    //                                 </p>
    //                             ) : isCancelPage ? (
    //                                 <p className="text-gray-500 text-xs">
    //                                     Trạng thái: <span className="font-semibold text-red-500">Đã hủy</span>
    //                                 </p>
    //                             ) : (
    //                                 <p className="text-gray-500 text-xs">
    //                                     Trạng thái: <span className="font-semibold text-green-500">Đang giao</span>
    //                                 </p>
    //                             )}
    //                             <p className="text-gray-500 text-xs">
    //                                 Ngày đặt hàng: <span className="text-amber-500 font-semibold">{invoice?.createdAt.toLocaleDateString()}</span>
    //                             </p>
    //                         </div>
    //                     </div>
    //                     {/* <div className="flex flex-col gap-1">
    //                      <p className="text-sm flex gap-1 items-center">
    //                          <Truck className="w-4 h-4" />
    //                          <span className="font-medium">Ngô Tuấn Kiệt</span>
    //                     </p>
    //                     <p className="text-sm flex gap-1 items-center">
    //                          <PhoneCall className="w-4 h-4" />
    //                         <span className="font-medium">0901429731</span>
    //                     </p>
    //                  </div> */}
    //             )}
    //                     <p className="text-lg md:text-xl py-4 md:py-6">
    //                         Thành tiền: <span className="font-semibold text-red-500">{invoice?.totalAmount}</span>
    //                     </p>
    //                 </div>

    //         {/* Trạng thái và nút hành động */}
    //             {/* <div className="flex flex-col gap-4 md:gap-12 items-start md:items-end md:w-1/3">
    //             <div className="flex flex-col gap-1 items-start md:items-end">
    //                 {isCompletePage ? (
    //                     <p className="text-gray-500 text-xs">
    //                         Trạng thái: <span className="font-semibold text-green-500">Hoàn thành</span>
    //                     </p>
    //                 ) : isCancelPage ? (
    //                     <p className="text-gray-500 text-xs">
    //                         Trạng thái: <span className="font-semibold text-red-500">Đã hủy</span>
    //                     </p>
    //                 ) : (
    //                     <p className="text-gray-500 text-xs">
    //                         Trạng thái: <span className="font-semibold text-green-500">Đang giao</span>
    //                     </p>
    //                 )}
    //                 <p className="text-gray-500 text-xs">
    //                     Ngày đặt hàng: <span className="text-amber-500 font-semibold">{invoice?.createdAt.toLocaleDateString()}</span>
    //                 </p>
    //             </div> */}

    //             {/* Các nút hành động */}
    //             {isCompletePage ? (
    //                 <div className="flex justify-start md:justify-end gap-2 md:gap-4 mt-2">
    //                     <Dialog>
    //                         <DialogTrigger className="flex text-xs font-semibold gap-2 justify-center items-center border-black border p-3 rounded-md hover:bg-gray-100">
    //                             <Star className="w-4 h-4" /> Đánh giá
    //                         </DialogTrigger>
    //                         <DialogContent className="flex flex-col gap-4  w-[1024px]">
    //                             <DialogHeader>
    //                                 <DialogTitle className="text-lg font-semibold">Đánh giá sản phẩm</DialogTitle>
    //                             </DialogHeader>
    //                             <ScrollArea className="h-[360px] pr-4">
    //                                 <div className="flex flex-col gap-4">
    //                                     <AccountRating />
    //                                     <AccountRating />
    //                                     <AccountRating />
    //                                     <div className="flex items-center space-x-2 mt-4">
    //                                         <Checkbox id="terms" />
    //                                         <label
    //                                             htmlFor="terms"
    //                                             className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    //                                         >
    //                                             Đánh giá ẩn danh
    //                                         </label>
    //                                     </div>
    //                                 </div>
    //                             </ScrollArea>
    //                             <DialogFooter>
    //                                 <Button type="submit" className="bg-amber-500">Lưu đánh giá</Button>
    //                             </DialogFooter>
    //                         </DialogContent>
    //                     </Dialog>
    //                     <Button className="bg-amber-500 w-auto text-xs">
    //                         <RefreshCcw />
    //                         Mua lại
    //                     </Button>
    //                 </div>
    //             ) : isCancelPage ? (
    //                 <div className="flex justify-start md:justify-end gap-2 md:gap-4 mt-2">
    //                     <Button className="bg-amber-500 w-auto text-xs">
    //                         <RefreshCcw />
    //                         Mua lại
    //                     </Button>
    //                 </div>
    //             ) : (
    //                 <div className="flex justify-start md:justify-end gap-2 md:gap-4 mt-2">
    //                     <Button
    //                         variant={"outline"}
    //                         className="w-auto text-xs hover:bg-red-500 hover:text-white"
    //                     >
    //                         <X />
    //                         Hủy đơn
    //                     </Button>
    //                     <Button className="bg-amber-500 w-auto text-xs" onClick={() => {
    //                         router.push(`/account/order-detail?invoiceId=${invoice.id}`)

    //                     }}>
    //                         <Eye />
    //                         Xem chi tiết
    //                     </Button>
    //                 </div>
    //             )}
    //         </div>
    //     </div>
    // )
}
