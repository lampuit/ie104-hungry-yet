"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

export type Product = {
  id: string;
  imageURL: string;
  price: number;
  quantity: number;
  category: string;
  createdAt: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex justify-center">
          <Image
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            width="120"
            height="120"
            src={product.imageURL}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div>Giá</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);

      return <div className="font-medium text-green-600">{formatted}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div>Số lượng</div>,
  },
  {
    accessorKey: "category",
    header: () => <div>Thể loại</div>,
    cell: ({ row }) => {
      const category = String(row.getValue("category"));
      return <Badge className="text-lg">{category}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Ngày tạo</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Sao chép mã
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
            <DropdownMenuItem className="text-bg-destructive">
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
