"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, Calendar, DollarSign } from "lucide-react";

const statusColors: Record<any, string> = {
  pending: "bg-yellow-500",
  accepted: "bg-blue-500",
  cooking: "bg-orange-500",
  ready: "bg-purple-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
};

const status: Record<any, string> = {
  pending: "Đang xử lý",
  accepted: "Xác nhận",
  cooking: "Đang nấu",
  ready: "Sẵn sàng",
  delivered: "Đã giao",
  cancelled: "Đã hủy",
};

const paymentStatusColors: Record<any, string> = {
  pending: "text-yellow-500",
  failed: "text-red-500",
  success: "text-green-500",
  cancelled: "text-gray-500",
};

const paymentStatus: Record<any, string> = {
  pending: "Đang xử lý",
  failed: "Thất bại",
  success: "Thành công",
  cancelled: "Đã hủy",
};

const method: Record<any, string> = {
  paylater: "Tiền mặt",
  momo: "MOMO",
};

function DongFormat(number: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
}

const InvoiceCard = ({ invoice }: { invoice: any }) => {
  const totalAmount = invoice.orders.reduce(
    (sum: any, order: any) => sum + order.price * order.quantity,
    0,
  );

  return (
    <Card className="mb-4 overflow-hidden">
      <div className={`h-2 ${statusColors[invoice.status]}`} />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="truncate text-sm font-medium">
          Hóa đơn #{invoice.id}
        </CardTitle>
        <Badge
          variant={invoice.status === "delivered" ? "default" : "secondary"}
        >
          {status[invoice.status]}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-2xl font-bold">
          {DongFormat(invoice.totalAmount)}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <ShoppingCart className="h-4 w-4" />
            <span>{invoice.orders.length} sản phẩm</span>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{new Date(invoice.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between space-x-2 text-sm">
            <div className="flex h-9 items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>
                Thanh toán:{" "}
                <span
                  className={`font-semibold ${paymentStatusColors[invoice.payment.status]}`}
                >
                  {paymentStatus[invoice.payment.status]}
                </span>
              </span>
              <Badge variant="outline">{method[invoice.payment.method]}</Badge>
            </div>
            {invoice.payment.status === "pending" && invoice.payment.payUrl && (
              <Button
                size="sm"
                onClick={() =>
                  window.open(
                    invoice.payment.payUrl,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                Trả Ngay
              </Button>
            )}
          </div>
          {invoice.shipper && (
            <div className="flex items-center space-x-2 text-sm">
              <Truck className="h-4 w-4" />
              <span>Người giao hàng: {invoice.shipper.name}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function InvoiceListCard({ invoices }: { invoices: any }) {
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedInvoices = [...invoices].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="relative z-50 max-w-xl rounded-md border p-4">
      <h1 className="mb-4 text-2xl font-bold">Danh Sách Hóa Đơn</h1>
      <div className="mb-4 flex space-x-4">
        <Button onClick={() => toggleSort("createdAt")}>Xếp theo Ngày</Button>
        <Button onClick={() => toggleSort("status")}>
          Xếp theo Trạng Thái
        </Button>
      </div>
      <div className="grid gap-4">
        {sortedInvoices.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>
    </div>
  );
}
