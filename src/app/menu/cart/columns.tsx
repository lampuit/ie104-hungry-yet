"use client"

import { Button } from "@/components/ui/button"
import { createFavorite, deleteFavorite } from "@/lib/actions/favorite"
import { getSession } from "@/lib/auth-client"
import { ColumnDef } from "@tanstack/react-table"
import { Heart, Trash } from "lucide-react"
import Image from "next/image"
import useSWR from "swr"
import { useState } from "react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Cart = {
    id: string
    img: string
    name: string
    des: string
    cost: number
    amount: number
    isFavorite: boolean
}

const userFetcher = async () => {
    const response = await getSession();
    return response?.data?.user?.id;
  }

export const columns: ColumnDef<Cart>[] = [
    {
        accessorKey: "name",
        header: () => <div className="text-center">Giỏ hàng</div>,
        cell: ({ row }) => {
            const name = row.original.name;
            const img = row.original.img;
            const des = row.original.des;
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
            const cost = row.original.cost;
            return <div className="text-center">{cost}</div>
        },
    },
    {
        accessorKey: "amount",
        header: () => <div className="w-36 text-center">Số lượng</div>,
        cell: ({ row }) => {
            const amount = row.original.amount;
            return <div className="flex flex-row justify-center items-center gap-4">
                <Button variant={"outline"} className="border-amber-500 text-amber-500 hover:bg-orange-200 w-8 h-8">-</Button>
                <div>{amount}</div>
                <Button className="bg-amber-500 hover:bg-red-500 w-8 h-8">+</Button>
            </div>
        },
    },
    {
        id: "total",
        header: () => <div className="w-36 text-center">Thành tiền</div>,
        cell: ({ row }) => {
            const cost = row.original.cost;
            const amount = row.original.amount;
            return <div className="text-center">{amount * cost}</div>
        },
    },
    {
        id: "favorite",
        cell: ({ row }) => {
            const [isFavorite, setIsFavorite] = useState(row.original.isFavorite);
            // Function handle when favorite btn is clicked
            const { data: uid } = useSWR("userId", userFetcher);
            const handleDeleteFavorite = async() => {
                const id = row.original.id;
                await deleteFavorite( uid as string, id)
                setIsFavorite(false);
            };
            const handleUpdateFavorite = async() => {
                const data = new FormData();
                data.append("productId", row.original.id);
                data.append("userId", uid as string);
                await createFavorite(data);
                setIsFavorite(true);
            }

            return <div>
                <Heart className={isFavorite ? "fill-amber-500 stroke-amber-500" : "stroke-amber-500 fill-none" }
                onClick={isFavorite ? () => handleDeleteFavorite() : () => handleUpdateFavorite()} />
            </div>
        },
    },
    {
        id: "delete",
        cell: ({ row }) => {
            return <div><Trash className="stroke-amber-500" /></div>
        },
    }
]
