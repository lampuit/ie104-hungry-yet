"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, CreditCard, Eye, ShoppingCart } from "lucide-react";
import { useState } from "react";

function DongFormat(number: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
}

const possibleColors = [
  "bg-yellow-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-blue-500",
  "bg-red-500",
];

const status = [
  "pending",
  "accepted",
  "cooking",
  "ready",
  "delivered",
  "cancelled",
];

export default function InvoiceListCard({
  invoices,
  append,
}: {
  invoices: any[];
  append: any;
}) {
  const [sortBy, setSortBy] = useState("date");
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
    <div className="round-md relative z-50 max-w-2xl border p-4">
      <h1 className="mb-4 text-2xl font-bold">Danh Sách Hóa Đơn</h1>
      <div className="mb-4 flex space-x-4">
        <button onClick={() => toggleSort("createdAt")}>
          Sắp xếp theo ngày
        </button>
        <button onClick={() => toggleSort("totalAmount")}>
          Sắp xếp theo số tiền
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {sortedInvoices.map((invoice: any, index) => (
          <Card className="mb-4 overflow-hidden" key={index}>
            <div
              className={`h-2 ${possibleColors[status.findIndex((item: any) => item === invoice.status)]}`}
            />
            <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
              <CardTitle
                className="z-50 cursor-pointer truncate text-sm font-medium"
                onClick={() => navigator.clipboard.writeText(invoice.id)}
              >
                #{invoice.id}
              </CardTitle>
              <Badge
                variant={
                  invoice.payment.status === "success"
                    ? "default"
                    : invoice.status === "pending"
                      ? "secondary"
                      : "destructive"
                }
              >
                {invoice.payment.status}
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
              <div className="flex items-center space-x-2 pt-4 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(invoice.createdAt).toLocaleString("vi-VN", {
                    timeZone: "UTC",
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
