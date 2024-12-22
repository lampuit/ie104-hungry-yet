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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CircleCheck,
  CookingPot,
  Package,
  PackageCheck,
  Truck,
  Undo2,
  WalletCards,
  X,
} from "lucide-react";
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

function SearchParamsProvider({
  children,
}: {
  children: (params: { invoiceId: string | null }) => React.ReactNode;
}) {
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
    0,
  );

  const invoiceStatus = invoice.status;
  const cancelReason = invoice.reason;
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
    <div className="mx-auto flex max-w-screen-lg grow flex-col gap-8 lg:px-8">
      {/* Header and Breadcrumb */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-4">
          <Button
            onClick={() => {
              window.history.back();
            }}
            variant={"outline"}
          >
            <Undo2 />
          </Button>
          <h1 className="text-2xl font-bold">
            Mã đơn hàng: <span>{splitInvoiceId(invoice.id)}</span>
          </h1>
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/account/history"
                className="hover:text-amber-500"
              >
                Lịch sử đặt hàng
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-amber-500 hover:text-amber-500">
                Chi tiết đơn hàng
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-wrap gap-4">
          <p className="text-sm text-gray-500">
            Ngày đặt hàng: {formatDate(invoice.createdAt)}
          </p>
          <p className="text-sm text-gray-500">-</p>
          <p className="text-sm text-gray-500">
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
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          {/* Delivery Progress */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Tiến trình</CardTitle>
              {invoiceStatus === "cancelled" ?
                <CardDescription className="text-red-500 font-semibold space-y-1">
                  <p className="flex gap-2"><X className="rounded-full bg-red-500 stroke-white p-1" size={20} /> Đơn hàng đã bị hủy</p>
                  <p className="text-black font-normal">Lý do huỷ: {cancelReason}</p>
                </CardDescription>
                :
                <CardDescription>Trạng thái giao hàng</CardDescription>}
            </CardHeader>
            {invoiceStatus === "cancelled" ? null :
              <CardContent>
                <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-5">
                  {[
                    {
                      status: "pending",
                      label: "Chờ xác nhận",
                      icon: WalletCards,
                    },
                    {
                      status: "accepted",
                      label: "Đã xác nhận",
                      icon: CircleCheck,
                    },
                    {
                      status: "cooking",
                      label: "Đang chuẩn bị",
                      icon: CookingPot,
                    },
                    { status: "ready", label: "Đang giao", icon: Truck },
                    {
                      status: "delivered",
                      label: "Thành công",
                      icon: PackageCheck,
                    },
                  ].map((step) => (
                    <div
                      key={step.status}
                      className={`flex flex-col items-center rounded border-2 px-1 py-2 ${invoiceStatus === step.status ? "bg-yellow-100" : ""
                        }`}
                    >
                      <step.icon />
                      <p className="pt-2">{step.label}</p>
                      {invoiceStatus === step.status && (
                        <CircleCheck className="fill-green-300 stroke-green-600 pt-2" />
                      )}
                    </div>
                  ))}
                </div>
                <Progress className="mt-4 h-2" value={progressValue} />
              </CardContent>
            }
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
                    <TableHead className="hidden w-[100px] text-center md:flex md:items-center">
                      Món ăn
                    </TableHead>
                    <TableHead></TableHead>
                    <TableHead className="text-center">Số lượng</TableHead>
                    <TableHead className="text-center">Giá</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice.orders?.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell className="hidden md:block">
                        <div className="flex items-center justify-center">
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
            <div className="rounded bg-gray-100 p-4">
              <div className="grid grid-cols-2">
                <div>Tạm tính:</div>
                <div className="flex justify-end font-semibold">
                  {convertToVND(totalMoney ?? 0)}
                </div>
                <div>Giảm giá:</div>
                <div className="flex justify-end font-semibold">
                  {convertToVND(
                    (invoice.discount?.discount ?? 0) *
                    ((invoice.totalAmount ?? 0) / 100),
                  )}
                </div>
                <div className="mt-4 h-8 border-t-2 font-semibold">
                  Tổng cộng:{" "}
                </div>
                <div className="mt-4 flex h-8 justify-end border-t-2 font-semibold">
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
  );
}
