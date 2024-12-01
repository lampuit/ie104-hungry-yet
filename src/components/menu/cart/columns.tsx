import { Button } from "@/components/ui/button"
import { createFavorite, deleteFavorite } from "@/lib/actions/favorite"
import { deletecarts, updateCarts } from "@/lib/actions/cart"
import { ColumnDef } from "@tanstack/react-table"
import { Heart, Trash } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
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
import { mutate } from "swr";

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


type CartTableMeta = {
    onQuantityChange: (id: string, newQuantity: number) => void
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
        cell: ({ row, table }) => {
            const [amount, setAmount] = useState(row.original.amount);


            const handleChaneAmount = (quantity: number) => {
                const formData = new FormData();
                formData.append("userId", sessionStorage.getItem("userId") as string);
                formData.append("productId", row.original.id);
                formData.append("quantity", quantity.toString());
                updateCarts(formData);
                (table.options.meta as CartTableMeta).onQuantityChange(row.original.id, quantity);
            }

            // useEffect(() => {
            // },)

            const handleIncrease = (quantity: number) => {
                setAmount(quantity + 1);
                handleChaneAmount(amount + 1);
            }
            const handleDecrease = (quantity: number) => {
                if (quantity > 1) {
                    setAmount(quantity - 1);
                    handleChaneAmount(amount - 1);
                }
            }

            return <div className="flex flex-row justify-center items-center gap-4">
                <Button variant={"outline"}
                    className={amount > 1 ? "border-amber-500 text-amber-500 hover:bg-orange-200 w-8 h-8"
                        : "border-gray-300 text-gray-300 w-8 h-8 hover:text-gray-300 hover:border-gray-300 hover:bg-white"}
                    onClick={() => handleDecrease(amount)}>-</Button>
                <div>{amount}</div>
                <Button className="bg-amber-500 hover:bg-red-500 w-8 h-8"
                    onClick={() => handleIncrease(amount)}>+</Button>
            </div>
        },
    },
    {
        id: "favorite",
        cell: ({ row }) => {
            const [isFavorite, setIsFavorite] = useState(row.original.isFavorite);
            // Function handle when favorite btn is clicked
            const handleDeleteFavorite = async () => {
                const id = row.original.id;
                await deleteFavorite(sessionStorage.getItem("userId") as string, id)
                setIsFavorite(false);
            };
            const handleUpdateFavorite = async () => {
                const data = new FormData();
                data.append("productId", row.original.id);
                data.append("userId", sessionStorage.getItem("userId") as string);
                await createFavorite(data);
                setIsFavorite(true);
            }

            return <div>
                <Heart className={isFavorite ? "fill-amber-500 stroke-amber-500" : "stroke-amber-500 fill-none"}
                    onClick={isFavorite ? () => handleDeleteFavorite() : () => handleUpdateFavorite()} />
            </div>
        },
    },
    {
        id: "delete",
        cell: ({ row }) => {
            const handleDeleteItem = async () => {
                const id = row.original.id;
                const userId = sessionStorage.getItem("userId") as string;
                await deletecarts(id, userId as string)
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

