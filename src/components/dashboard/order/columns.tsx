"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Invoice } from "@/app/dashboard/order-management/page"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-action"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { getUserById } from "@/lib/data"
import React from "react"

interface ShipperCellProps {
  shipperId: string;
}

const ShipperCell: React.FC<ShipperCellProps> = ({ shipperId }) => {
  const [user, setUser] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(shipperId);
        setUser(response?.[0]?.name || "Unknown");
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUser("Unknown");
      }
    };

    fetchUser();
  }, [shipperId]);

  return <span>{user}</span>;
};

export default ShipperCell;




export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>{format(row.getValue("createdAt"), "PPP")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <Badge variant="outline" className="capitalize">
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>{row.getValue("phone")}</span>
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
      <div className="flex space-x-2">
        <ShipperCell shipperId={row.getValue("shipperId")} />
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        invoiceId={row.getValue("id")}
        initialStatus={row.getValue("status")}
      />
    ),
  },
];

