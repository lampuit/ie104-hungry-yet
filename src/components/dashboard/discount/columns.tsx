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
import {
  insertDiscountSchema,
  insertProductSchema,
} from "@/drizzle/schema/project";
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
import { deleteDiscount } from "@/lib/actions/discount";

export type Discount = z.infer<typeof insertDiscountSchema>;

export const columns: ColumnDef<Discount>[] = [
  {
    accessorKey: "name",
    header: () => <div>Mã</div>,
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <div className="font-semibold">{name}</div>;
    },
  },
  {
    accessorKey: "fromDate",
    header: () => <div>Bắt đầu</div>,
    cell: ({ row }) => {
      const from_date = new Date(row.getValue("fromDate"));
      return <div className="text-green-700">{from_date.toLocaleString()}</div>;
    },
    meta: {
      headerClassName: "hidden md:table-cell",
      cellClassName: "hidden md:table-cell",
    },
  },
  {
    accessorKey: "toDate",
    header: () => <div>Kết thúc</div>,
    cell: ({ row }) => {
      const to_date = new Date(row.getValue("toDate"));
      return <div className="text-red-700">{to_date.toLocaleString()}</div>;
    },
    meta: {
      headerClassName: "hidden md:table-cell",
      cellClassName: "hidden md:table-cell",
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

      const discount = row.original;

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
                onClick={() => navigator.clipboard.writeText(discount.id!)}
              >
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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
                  Bạn có chắc chắn muốn xóa mã không ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Thực hiện này sẽ không được thu hồi. Mã sẽ được xóa khỏi dữ
                  liệu.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    await deleteDiscount(discount.id!);
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
