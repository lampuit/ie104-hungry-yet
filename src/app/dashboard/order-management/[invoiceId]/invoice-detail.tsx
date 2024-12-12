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
import { get } from 'http'
import { getUserById } from '@/lib/data'
import useSWR from 'swr'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge, Phone, User } from 'lucide-react'

const getUserInfo = async (userId: string) => {
    const response = await getUserById(userId)
    return response[0];
}

export function InvoiceDetails({ invoice }: { invoice: any }) {
    const [status, setStatus] = useState<"pending" | "accepted" | "cooking" | "ready" | "delivered" | "cancelled">(invoice.status)
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()

    const handleStatusChange = async (newStatus: "pending" | "accepted" | "cooking" | "ready" | "delivered" | "cancelled") => {
        setIsPending(true)
        try {
            await updateInvoiceStatus(invoice.id, newStatus)
            setStatus(newStatus)
            toast.success("Cập nhập trạng thái đơn hàng thành công")
        } catch (error) {
            toast.error("Cập nhập thất bại")
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

    return (
        <div className="container mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex justify-between items-center">
                        Chi tiết hóa đơn
                        <Badge className={`${getStatusColor(status)} text-white`}>{status}</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold">Mã hóa đơn: <span className="font-normal">{invoice?.id}</span></p>
                        <p className="font-semibold">Tổng tiền: <span className="font-normal text-green-600">{convertToVND(invoice?.totalAmount)}</span></p>
                        <p className="font-semibold">Ghi chú: <span className="font-normal">{invoice?.note || "Không có ghi chú"}</span></p>
                    </div>
                    <div>
                        <p className="font-semibold flex items-center"><User className="mr-2" /> Người giao hàng: <span className="font-normal ml-2">{shipper?.name || "Chưa phân công"}</span></p>
                        <p className="font-semibold flex items-center"><Phone className="mr-2" /> Số điện thoại: <span className="font-normal ml-2">{shipper?.phone || "N/A"}</span></p>
                        <div className="flex items-center mt-2">
                            <p className="font-semibold mr-2">Trạng thái:</p>
                            <Select
                                value={status}
                                onValueChange={handleStatusChange}
                                disabled={isPending}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["pending", "accepted", "cooking", "ready", "delivered", "cancelled"].map((s) => (
                                        <SelectItem key={s} value={s}>
                                            {s}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Món ăn</CardTitle>
                </CardHeader>
                <CardContent>
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
                >
                    Trở về
                </Button>
            </div>
        </div>
    )
}
