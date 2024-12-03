"use client";

import { Button } from "@/components/ui/button";
import { CircleCheck, CookingPot, MapPin, Package, Truck, Undo2, User, WalletCards } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { getInvoiceDetail } from "@/lib/data";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcherInvoiceDetail = async (invoiceId: string) => {
    const data = await getInvoiceDetail(invoiceId);
    return data;
}

function formatDate(date: Date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');  // Adds leading zero if day is single digit
    const month = String(d.getMonth() + 1).padStart(2, '0');  // getMonth() is zero-indexed, so add 1
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
}


export default function OrderDetail() {
    const searchParams = useSearchParams();
    const invoiceId = searchParams.get("invoiceId");
    const { data: invoice, error } = useSWR(invoiceId, fetcherInvoiceDetail);
    console.log(invoice);
    const splitInvoidId = (invoiceId: string) => invoiceId?.split("-").join("").substr(0, 15);

    const convertToVND = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    }

    const totalMoney = invoice?.orders?.reduce((total, order) => total + order.products.price * order.quantity, 0);
    let progressValue = 0;
    const invoiceStatus = invoice?.status;
    if (invoiceStatus === 'pending') {
        progressValue = 23;
    } else if (invoiceStatus === 'accepted') {
        progressValue = 49;
    } else if (invoiceStatus === 'cooking') {
        progressValue = 74;
    } else if (invoiceStatus === 'ready') {
        progressValue = 74;
    } else if (invoiceStatus === 'delivered') {
        progressValue = 100;
    }

    return (
        <div className="grow flex flex-col lg:px-8 gap-8 max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-1">
                <div className="flex flex-wrap gap-4 items-center">
                    <Button variant={"outline"}><Undo2 /></Button>
                    <h1 className="font-bold text-2xl">
                        Mã đơn hàng: <span>{splitInvoidId(invoice?.id || '')}</span>
                    </h1>
                </div>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/account" className="hover:text-amber-500">
                                Lịch sử đặt hàng
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/account/order-detail" className="hover:text-amber-500">
                                Chi tiết đơn hàng
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-wrap gap-4">
                    <p className="text-gray-500 text-sm">Ngày đặt hàng: {formatDate(invoice?.createdAt || new Date())}</p>
                    <p className="text-gray-500 text-sm">-</p>
                    <p className="text-gray-500 text-sm">Trạng thái: {invoice?.status === 'pending' ? "Đang giao" : invoice?.status === 'accepted' ? "Hoàn thành" : invoice?.status === 'cancelled' ? "Đã hủy" : "unknown"}</p>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Tiến trình giao hàng */}
                <div className="flex flex-col gap-4 flex-1">
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle>Tiến trình</CardTitle>
                            <CardDescription>Trạng thái giao hàng</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                                <div className={`border-2 rounded p-4 flex flex-col ${invoiceStatus === 'pending' ? 'bg-yellow-100' : ''}`}>
                                    <WalletCards />
                                    <p>Chờ xác nhận</p>
                                    {invoiceStatus === 'pending' && <CircleCheck className="stroke-green-600 fill-green-300" />}
                                </div>
                                <div className={`border-2 rounded p-4 flex flex-col ${invoiceStatus === 'accepted' ? 'bg-yellow-100' : ''}`}>
                                    <CookingPot />
                                    <p>Đang chuẩn bị</p>
                                    {invoiceStatus === 'accepted' && <CircleCheck className="stroke-green-600 fill-green-300" />}
                                </div>
                                <div className={`border-2 rounded p-4 flex flex-col ${invoiceStatus === 'cooking' ? 'bg-yellow-100' : ''}`}>
                                    <Package />
                                    <p>Chờ giao hàng</p>
                                    {invoiceStatus === 'cooking' && <CircleCheck className="stroke-green-600 fill-green-300" />}
                                </div>
                                <div className={`border-2 rounded p-4 flex flex-col ${invoiceStatus === 'delivered' ? 'bg-yellow-100' : ''}`}>
                                    <Truck />
                                    <p>Giao thành công</p>
                                    {invoiceStatus === 'ready' && <CircleCheck className="stroke-green-600 fill-green-300" />}
                                </div>
                            </div>
                            <Progress className="mt-4 h-2" value={progressValue} />
                        </CardContent>
                    </Card>
                    {/* Chi tiết đơn hàng */}
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle>Chi tiết đơn hàng</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table className="w-full">
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead className="text-center w-[100px]">Món ăn</TableHead>
                                        <TableHead></TableHead>
                                        <TableHead className="text-center">Số lượng</TableHead>
                                        <TableHead className="text-center">Giá</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {invoice?.orders?.map((order, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">
                                                <div className="flex gap-4 justify-center items-center">
                                                    <Image src={order?.products?.imageUrl} alt="" width={100} height={100} className="rounded" />
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-semibold">
                                                {order?.products.name}
                                            </TableCell>
                                            <TableCell className="text-center">x{order?.quantity}</TableCell>
                                            <TableCell className="text-center">{convertToVND(order?.quantity * order?.products?.price)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                {/* Hóa đơn */}
                <Card className="h-[350px] shadow-md lg:w-[300px]">
                    <CardHeader className="border-b-2">
                        <CardTitle>Hóa đơn</CardTitle>
                    </CardHeader>
                    <CardContent className="py-4">
                        <div className="bg-gray-100 grid grid-cols-2 p-4 rounded">
                            <div>Tạm tính:</div>
                            <div className="flex justify-end font-semibold">{convertToVND(totalMoney ?? 0)}</div>
                            <div>Giảm giá:</div>
                            <div className="flex justify-end font-semibold">{convertToVND((invoice?.discount?.discount ?? 0) * ((invoice?.totalAmount ?? 0) / 100))}</div>
                            <div className="mt-4 border-t-2 h-8 font-semibold">Tổng cộng: </div>
                            <div className="flex justify-end font-semibold mt-4 border-t-2 h-8">{convertToVND(invoice?.totalAmount ?? 0)}</div>
                            <div>(Đã bao gồm VAT)</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
