"use client";

import { Button } from "@/components/ui/button";
import { CircleCheck, MapPin, Truck, Undo2, User } from "lucide-react";
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
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderDetail() {
    return (
        <div className="grow flex flex-col gap-4">
            <div className="flex gap-4 items-center">
                <Button variant={"outline"}><Undo2 /></Button>
                <h1 className="font-bold text-2xl">Mã đơn hàng: <span>xxxxxx</span></h1>
            </div>
            <div className="flex gap-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/account" className="hover:text-amber-500">Tài khoản</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/account/order-detail" className="hover:text-amber-500">Chi tiết đơn hàng</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <p className="text-gray-500 text-sm">-</p>
                <p className="text-gray-500 text-sm">Ngày đặt hàng: 22/12/2024</p>
            </div>
            <div className="flex gap-4">
                <div className="grow flex flex-col gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Tiến trình
                            </CardTitle>
                            <CardDescription>
                                Trạng thái giao hàng
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 grid-cols-4">
                                <div className="border-2 rounded p-4">
                                    <Truck />
                                    <p>Chờ xác nhận</p>
                                    <CircleCheck className="stroke-green-600 fill-green-300" />
                                </div>
                                <div className="border-2 rounded p-4">
                                    <Truck />
                                    <p>Đang chuẩn bị</p>
                                    <CircleCheck />
                                </div>
                                <div className="border-2 rounded p-4">
                                    <Truck />
                                    <p>Chờ giao hàng</p>
                                    <CircleCheck />
                                </div>
                                <div className="border-2 rounded p-4">
                                    <Truck />
                                    <p>Giao thành công</p>
                                    <CircleCheck />
                                </div>
                            </div>
                            <Progress className="mt-4 h-2" value={23} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Chi tiết đơn hàng
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table className="w-full">
                                <TableHeader className="bg-gray-100">
                                    <TableRow className=" rounded">
                                        <TableHead className="text-center w-[100px]">Món ăn</TableHead>
                                        <TableHead></TableHead>
                                        <TableHead className="text-center">Số lượng</TableHead>
                                        <TableHead className="text-center">Giá</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            <div className="flex gap-4 justify-center items-center">
                                                <Image src={"/images/square.jpg"} alt="" width={100} height={100} className="rounded "></Image>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-semibold">Phở bò</TableCell>
                                        <TableCell className="text-center">x1</TableCell>
                                        <TableCell className="text-center">45000đ</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            <div className="flex gap-4 justify-center items-center">
                                                <Image src={"/images/square.jpg"} alt="" width={100} height={100} className="rounded "></Image>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-semibold">Phở bò</TableCell>
                                        <TableCell className="text-center">x1</TableCell>
                                        <TableCell className="text-center">45000đ</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            <div className="flex gap-4 justify-center items-center">
                                                <Image src={"/images/square.jpg"} alt="" width={100} height={100} className="rounded "></Image>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-semibold">Phở bò</TableCell>
                                        <TableCell className="text-center">x1</TableCell>
                                        <TableCell className="text-center">45000đ</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            <div className="flex gap-4 justify-center items-center">
                                                <Image src={"/images/square.jpg"} alt="" width={100} height={100} className="rounded "></Image>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-semibold">Phở bò</TableCell>
                                        <TableCell className="text-center">x1</TableCell>
                                        <TableCell className="text-center">45000đ</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div className="grow flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Hóa đơn
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <span className="flex ">Tạm tính: <span>100000đ</span></span>
                            <span className="flex ">Giảm giá: <span>10000đ</span></span>
                            <span className="flex flex-col gap-2"><span className="flex ">Tổng cộng: <span>90000đ</span></span>(Đã bao gồm VAT)</span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Khách hàng
                            </CardTitle>
                            <CardContent>
                                <p className="flex"><User />Thông tin:</p>
                                <p className="flex"><MapPin />Địa chỉ:</p>
                            </CardContent>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    )
}