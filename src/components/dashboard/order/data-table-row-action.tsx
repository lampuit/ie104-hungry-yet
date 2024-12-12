"use client"

import { MoreHorizontal } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

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

import { updateInvoiceStatus } from "@/lib/actions/invoice"
import { toast } from 'sonner'

interface DataTableRowActionsProps {
    invoiceId: string
    initialStatus: string
}

const StatusAction: React.FC<{
    optimisticStatus: string,
    isPending: boolean,
    invoiceId: string,
    setOptimisticStatus: (status: string) => void,
    startTransition: React.TransitionStartFunction
}> = ({ optimisticStatus, isPending, invoiceId, setOptimisticStatus, startTransition }) => {

    const handleChangeStatus = (status: string) => {
        startTransition(() => {
            // Async logic handled here
            (async () => {
                try {
                    const result = await updateInvoiceStatus(invoiceId, status)
                    if (result) {
                        setOptimisticStatus(status)
                        toast.success("Status updated successfully")
                    } else {
                        throw new Error('Failed to update status')
                    }
                } catch (error) {
                    console.error("Error updating invoice status:", error)
                    toast.error("Failed to update status")
                }
            })()
        })
    }


    return (
        <>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={optimisticStatus}>
                        {["pending", "accepted", "cooking", "ready", "delivered", "cancelled"].map((status) => (
                            <DropdownMenuRadioItem
                                key={status}
                                value={status}
                                onClick={() => handleChangeStatus(status)}
                                disabled={isPending}
                            >
                                {status}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
        </>
    )
}

export function DataTableRowActions({
    invoiceId,
    initialStatus,
}: DataTableRowActionsProps) {
    const [optimisticStatus, setOptimisticStatus] = useState(initialStatus)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    disabled={isPending}
                >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <StatusAction
                    optimisticStatus={optimisticStatus}
                    isPending={isPending}
                    invoiceId={invoiceId}
                    setOptimisticStatus={setOptimisticStatus}
                    startTransition={startTransition}
                />
                <DropdownMenuItem>
                    Delete
                    <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
