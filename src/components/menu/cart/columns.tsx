"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { createFavorite, deleteFavorite } from "@/lib/actions/favorite";
import { deletecarts, updateCarts } from "@/lib/actions/cart";
import { ColumnDef } from "@tanstack/react-table";
import { Heart, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
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
import useSWR, { mutate } from "swr";
import { getSession } from "@/lib/auth-client";
import { useToast } from "@/hooks/use-toast";

// Lấy userId từ session
const fetcherUserId = async () => {
  const response = await getSession();
  const userId = response?.data?.user?.id as string;
  return userId;
};

let userId: string | undefined;

export type Cart = {
  id: string;
  img: string;
  name: string;
  des: string;
  cost: number;
  amount: number;
  category: string;
  isFavorite: boolean;
};

type CartTableMeta = {
  onQuantityChange: (id: string, newQuantity: number) => void;
};

const AmountCell = ({ row, table }: { row: any; table: any }) => {
  const { data } = useSWR("userId", fetcherUserId);
  userId = data;
  const [amount, setAmount] = useState(row.original.amount);

  React.useEffect(() => {
    setAmount(row.original.amount);
  }, [row.original.amount]);

  const handleChangeAmount = async (quantity: number) => {
    const formData = new FormData();
    if (userId) {
      formData.append("userId", userId);
    }
    formData.append("productId", row.original.id);
    formData.append("quantity", quantity.toString());
    updateCarts(formData);
    (table.options.meta as CartTableMeta).onQuantityChange(
      row.original.id,
      quantity,
    );
  };

  const handleIncrease = () => {
    setAmount((prev: any) => {
      const newAmount = prev + 1;
      handleChangeAmount(newAmount);
      return newAmount;
    });
  };

  const handleDecrease = () => {
    setAmount((prev: any) => {
      if (prev > 1) {
        const newAmount = prev - 1;
        handleChangeAmount(newAmount);
        return newAmount;
      }
      return prev;
    });
  };

  return (
    <div className="flex flex-row items-center justify-center gap-3 text-xs md:gap-4 md:text-sm">
      <Button
        variant={"outline"}
        className={`${
          amount > 1
            ? "border-amber-500 text-amber-500 hover:bg-orange-200"
            : "border-gray-300 text-gray-300 hover:border-gray-300 hover:bg-white hover:text-gray-300"
        } size-4 p-2 sm:size-6`}
        onClick={handleDecrease}
      >
        -
      </Button>
      <div>{amount}</div>
      <Button
        size={"sm"}
        className="size-4 border border-amber-500 bg-amber-500 p-2 hover:bg-red-500 sm:size-6"
        onClick={handleIncrease}
      >
        +
      </Button>
    </div>
  );
};

const FavoriteCell = ({
  row,
  updateTableData,
}: {
  row: any;
  updateTableData: (id: string, isFavorite: boolean) => void;
}) => {
  const [isFavorite, setIsFavorite] = useState(row.original.isFavorite);
  const { toast } = useToast();

  const handleDeleteFavorite = async () => {
    const id = row.original.id;
    await deleteFavorite(userId || "", id);
    toast({
      title: "Đã bỏ yêu thích!",
      description: `${row.original.name} đã được xoá khỏi danh mục yêu thích của bạn.`,
    });
    setIsFavorite(false);
    updateTableData(id, false); // Update the table data immediately
  };

  const handleUpdateFavorite = async () => {
    const data = new FormData();
    data.append("productId", row.original.id);
    data.append("userId", userId || "");
    await createFavorite(data);
    toast({
      title: "Đã thêm vào danh mục yêu thích!",
      description: `${row.original.name} đã được thêm vào danh mục yêu thích của bạn.`,
    });
    setIsFavorite(true);
    updateTableData(row.original.id, true); // Update the table data immediately
  };

  return (
    <div>
      {isFavorite ? (
        <Heart
          className="size-5 fill-amber-500 stroke-amber-500 hover:shadow sm:size-6"
          onClick={handleDeleteFavorite}
        />
      ) : (
        <Heart
          className="size-5 stroke-amber-500 hover:shadow sm:size-6"
          onClick={handleUpdateFavorite}
        />
      )}
    </div>
  );
};

const DeleteCell = ({ row, mutate }: { row: any; mutate: () => void }) => {
  const { toast } = useToast();
  const handleDeleteItem = async () => {
    const id = row.original.id;
    await deletecarts(id, userId || "");
    mutate(); // Update the table data immediately
    toast({
      title: "Xoá thành công!",
      description: `${row.original.name} đã được xoá khỏi giỏ hàng của bạn.`,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center">
        <Trash className="size-5 stroke-amber-500 hover:shadow sm:size-6" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có muốn xoá không?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này sẽ không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Không</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500"
            onClick={() => handleDeleteItem()}
          >
            Có
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const columns: (
  mutate: () => void,
  updateTableData: (id: string, isFavorite: boolean) => void,
) => ColumnDef<Cart>[] = (mutate, updateTableData) => [
  {
    accessorKey: "name",
    header: () => (
      <div className="text-center text-xs md:text-sm">Giỏ hàng</div>
    ),
    cell: ({ row }) => {
      const name = row.original.name;
      const img = row.original.img;
      const cat = row.original.category;

      return (
        <div className="flex flex-row items-center justify-start gap-2 text-start text-xs sm:w-60 sm:gap-4 md:w-72 md:text-sm lg:w-96">
          <div className="relative flex sm:h-12 sm:w-20 md:h-16 md:w-24 lg:h-20 lg:w-28">
            <Image
              src={img}
              alt={name}
              fill
              sizes="100%"
              priority
              style={{ objectFit: "cover" }}
              className="rounded-sm"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <p className="font-bold">{name}</p>
            <p className="hidden sm:inline-block">{cat}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "cost",
    header: () => (
      <div className="text-center text-xs md:text-sm">Giá tiền</div>
    ),
    cell: ({ row }) => {
      const cost = row.original.cost as number;
      const convertToVND = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price);
      };
      return (
        <div className="text-center text-xs md:text-sm">
          {convertToVND(cost)}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className="text-center text-xs md:text-sm">Số lượng</div>
    ),
    cell: ({ row, table }) => <AmountCell row={row} table={table} />,
  },
  {
    id: "favorite",
    cell: ({ row }) => (
      <FavoriteCell row={row} updateTableData={updateTableData} />
    ),
  },
  {
    id: "delete",
    cell: ({ row }) => <DeleteCell row={row} mutate={mutate} />,
  },
];
