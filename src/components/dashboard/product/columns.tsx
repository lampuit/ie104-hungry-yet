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
import z from "zod";
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

export type Product = z.infer<typeof insertProductSchema> & {
  categoryName: string | null;
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Image
          priority
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          width="160"
          height="160"
          src={product.imageUrl}
        />
      );
    },
    meta: {
      headerClassName: "hidden w-[160px] sm:table-cell",
      cellClassName: "hidden sm:table-cell",
    },
  },
  {
    accessorKey: "name",
    header: () => <div>Tên sản phẩm</div>,
    cell: ({ row }) => {
      const name = row.getValue("name") as string;

      return <div className="text-lg font-semibold">{name}</div>;
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
    accessorKey: "categoryName",
    header: () => <div>Thể loại</div>,
    cell: ({ row }) => {
      const category = String(row.getValue("categoryName"));
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
    cell: ({ row }) => {
      const created_at = new Date(row.getValue("createdAt"));
      return <div>{created_at.toLocaleDateString()}</div>;
    },
    meta: {
      headerClassName: "hidden md:table-cell",
      cellClassName: "hidden md:table-cell",
    },
  },
  {
    id: "actions",
    cell: function Actions({ row }) {
      const router = useRouter();
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

      const product = row.original;

      return (
        <>
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
                onClick={() => navigator.clipboard.writeText(product.id!)}
              >
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/product/${product.id}`}>Chỉnh sửa</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setIsDeleteDialogOpen(true)}>
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={() => setIsDeleteDialogOpen(!isDeleteDialogOpen)}
          >
            <AlertDialogTrigger asChild />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Bạn có chắc chắn muốn xóa sản phẩm không ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Thực hiện này sẽ không được thu hồi. Sản phẩm sẽ được xóa khỏi
                  dữ liệu.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    await deleteProduct(product.id!, product.imageUrl!);

                    toast({
                      title: "Xóa thành công sản phẩm.",
                    });
                  }}
                >
                  Tiếp tục
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
