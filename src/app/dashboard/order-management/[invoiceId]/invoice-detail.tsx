"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateInvoiceStatus } from "@/lib/actions/invoice";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserById } from "@/lib/data";
import useSWR from "swr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, Calendar, CornerDownLeft, CreditCard, FileText, Phone, ShoppingBag, Timer, Truck, User } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const getUserInfo = async (userId: string) => {
  const response = await getUserById(userId);
  return response[0];
};

export function InvoiceDetails({ invoice }: { invoice: any }) {
  const [status, setStatus] = useState<
    "pending" | "accepted" | "cooking" | "ready" | "delivered" | "cancelled"
  >(invoice.status);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (
    newStatus:
      | "pending"
      | "accepted"
      | "cooking"
      | "ready"
      | "delivered"
      | "cancelled",
  ) => {
    setIsPending(true);
    try {
      await updateInvoiceStatus(invoice.id, newStatus);
      setStatus(newStatus);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Cập nhật thất bại",
      });
    } finally {
      setIsPending(false);
    }
  };

  const convertToVND = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const { data: shipper } = useSWR(invoice.shipperId, getUserInfo);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-500",
      accepted: "bg-blue-500",
      cooking: "bg-orange-500",
      ready: "bg-green-500",
      delivered: "bg-purple-500",
      cancelled: "bg-red-500",
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
  };

  const getStatusDescription = (status: string) => {
    const descriptions = {
      pending: "Đơn đang chờ xác nhận",
      accepted: "Xác nhận đơn",
      cooking: "Chuẩn bị món",
      ready: "Giao hàng",
      delivered: "Giao thành công",
      cancelled: "Hủy đơn",
    };
    return descriptions[status as keyof typeof descriptions] || status;
  };

  return (
    <div className="container mx-auto space-y-6 p-4">
      <Card className="shadow-lg">
        <CardHeader className="bg-gray-50">
          <CardTitle className="flex flex-col items-start justify-between gap-2 text-2xl font-bold sm:flex-row sm:items-center">
            <span className="flex items-center">
              <FileText className="mr-2 h-6 w-6 text-primary" />
              Chi tiết hóa đơn
            </span>
            <Badge
              className={`${getStatusColor(status)} rounded-full px-3 py-1 text-sm text-white`}
            >
              {getStatusDescription(status)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
          <div className="space-y-3">
            <p className="flex items-center font-semibold">
              <ShoppingBag className="mr-2 h-5 w-5 text-gray-500" />
              Mã hóa đơn:{" "}
              <span className="ml-2 font-normal">{invoice?.id}</span>
            </p>
            <p className="flex items-center font-semibold">
              <CreditCard className="mr-2 h-5 w-5 text-gray-500" />
              Tổng tiền:{" "}
              <span className="ml-2 font-normal text-green-600">
                {convertToVND(invoice?.totalAmount)}
              </span>
            </p>
            <p className="flex items-start font-semibold">
              <FileText className="mr-2 mt-1 h-5 w-5 text-gray-500" />
              Ghi chú:{" "}
              <span className="ml-2 font-normal">
                {invoice?.note || "Không có ghi chú"}
              </span>
            </p>

            <p className="flex items-start font-semibold">
              <Timer className="mr-2 mt-1 h-5 w-5 text-gray-500" />
              Giờ đặt hàng:{" "}
              <span className="ml-2 font-normal">
                {invoice.createdAt
                  ? new Date(invoice.createdAt).toLocaleString("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  : "Không có thời gian"}
              </span>
            </p>
          </div>
          <div className="space-y-3">
            <p className="flex items-center font-semibold">
              <Truck className="mr-2 h-5 w-5 text-gray-500" />
              Người giao hàng:{" "}
              <span className="ml-2 font-normal">
                {shipper?.name || "Chưa phân công"}
              </span>
            </p>
            <p className="flex items-center font-semibold">
              <Phone className="mr-2 h-5 w-5 text-gray-500" />
              Số điện thoại:{" "}
              <span className="ml-2 font-normal">
                {shipper?.phone || "N/A"}
              </span>
            </p>
            <div className="mt-2 flex items-center">
              <p className="mr-2 flex items-center font-semibold">
                <Badge className="mr-2 h-5 w-5 text-gray-500" />
                Trạng thái:
              </p>
              <Select
                value={status}
                onValueChange={handleStatusChange}
                disabled={isPending}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {["pending", "accepted","cooking", "ready", "delivered", "cancelled" ].map((s) => (
                    <SelectItem key={s} value={s}>
                      {getStatusDescription(s)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <p className="flex items-center font-semibold">
              <Calendar className="mr-2 h-5 w-5 text-gray-500" />
              Giờ nhận hàng dự kiến:{" "}
              <span className="ml-2 font-normal text-red-500">
                {invoice.createdAt
                  ? (() => {
                    const createdAt = new Date(invoice.createdAt);
                    const deliveryTimeInMs =
                      (invoice.deliveryTime || 0) * 60 * 1000; // Chuyển đổi phút sang milliseconds
                    const expectedDeliveryTime = new Date(
                      createdAt.getTime() + deliveryTimeInMs,
                    );

                    return expectedDeliveryTime.toLocaleString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                  })()
                  : "Không có thời gian"}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader className="bg-gray-50">
          <CardTitle className="flex items-center text-xl font-semibold">
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
                  <TableCell className="font-medium">
                    {order?.products?.name}
                  </TableCell>
                  <TableCell className="text-right">
                    {order?.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    {convertToVND(order?.products?.price)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {convertToVND(order?.quantity * order?.products?.price)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={() => router.push("/dashboard/order-management")}
          variant="outline"
          className="flex items-center"
        >
          <CornerDownLeft className="mr-1 h-4 w-4" />
          Trở về
        </Button>
      </div>
    </div>
  );
}