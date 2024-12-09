"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, CookingPot, Package, PackageCheck, Truck, Undo2, WalletCards } from 'lucide-react';
import LoadingSpinner from "@/components/ui/loading-spinner";
import { getInvoiceDetail } from "@/lib/data";

const fetcherInvoiceDetail = async (invoiceId: string) => {
    if (!invoiceId) return null;
    return await getInvoiceDetail(invoiceId);
};

function formatDate(date: Date | string | undefined) {
    if (!date) return "N/A";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

function SearchParamsProvider({ children }: { children: (params: { invoiceId: string | null }) => React.ReactNode }) {
    const searchParams = useSearchParams();
    const invoiceId = searchParams.get("invoiceId");
    return children({ invoiceId });
}

function OrderDetailContent({ invoiceId }: { invoiceId: string }) {
    const { data: invoice, error } = useSWR(invoiceId, fetcherInvoiceDetail);

    if (error) return <p>Error: {error.message}</p>;
    if (!invoice) return <LoadingSpinner />;

    const splitInvoiceId = (invoiceId: string) =>
        invoiceId?.split("-").join("").substr(0, 15);

    const convertToVND = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    const totalMoney = invoice.orders?.reduce(
        (total, order) => total + order.products.price * order.quantity,
        0
    );

    const invoiceStatus = invoice.status;
    const progressValue =
        invoiceStatus === "pending"
            ? 18
            : invoiceStatus === "accepted"
                ? 38
                : invoiceStatus === "cooking"
                    ? 58
                    : invoiceStatus === "ready"
                        ? 79
                        : invoiceStatus === "delivered"
                            ? 100
                            : 0;

    return (
        <div className="grow flex flex-col lg:px-8 gap-8 max-w-screen-lg mx-auto">
            {/* Header and Breadcrumb */}
            <div className="flex flex-col gap-1">
                <div className="flex flex-wrap gap-4 items-center">
                    <Button onClick={() => {
                        window.history.back();
                    }} variant={"outline"}>
                        <Undo2 />
                    </Button>
                    <h1 className="font-bold text-2xl">
                        Mã đơn hàng: <span>{splitInvoiceId(invoice.id)}</span>
                    </h1>
                </div>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/account/history" className="hover:text-amber-500">
                                Lịch sử đặt hàng
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink className="hover:text-amber-500 text-amber-500">
                                Chi tiết đơn hàng
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-wrap gap-4">
                    <p className="text-gray-500 text-sm">
                        Ngày đặt hàng: {formatDate(invoice.createdAt)}
                    </p>
                    <p className="text-gray-500 text-sm">-</p>
                    <p className="text-gray-500 text-sm">
                        Trạng thái:{" "}
                        {invoiceStatus === "pending"
                            ? "Đang chờ xác nhận"
                            : invoiceStatus === "accepted"
                                ? "Đã xác nhận"
                                : invoiceStatus === "cooking"
                                    ? "Đang chuẩn bị"
                                    : invoiceStatus === "ready"
                                        ? "Đang giao hàng"
                                        : invoiceStatus === "delivered"
                                            ? "Hoàn thành"
                                            : invoiceStatus === "cancelled"
                                                ? "Đã hủy"
                                                : "unknown"}
                    </p>
                </div>
            </div>

            {/* Order Details and Progress */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col gap-4 flex-1">
                    {/* Delivery Progress */}
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle>Tiến trình</CardTitle>
                            <CardDescription>Trạng thái giao hàng</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 grid-cols-2 md:grid-cols-5 text-xs ">
                                {[
                                    { status: "pending", label: "Chờ xác nhận", icon: WalletCards },
                                    { status: "accepted", label: "Đã xác nhận", icon: CircleCheck },
                                    { status: "cooking", label: "Đang chuẩn bị", icon: CookingPot },
                                    { status: "ready", label: "Đang giao", icon: Truck },
                                    { status: "delivered", label: "Thành công", icon: PackageCheck },
                                ].map((step) => (
                                    <div
                                        key={step.status}
                                        className={`border-2 rounded py-2 px-1 flex flex-col items-center ${invoiceStatus === step.status ? "bg-yellow-100" : ""
                                            }`}
                                    >
                                        <step.icon />
                                        <p className="pt-2">{step.label}</p>
                                        {invoiceStatus === step.status && (
                                            <CircleCheck className="stroke-green-600 fill-green-300 pt-2" />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <Progress className="mt-4 h-2" value={progressValue} />
                        </CardContent>
                    </Card>

                    {/* Order Details */}
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
                                    {invoice.orders?.map((order, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <div className="flex justify-center items-center">
                                                    <Image
                                                        src={order.products.imageUrl}
                                                        alt={order.products.name}
                                                        width={100}
                                                        height={100}
                                                        className="rounded"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-semibold">
                                                {order.products.name}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                x{order.quantity}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {convertToVND(order.quantity * order.products.price)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* Invoice Summary */}
                <Card className="h-[350px] shadow-md lg:w-[300px]">
                    <CardHeader className="border-b-2">
                        <CardTitle>Hóa đơn</CardTitle>
                    </CardHeader>
                    <CardContent className="py-4">
                        <div className="bg-gray-100 p-4 rounded">
                            <div className="grid grid-cols-2">
                                <div>Tạm tính:</div>
                                <div className="flex justify-end font-semibold">
                                    {convertToVND(totalMoney ?? 0)}
                                </div>
                                <div>Giảm giá:</div>
                                <div className="flex justify-end font-semibold">
                                    {convertToVND(
                                        (invoice.discount?.discount ?? 0) *
                                        ((invoice.totalAmount ?? 0) / 100)
                                    )}
                                </div>
                                <div className="mt-4 border-t-2 h-8 font-semibold">Tổng cộng: </div>
                                <div className="flex justify-end font-semibold mt-4 border-t-2 h-8">
                                    {convertToVND(invoice.totalAmount ?? 0)}
                                </div>
                            </div>
                            <div>(Đã bao gồm VAT)</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function OrderDetail() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <SearchParamsProvider>
                {({ invoiceId }: { invoiceId: string | null }) =>
                    invoiceId ? (
                        <OrderDetailContent invoiceId={invoiceId} />
                    ) : (
                        <p>No invoice ID provided</p>
                    )
                }
            </SearchParamsProvider>
        </Suspense>
    )
}

