"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { createFavorite, deleteFavorite } from "@/lib/actions/favorite";
import { deletecarts, updateCarts } from "@/lib/actions/cart";
import { ColumnDef } from "@tanstack/react-table";
import { Heart, Trash } from 'lucide-react';
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
import { toast } from "sonner";
import useSWR, { mutate } from "swr";
import { getSession } from "@/lib/auth-client";

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
    const { data } = useSWR('userId', fetcherUserId);
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
        (table.options.meta as CartTableMeta).onQuantityChange(row.original.id, quantity);
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
        <div className="flex flex-row justify-center items-center gap-3 md:gap-4 text-xs md:text-sm">
            <Button variant={"outline"}
                size={"sm"}
                className={`${amount > 1 ? "border-amber-500 text-amber-500 hover:bg-orange-200"
                    : "border-gray-300 text-gray-300 hover:text-gray-300 hover:border-gray-300 hover:bg-white"} w-6 h-6`}
                onClick={handleDecrease}>-</Button>
            <div>{amount}</div>
            <Button size={"sm"}
                className="bg-amber-500 hover:bg-red-500 w-6 h-6"
                onClick={handleIncrease}>+</Button>
        </div>
    );
};

const FavoriteCell = ({ row, updateTableData }: { row: any, updateTableData: (id: string, isFavorite: boolean) => void }) => {
    const [isFavorite, setIsFavorite] = useState(row.original.isFavorite);

    const handleDeleteFavorite = async () => {
        const id = row.original.id;
        await deleteFavorite(userId || "", id);
        setIsFavorite(false);
        updateTableData(id, false); // Update the table data immediately
    };

    const handleUpdateFavorite = async () => {
        const data = new FormData();
        data.append("productId", row.original.id);
        data.append("userId", userId || "");
        await createFavorite(data);
        setIsFavorite(true);
        updateTableData(row.original.id, true); // Update the table data immediately
    };

    return (
        <div>
            {isFavorite ? <Heart className="stroke-amber-500 fill-amber-500" onClick={handleDeleteFavorite} />
                : <Heart className="stroke-amber-500" onClick={handleUpdateFavorite} />}
        </div>
    );
};

const DeleteCell = ({ row, mutate }: { row: any, mutate: () => void }) => {
    const handleDeleteItem = async () => {
        const id = row.original.id;
        await deletecarts(id, userId || "");
        mutate(); // Update the table data immediately
        toast("Xoá thành công");
    };

    return <AlertDialog>
        <AlertDialogTrigger><Trash className="stroke-amber-500" /></AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Bạn có muốn xoá không?</AlertDialogTitle>
                <AlertDialogDescription>
                    Hành động này sẽ không thể hoàn tác.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Không</AlertDialogCancel>
                <AlertDialogAction className="bg-red-500" onClick={() => handleDeleteItem()}>Có</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>;
};

export const columns: (mutate: () => void, updateTableData: (id: string, isFavorite: boolean) => void) => ColumnDef<Cart>[] = (mutate, updateTableData) => [
    {
        accessorKey: "name",
        header: () => <div className="text-center text-xs md:text-sm">Giỏ hàng</div>,
        cell: ({ row }) => {
            const name = row.original.name;
            const img = row.original.img;
            const cat = row.original.category;

            return <div className="flex flex-row justify-start items-center sm:w-60 md:w-72 lg:w-96 text-start gap-2 sm:gap-4 text-xs md:text-sm">
                <div className="flex sm:w-20 md:w-24 lg:w-28 sm:h-12 md:h-16 lg:h-20 relative">
                    <Image
                        src={img}
                        alt={name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-sm"
                    />
                </div>
                <div className="flex flex-col justify-center items-start gap-4">
                    <p className="font-bold">{name}</p>
                    <p className="hidden sm:inline-block">{cat}</p>
                </div>
            </div>;
        },
    },
    {
        accessorKey: "cost",
        header: () => <div className="text-center text-xs md:text-sm">Giá tiền</div>,
        cell: ({ row }) => {
            const cost = row.original.cost as number;
            const convertToVND = (price: number) => {
                return new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(price);
            };
            return <div className="text-center text-xs md:text-sm">{convertToVND(cost)}</div>;
        },
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-center text-xs md:text-sm">Số lượng</div>,
        cell: ({ row, table }) => <AmountCell row={row} table={table} />,
    },
    {
        id: "favorite",
        cell: ({ row }) => <FavoriteCell row={row} updateTableData={updateTableData} />,
    },
    {
        id: "delete",
        cell: ({ row }) => <DeleteCell row={row} mutate={mutate} />,
    }
];