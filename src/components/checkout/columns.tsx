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
import { useRouter } from "next/navigation";
import { insertProductSchema } from "@/drizzle/schema/project";
import z, { StringValidation } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProduct } from "@/lib/actions/product";
import React from "react";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

export type Cart = {
  id: string;
  quantity: number;
  product: {
    name: string;
    imageUrl: string;
    price: number;
  };
};

export const columns: ColumnDef<Cart>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      const imageUrl = row.original?.product?.imageUrl;
      return (
        <Image
          priority
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          width="120"
          height="120"
          src={imageUrl}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: () => <div>Sản Phẩm</div>,
    cell: ({ row }) => {
      const name = row.original?.product?.name;
      return <div>{name}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div>Số Lượng</div>,
  },
  {
    accessorKey: "products.price",
    header: () => <div>Giá</div>,
    cell: ({ row }) => {
      const price = row.original?.product?.price;

      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);

      return <div>{formatted}</div>;
    },
  },
  {
    id: "Tổng",
    header: () => <div>Tổng</div>,
    cell: ({ row }) => {
      const price = row.original?.product?.price;
      const quantity = row.original?.quantity;
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(quantity * price);

      return <div>{formatted}</div>;
    },
  },
];
