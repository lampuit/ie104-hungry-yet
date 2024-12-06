import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Bike, BotMessageSquare, ChevronRight, Eye, PenLine, PhoneCall, RefreshCcw, Star, Truck, X } from "lucide-react";
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
import Image from "next/image";
import React from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getInvoiceDetail } from "@/lib/data";
import useSWR from "swr";

interface Invoice {
    id: string;
    customerId: string;
    status: string;
    totalAmount: number;
    createdAt: Date;

}

const fetcherInvoiceDetail = async (invoiceId: string) => {
    if (!invoiceId) return null;
    return await getInvoiceDetail(invoiceId);
};



export function CardHistory({ invoice }: { invoice: Invoice }) {
    const { data: invoiceData, error } = useSWR(invoice.id, fetcherInvoiceDetail);
    const pathname = usePathname();
    const isCompletePage = pathname.includes("/account/history/complete");
    const isCancelPage = pathname.includes("/account/history/cancel");
    const isDeliveryPage = pathname.includes("/account/history/delivery");
    const isWaitingPage = pathname.includes("/account/history/waiting");
    const isPreparePage = pathname.includes("/account/history/preparing");
    const router = useRouter();
    const convertToVND = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };
    const [position, setPosition] = React.useState("bottom")
    const splitInvoiceId = (invoiceId: string) =>
        invoiceId?.split("-").join("").substr(0, 15);

    return (
        <section className="flex flex-col gap-2 p-5 bg-white rounded shadow-md ">

            {/* Thông tin đơn hàng */}
            <div className="flex justify-between mb-2">
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
                ) : isCancelPage ?
                    (
                        <div className="flex flex-col gap-1 text-xs">
                            <div className="flex gap-1 items-center">
                                Mã đơn hàng:
                                    <span className="font-semibold">{splitInvoiceId(invoiceData?.id || "").toUpperCase()}</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                    Lý do hủy: <span className="font-semibold">Không còn nhu cầu</span>
                            </div>
                        </div>
                        ) : (
                            <div className="flex text-sm gap-1 items-center">
                                Mã đơn hàng:
                                <span className="font-semibold">{splitInvoiceId(invoiceData?.id || "").toUpperCase()}</span>
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
                                    Trạng thái: <span className="font-semibold text-blue-400">Đang giao</span>
                        </p>
                            ) : isWaitingPage ? (
                                <p>
                                        Trạng thái: <span className="font-semibold text-blue-400">Chờ giao hàng</span>
                                    </p>
                                ) : isPreparePage ? (
                                    <p>
                                            Trạng thái: <span className="font-semibold text-amber-500">Đang chuẩn bị</span>
                                        </p>
                                    ) : (
                                        <p>
                                                Trạng thái: <span className="font-semibold text-amber-500">Chờ xác nhận</span>
                                            </p>
                    )}
                    <p className="text-gray-500 text-xs">
                        Ngày đặt hàng: <span className="font-semibold">{invoice?.createdAt.toLocaleDateString()}</span>
                    </p>
                </div>
            </div>

            {/* Chi tiết đơn */}
            <div className="flex flex-col gap-1 px-10">
                {invoiceData?.orders?.map((order, index) => (
                    <div className="flex items-center p-2 justify-between rounded border-2" key={order.invoiceId}>
                        <div className="flex gap-6 items-center">
                            <div className="relative w-40 h-40">
                                <Image src={order.products.imageUrl}
                                    alt="..."
                                    layout="fill"
                                    objectFit="cover"
                                    objectPosition="center"
                                    className="rounded shadow">
                                </Image>
                            </div>
                            <div className="flex flex-col">

                                <div key={index} className="flex flex-col gap-2">
                                    <p className="text-lg font-semibold">{order.products.name}</p>
                                    <span>{order.products.category?.name}</span>
                                    <span className="flex gap-2">Số lượng: <span>x{order.quantity}</span></span>
                                </div>
                            </div>
                        </div>
                        <span className="flex gap-2 pr-4">Giá: <span className="text-red-500 font-medium">{convertToVND(order.products.price)}</span></span>
                    </div>
                ))}
                <div className="flex justify-center">
                    <Button variant={"ghost"} onClick={() => router.push(`/account/order-detail?invoiceId=${invoice.id}`)}>
                        Xem chi tiết <ChevronRight />
                    </Button>
                </div>
            </div>

            {/* Trạng thái và nút hành động */}
            <div className="flex flex-col gap-2 justify-end">
                <p className="text-xl md:text-xl flex justify-end gap-2">
                    Tổng tiền: <span className="font-bold text-red-500">{convertToVND(invoice?.totalAmount)}</span>
                </p>
                {isPreparePage || isWaitingPage || isDeliveryPage ? (
                    <div></div>
                    // <div className="flex justify-end gap-6">
                    //     <Button className="bg-amber-500">
                    //         <BotMessageSquare /> Chat
                    //     </Button>
                    // </div>
                ) : isCompletePage ? (
                    <div className="flex justify-end gap-6">
                        <Dialog>
                            <DialogTrigger className="flex text-xs font-semibold gap-2 justify-center items-center border-black border p-3 rounded-md hover:bg-gray-100">
                                <Star className="w-4 h-4" /> Đánh giá
                            </DialogTrigger>
                            <DialogContent className="flex flex-col gap-4  w-[1024px]">
                                <DialogHeader>
                                    <DialogTitle className="text-lg font-semibold">Đánh giá sản phẩm</DialogTitle>
                                </DialogHeader>
                                <ScrollArea className="h-[360px] pr-4">
                                    <div className="flex flex-col gap-4">
                                        <AccountRating />
                                        <AccountRating />
                                        <AccountRating />
                                        <div className="flex items-center space-x-2 mt-4">
                                            <Checkbox id="terms" />
                                            <label
                                                htmlFor="terms"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Đánh giá ẩn danh
                                            </label>
                                        </div>
                                    </div>
                                </ScrollArea>
                                <DialogFooter>
                                    <Button type="submit" className="bg-amber-500">Lưu đánh giá</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Button className="bg-amber-500">
                            <RefreshCcw /> Mua lại
                        </Button>
                    </div>
                ) : isCancelPage ? (
                    <div className="flex justify-end gap-6">
                        <Button className="bg-amber-500">
                            <RefreshCcw /> Mua lại
                        </Button>
                    </div>
                ) : (
                    <div className="flex justify-end gap-6">
                        <Dialog>
                            <DialogTrigger>
                                <Button variant={"outline"} className="hover:bg-red-500 hover:text-white text-gray-400">
                                    <X className="hover:text-white" />Hủy đơn
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="font-semibold">Lý do hủy đơn</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col gap-2 p-2">
                                    <div className="flex items-center space-x-2 mt-4">
                                        <Checkbox id="terms" />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Tôi muốn thêm/thay đổi mã giảm giá
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-4">
                                        <Checkbox id="terms" />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Tôi muốn thay đổi món ăn
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-4">
                                        <Checkbox id="terms" />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Tôi không còn nhu cầu mua
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-4">
                                        <Checkbox id="terms" />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Không tìm thấy lý do phù hợp
                                        </label>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button className="bg-red-500">Hủy đơn</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button className="bg-amber-500">
                                                <PenLine /> Thay đổi thông tin
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="font-semibold">Sửa thông tin nhận hàng</DialogTitle>
                                            </DialogHeader>
                                            {/* <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="shadcn" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        This is your public display name.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit">Submit</Button>
                                    </form>
                                </Form> */}
                                            {/* <div className="flex flex-col gap-2 p-2">
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-sm font-semibold">Tên người nhận:</label>
                                                    <Input></Input>
                                                    <input type="text" className="border-2 p-2 rounded-md" />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-sm font-semibold">Số điện thoại:</label>
                                                    <input type="text" className="border-2 p-2 rounded-md" />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-sm font-semibold">Địa chỉ nhận hàng:</label>
                                                    <input type="text" className="border-2 p-2 rounded-md" />
                                                </div>
                                            </div> */}

                                        </DialogContent>
                                    </Dialog>
                    </div>)}
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
