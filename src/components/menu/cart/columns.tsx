import React from "react"
import { Button } from "@/components/ui/button"
import { createFavorite, deleteFavorite } from "@/lib/actions/favorite"
import { deletecarts, updateCarts } from "@/lib/actions/cart"
import { ColumnDef } from "@tanstack/react-table"
import { Heart, Trash } from 'lucide-react'
import Image from "next/image"
import { useState } from "react"
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
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import useSWR, { mutate } from "swr"
import { getSession } from "@/lib/auth-client";

// Lấy userId từ session
const fetcherUserId = async () => {
    const response = await getSession();
    const userId = response?.data?.user?.id as string;
    return userId;
};

let userId: string | undefined;

export type Cart = {
    id: string
    img: string
    name: string
    des: string
    cost: number
    amount: number
    isFavorite: boolean
    category: string
}

type CartTableMeta = {
    onQuantityChange: (id: string, newQuantity: number) => void
}


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
    }

    const handleIncrease = () => {
        setAmount((prev: any) => {
            const newAmount = prev + 1;
            handleChangeAmount(newAmount);
            return newAmount;
        });
    }

    const handleDecrease = () => {
        setAmount((prev: any) => {
            if (prev > 1) {
                const newAmount = prev - 1;
                handleChangeAmount(newAmount);
                return newAmount;
            }
            return prev;
        });
    }

    return (
        <div className="flex flex-row justify-center items-center gap-4">
            <Button variant={"outline"}
                className={amount > 1 ? "border-amber-500 text-amber-500 hover:bg-orange-200 w-8 h-8"
                    : "border-gray-300 text-gray-300 w-8 h-8 hover:text-gray-300 hover:border-gray-300 hover:bg-white"}
                onClick={handleDecrease}>-</Button>
            <div>{amount}</div>
            <Button className="bg-amber-500 hover:bg-red-500 w-8 h-8"
                onClick={handleIncrease}>+</Button>
        </div>
    );
}

const FavoriteCell = ({ row }: { row: any }) => {
    const [isFavorite, setIsFavorite] = useState(row.original.isFavorite);

    const handleDeleteFavorite = async () => {
        const id = row.original.id;
        await deleteFavorite(userId || "", id)
        setIsFavorite(false);
    };

    const handleUpdateFavorite = async () => {
        const data = new FormData();
        data.append("productId", row.original.id);
        data.append("userId", userId || "");
        await createFavorite(data);
        setIsFavorite(true);
    }

    return (
        <div>
            <Heart className={isFavorite ? "fill-amber-500 stroke-amber-500" : "stroke-amber-500 fill-none"}
                onClick={isFavorite ? handleDeleteFavorite : handleUpdateFavorite} />
        </div>
    );
}

export const columns: ColumnDef<Cart>[] = [
    {
        accessorKey: "name",
        header: () => <div className="text-center">Giỏ hàng</div>,
        cell: ({ row }) => {
            const name = row.original.name;
            const img = row.original.img;
            const des = row.original.category;

            return <div className="flex flex-row justify-start items-center w-96 text-start gap-4">
                <Image
                    src={img}
                    alt={name}
                    width={128}
                    height={128}
                />
                <div className="flex flex-col justify-center items-start gap-4">
                    <p className="font-bold">{name}</p>
                    <p>{des}</p>
                </div>
            </div>
        },
    },
    {
        accessorKey: "cost",
        header: () => <div className="w-36 text-center">Giá tiền</div>,
        cell: ({ row }) => {
            const cost = row.original.cost as number;
            const convertToVND = (price: number) => {
                return new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(price);
            };
            return <div className="text-center">{convertToVND(cost)}</div>
        },
    },
    {
        accessorKey: "amount",
        header: () => <div className="w-36 text-center">Số lượng</div>,
        cell: ({ row, table }) => <AmountCell row={row} table={table} />,
    },
    {
        id: "favorite",
        cell: ({ row }) => <FavoriteCell row={row} />,
    },
    {
        id: "delete",
        cell: ({ row }) => {
            const handleDeleteItem = async () => {
                const id = row.original.id;
                await deletecarts(id, userId || "");
                mutate(userId);
                toast("Xoá thành công")
            }

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
            </AlertDialog>
        },
    }
]

