"use client"
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
import React, { useEffect } from "react";
import {
    Form
} from "@/components/ui/form"
import { getInvoiceDetail } from "@/lib/data";
import useSWR from "swr";
import { InformationForm } from "@/components/checkout/information-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { updateInvoices, updateStatus } from "@/lib/actions/invoice";
import { toast } from "sonner";
import { createCart, updateCarts } from "@/lib/actions/cart";

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

const formSchema = z.object({
    invoiceId: z.string(),
    addressDelivery: z.string().min(1, "Địa chỉ không được để trống"), // Trường bắt buộc
    phone: z.string().regex(/^(\+84|0)\d{9,10}$/, "Số điện thoại không hợp lệ"), // Validation cho số điện thoại Việt Nam
    note: z.string().max(200, "Ghi chú không được vượt quá 200 ký tự"), // Giới hạn độ dài ghi chú
});


export function CardHistory({ invoice }: { invoice: Invoice }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    // State for managing selected reasons
    const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
    const { data: invoiceData, error } = useSWR(invoice.id, fetcherInvoiceDetail, {
        revalidateOnFocus: true,
    });

    useEffect(() => {
        if (error) {
            console.error("Error fetching invoice data:", error);
        }
    }, [error]);

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

    const splitInvoiceId = (invoiceId: string) =>
        invoiceId?.split("-").join("").substr(0, 15);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            invoiceId: invoice.id,
            addressDelivery: "",
            phone: "",
            note: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const formData = new FormData();
            formData.append("deliveryAddress", values.addressDelivery);
            formData.append("phone", values.phone);
            formData.append("note", values.note);
            formData.append("id", invoice.id);

            const result = await updateInvoices(formData);
            if (result.success) {
                toast.success(result.message);
                setIsDialogOpen(false);

            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Error updating invoice:", error);
            toast.error("Cập nhật thông tin đơn hàng thất bại");
        }
    };

    const cancelOrder = async () => {
        try {
            const formData = new FormData();
            formData.append("id", invoice.id);
            formData.append("status", "cancelled");
            formData.append("reason", selectedReasons.join(", "));

            const result = await updateStatus(formData);
            if (result.success) {
                toast.success(result.message);
                setConfirmDelete(false);
                router.push("/account/history/cancel");
            } else {
                toast.error(result.message);
            }

        } catch (error) {
            console.error("Error updating invoice:", error);
            toast.error("Cập nhật thông tin đơn hàng thất bại");
        }
    }

    const handleBuyAgain = async () => {
        try {
            for (const order of invoiceData?.orders || []) {
                const formData = new FormData();
                formData.append("userId", invoice.customerId || "");
                formData.append("productId", order.products.id || "");
                formData.append("quantity", order.quantity.toString() || "");
                await createCart(formData);
            }
            toast.success("Tất cả sản phẩm đã được thêm vào giỏ hàng");
            router.push("/menu/cart");
        } catch (error) {
            console.error("Error creating cart:", error);
            toast.error("Thêm sản phẩm vào giỏ hàng thất bại");
        }
    };



    const handleCheckboxChange = (reason: string) => {
        setSelectedReasons((prev) =>
            prev.includes(reason)
                ? prev.filter((item) => item !== reason) // Remove reason if already selected
                : [...prev, reason] // Add reason if not already selected
        );
    };

    return (
        <section className="flex flex-col gap-2 p-3 sm:p-5 bg-white rounded shadow-md">
            {/* Thông tin đơn hàng */}
            <div className="flex flex-col gap-1 px-2 sm:px-10">
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
                                Lý do hủy: <span className="font-semibold">{invoiceData?.reason}</span>
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
                        <Button onClick={() => {
                            handleBuyAgain();
                        }} className="bg-amber-500">
                            <RefreshCcw /> Mua lại
                        </Button>
                    </div>
                ) : isCancelPage ? (
                    <div className="flex justify-end gap-6">
                        <Button className="bg-amber-500" onClick={() => handleBuyAgain()}>
                            <RefreshCcw /> Mua lại
                        </Button>
                    </div>
                ) : (
                    <div className="flex justify-end gap-6">
                        <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
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
                                    {["Tôi muốn thêm/thay đổi mã giảm giá", "Tôi muốn thay đổi món ăn", "Tôi không còn nhu cầu mua", "Không tìm thấy lý do phù hợp"].map(
                                        (reason) => (
                                            <div key={reason} className="flex items-center space-x-2 mt-4">
                                                <Checkbox
                                                    id={reason}
                                                    checked={selectedReasons.includes(reason)}
                                                    onCheckedChange={() => handleCheckboxChange(reason)}
                                                />
                                                <label
                                                    htmlFor={reason}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {reason}
                                                </label>
                                            </div>
                                        )
                                    )}
                                </div>
                                <DialogFooter>
                                    <Button onClick={() => cancelOrder()} className="bg-red-500">Hủy đơn</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger>
                                <Button className="bg-amber-500">
                                    <PenLine /> Thay đổi thông tin
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="font-semibold">Sửa thông tin nhận hàng</DialogTitle>
                                </DialogHeader>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <InformationForm form={form} />
                                        <div className="flex justify-center mt-4">
                                            <Button className="align-center" type="submit">
                                                Lưu thông tin
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>)}
            </div>
        </section>
    )
}

