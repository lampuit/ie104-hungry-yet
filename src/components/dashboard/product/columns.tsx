"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  //   id: string;
  imageURL: string;
  price: number;
  quantity: number;
  category: string;
  createdAt: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "imageURL",
    header: () => null,
    cell: ({ row }) => {
      const imageURL = String(row.getValue("imageURL"));
      return (
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          width="64"
          height="64"
          src={imageURL}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: () => <div>Name</div>,
    cell: ({ row }) => {
      const imageURL = String(row.getValue("name"));
      return <div>{imageURL}</div>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div>Quantity</div>,
  },
  {
    accessorKey: "category",
    header: () => <div>Category</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Created at</div>,
  },
];
