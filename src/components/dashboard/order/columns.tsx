"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Invoice } from "@/app/dashboard/order-management/page";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-action";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { getUserById } from "@/lib/data";
import React from "react";

interface ShipperCellProps {
  shipperId: string;
}

const ShipperCell: React.FC<ShipperCellProps> = ({ shipperId }) => {
  const [user, setUser] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(shipperId);
        setUser(response?.[0]?.name || "Chưa có");
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUser("Unknown");
      }
    };

    fetchUser();
  }, [shipperId]);

  return <span className="truncate">{user}</span>;
};

export default ShipperCell;

const getStatusDescription = (status: string) => {
  const descriptions = {
    pending: "Chờ xác nhận",
    accepted: "Đã xác nhận",
    cooking: "Đang chuẩn bị",
    ready: "Đang giao hàng",
    delivered: "Đã giao",
    cancelled: "Đã hủy",
  };
  return descriptions[status as keyof typeof descriptions] || status;
};

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STT" />
    ),
    cell: ({ row }) => (
      <div className="w-[40px] min-w-[40px]">{row.index + 1}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giờ đặt đơn" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 min-w-[120px]">
          <span className="truncate">
            {row.getValue("createdAt")
              ? new Date(row.getValue("createdAt")).toLocaleString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
              : "Không có ghi chú"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <div className="min-w-[100px]">
          <Badge variant="outline" className="capitalize w-fit">
            {getStatusDescription(status)}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SĐT khách" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 min-w-[100px]">
          <span className="truncate">{row.getValue("phone")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "shipperId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shipper" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2 min-w-[100px]">
        <ShipperCell shipperId={row.getValue("shipperId")} />
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-start min-w-[50px]">
        <DataTableRowActions
          invoiceId={row.getValue("id")}
          initialStatus={row.getValue("status")}
        />
      </div>
    ),
  },
];
