'use client'

import { useState } from 'react'
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
            // console.error("Error updating invoice status:", error)
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

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Chi tiết hóa đơn</h1>
            <div className="mb-6">
                <p><strong>Mã hóa đơn:</strong> {invoice?.id}</p>
                <p><strong>Tổng tiền:</strong> {convertToVND(invoice?.totalAmount)}</p>
                <div className="flex items-center mt-2">
                    <strong className="mr-2">Trạng thái:</strong>
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
                <p><strong>Ghi chú:</strong> {invoice?.note}</p>
            </div>
            <h2 className="text-xl font-semibold mb-2">Món ăn</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tên</TableHead>
                        <TableHead>Số lượng</TableHead>
                        <TableHead>Giá</TableHead>
                        <TableHead>Tổng</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoice?.orders?.map((order: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{order?.products?.name}</TableCell>
                            <TableCell>{order?.quantity}</TableCell>
                            <TableCell>{convertToVND(order?.products?.price)}</TableCell>
                            <TableCell>{convertToVND(order?.quantity * order?.products?.price)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button
                className="mt-4"
                onClick={() => router.push('/dashboard/order-management')}
            >
                Trở về
            </Button>
        </div>
    )
}

