"use client";

import Image from "next/image";

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
import { MoreHorizontal } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";

export type Product = {
  id: string;
  name: string;
  imageURL: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          width="120"
          height="120"
          src={product.imageURL}
        />
      );
    },
    meta: {
      headerClassName: "hidden w-[120px] sm:table-cell",
      cellClassName: "hidden sm:table-cell",
    },
  },
  {
    accessorKey: "name",
    header: () => <div>Tên sản phẩm</div>,
    meta: {
      cellClassName: "font-medium",
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

      return <div>{formatted}</div>;
    },
  },

  {
    accessorKey: "category",
    header: () => <div>Thể loại</div>,
    cell: ({ row }) => {
      const category = String(row.getValue("category"));
      return <Badge variant="outline">{category}</Badge>;
    },
    meta: {
      headerClassName: "hidden lg:table-cell",
      cellClassName: "hidden lg:table-cell",
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Ngày tạo</div>,
    meta: {
      headerClassName: "hidden md:table-cell",
      cellClassName: "hidden md:table-cell",
    },
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
