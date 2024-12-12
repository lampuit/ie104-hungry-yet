"use client"

import { Row } from "@tanstack/react-table"
import { MoreHorizontal } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Invoice } from "@/app/dashboard/order-management/page"
import { changeStatusOfInvoice } from "@/lib/data"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const invoice = row.original as Invoice

    const hadleChangeStatus = async (id: string, status: string) => {
        try {
            await changeStatusOfInvoice(id, status)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                {/* <DropdownMenuItem>View details</DropdownMenuItem>
                <DropdownMenuItem>View customer</DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup value={invoice.status || undefined}>
                            {["pending", "accepted", "cooking", "ready", "delivered", "cancelled"].map((status) => (
                                <DropdownMenuRadioItem key={status} value={status} onClick={() => {
                                    hadleChangeStatus(invoice.id, status)
                                }}>
                                    {status}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Delete
                    <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

