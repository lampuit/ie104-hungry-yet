'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { updateInvoiceStatus } from '@/lib/actions/invoice'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { getUserById } from '@/lib/data'
import useSWR from 'swr'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge, Calendar, CreditCard, FileText, Phone, ShoppingBag, Timer, Truck, User } from 'lucide-react'

const getUserInfo = async (userId: string) => {
    const response = await getUserById(userId)
    return response[0];
}

export function InvoiceDetails({ invoice }: { invoice: any }) {
    const [status, setStatus] = useState<"pending" | "accepted" |"cooking" | "ready" | "delivered" | "cancelled">(invoice.status)
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()

    const handleStatusChange = async (newStatus: "pending" | "accepted" |"cooking" | "ready" | "delivered" | "cancelled") => {
        setIsPending(true)
        try {
            await updateInvoiceStatus(invoice.id, newStatus)
            setStatus(newStatus)
            toast.success("Cập nhật trạng thái đơn hàng thành công")
        } catch (error) {
            toast.error("Cập nhật thất bại")
        } finally {
            setIsPending(false)
        }
    }

    const convertToVND = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    }

    const { data: shipper } = useSWR(invoice.shipperId, getUserInfo)

    const getStatusColor = (status: string) => {
        const colors = {
            pending: "bg-yellow-500",
            accepted: "bg-blue-500",
            cooking: "bg-orange-500",
            ready: "bg-green-500",
            delivered: "bg-purple-500",
            cancelled: "bg-red-500"
        }
        return colors[status as keyof typeof colors] || "bg-gray-500"
    }

    console.log("invoice", invoice)

    return (
        <div className="container mx-auto p-4 space-y-6">
            <Card className="shadow-lg">
                <CardHeader className="bg-gray-50">
                    <CardTitle className="text-2xl font-bold flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <span className="flex items-center">
                            <FileText className="mr-2 h-6 w-6 text-primary" />
                            Chi tiết hóa đơn
                        </span>
                        <Badge className={`${getStatusColor(status)} text-white px-3 py-1 rounded-full text-sm`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    <div className="space-y-3">
                        <p className="font-semibold flex items-center">
                            <ShoppingBag className="mr-2 h-5 w-5 text-gray-500" />
                            Mã hóa đơn: <span className="font-normal ml-2">{invoice?.id}</span>
                        </p>
                        <p className="font-semibold flex items-center">
                            <CreditCard className="mr-2 h-5 w-5 text-gray-500" />
                            Tổng tiền: <span className="font-normal ml-2 text-green-600">{convertToVND(invoice?.totalAmount)}</span>
                        </p>
                        <p className="font-semibold flex items-start">
                            <FileText className="mr-2 h-5 w-5 text-gray-500 mt-1" />
                            Ghi chú: <span className="font-normal ml-2">{invoice?.note || "Không có ghi chú"}</span>
                        </p>

                        <p className="font-semibold flex items-start">
                            <Timer className="mr-2 h-5 w-5 text-gray-500 mt-1" />
                            Giờ đặt hàng: <span className="font-normal ml-2">{invoice.createdAt
                                ? new Date(invoice.createdAt).toLocaleString("vi-VN", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })
                                : "Không có thời gian"}</span>
                        </p>

                    </div>
                    <div className="space-y-3">
                        <p className="font-semibold flex items-center">
                            <Truck className="mr-2 h-5 w-5 text-gray-500" />
                            Người giao hàng: <span className="font-normal ml-2">{shipper?.name || "Chưa phân công"}</span>
                        </p>
                        <p className="font-semibold flex items-center">
                            <Phone className="mr-2 h-5 w-5 text-gray-500" />
                            Số điện thoại: <span className="font-normal ml-2">{shipper?.phone || "N/A"}</span>
                        </p>
                        <div className="flex items-center mt-2">
                            <p className="font-semibold mr-2 flex items-center">
                                <Badge className="mr-2 h-5 w-5 text-gray-500" />
                                Trạng thái:
                            </p>
                            <Select
                                value={status}
                                onValueChange={handleStatusChange}
                                disabled={isPending}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["cooking", "ready", "delivered", "cancelled"].map((s) => (
                                        <SelectItem key={s} value={s}>
                                            {s.charAt(0).toUpperCase() + s.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <p className="font-semibold flex items-center">
                            <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                            Giờ nhận hàng dự kiến:{" "}
                            <span className="font-normal ml-2 text-red-500">
                                {invoice.createdAt ? (
                                    (() => {
                                        const createdAt = new Date(invoice.createdAt);
                                        const deliveryTimeInMs = (invoice.deliveryTime || 0) * 60 * 1000; // Chuyển đổi phút sang milliseconds
                                        const expectedDeliveryTime = new Date(createdAt.getTime() + deliveryTimeInMs);

                                        return expectedDeliveryTime.toLocaleString("vi-VN", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        });
                                    })()
                                ) : (
                                    "Không có thời gian"
                                )}
                            </span>
                        </p>

                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader className="bg-gray-50">
                    <CardTitle className="text-xl font-semibold flex items-center">
                        <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
                        Món ăn
                    </CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tên</TableHead>
                                <TableHead className="text-right">Số lượng</TableHead>
                                <TableHead className="text-right">Giá</TableHead>
                                <TableHead className="text-right">Tổng</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoice?.orders?.map((order: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{order?.products?.name}</TableCell>
                                    <TableCell className="text-right">{order?.quantity}</TableCell>
                                    <TableCell className="text-right">{convertToVND(order?.products?.price)}</TableCell>
                                    <TableCell className="text-right font-semibold">{convertToVND(order?.quantity * order?.products?.price)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button
                    onClick={() => router.push('/dashboard/order-management')}
                    variant="outline"
                    className="flex items-center"
                >
                    <User className="mr-2 h-4 w-4" />
                    Trở về
                </Button>
            </div>
        </div>
    )
}

