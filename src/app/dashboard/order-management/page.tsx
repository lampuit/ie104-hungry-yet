import { DataTable } from "@/components/dashboard/order/data-table"
import { columns } from "@/components/dashboard/order/columns"
import { getAllInvoices } from "@/lib/data"

export interface Invoice {
    id: string
    createdAt: Date
    updatedAt: Date
    status: "pending" | "accepted" | "cooking" | "ready" | "delivered" | "cancelled" | null
    phone: string | null
    customerId: string
    orders: {
        createdAt: Date
        updatedAt: Date
        invoiceId: string
        productId: string
        quantity: number
        products: {
            id: string
            name: string
            description: string
            price: number
            imageUrl: string
            createdAt: Date
            updatedAt: Date
            category: {
                id: string
                name: string
            } | null
        }
    }[]
}

export default async function OrderManagement() {
    const invoices: Invoice[] = await getAllInvoices()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={invoices} />
        </div>
    )
}

