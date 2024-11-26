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


export default function OrderDetail() {
    return (
        <div className="grow flex flex-col lg:px-8 gap-8 max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-1">
                <div className="flex flex-wrap gap-4 items-center">
                    <Button variant={"outline"}><Undo2 /></Button>
                    <h1 className="font-bold text-2xl">
                        Mã đơn hàng: <span>xxxxxx</span>
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
                    <p className="text-gray-500 text-sm">Ngày đặt hàng: 22/12/2024</p>
                    <p className="text-gray-500 text-sm">-</p>
                    <p className="text-gray-500 text-sm">Trạng thái: Đang giao</p>
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
                                <div className="border-2 rounded p-4 flex flex-col">
                                    <WalletCards />
                                    <p>Chờ xác nhận</p>
                                    <CircleCheck className="stroke-green-600 fill-green-300" />
                                </div>
                                <div className="border-2 rounded p-4 flex flex-col">
                                    <CookingPot />
                                    <p>Đang chuẩn bị</p>
                                    <CircleCheck />
                                </div>
                                <div className="border-2 rounded p-4 flex flex-col">
                                    <Package />
                                    <p>Chờ giao hàng</p>
                                    <CircleCheck />
                                </div>
                                <div className="border-2 rounded p-4 flex flex-col">
                                    <Truck />
                                    <p>Giao thành công</p>
                                    <CircleCheck />
                                </div>
                            </div>
                            <Progress className="mt-4 h-2" value={23} />
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
                                    {[...Array(4)].map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">
                                                <div className="flex gap-4 justify-center items-center">
                                                    <Image src={"/images/square.jpg"} alt="" width={100} height={100} className="rounded" />
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-semibold">
                                                Cơm chiên dương châu
                                            </TableCell>
                                            <TableCell className="text-center">x1</TableCell>
                                            <TableCell className="text-center">45000đ</TableCell>
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
                            <div className="flex justify-end font-semibold">100000đ</div>
                            <div>Giảm giá:</div>
                            <div className="flex justify-end font-semibold">10000đ</div>
                            <div className="mt-4 border-t-2 h-8 font-semibold">Tổng cộng: </div>
                            <div className="flex justify-end font-semibold mt-4 border-t-2 h-8">90000đ</div>
                            <div>(Đã bao gồm VAT)</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
