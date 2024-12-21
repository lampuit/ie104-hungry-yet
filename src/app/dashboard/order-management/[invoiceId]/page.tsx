import { notFound } from 'next/navigation'
import { getInvoiceDetail } from '@/lib/data'
import { InvoiceDetails } from './invoice-detail'

// export interface Product {
//     id: string
//     name: string
//     quantity: number
//     price: number
// }

// export interface Invoice {
//     id: string
//     phone: string | null
//     createdAt: Date
//     status: "pending" | "accepted" | "cooking" | "ready" | "delivered" | "cancelled"
//     customerId: string
//     shipperId: string | null
//     totalAmount: number
//     orders: {
//         invoiceId: string
//         productId: string
//         products: Product[]
//     }
//     discount: { amount: number; description: string } | null
// }

export default async function InvoiceDetailsPage({ params }: { params: { invoiceId: string } }) {
    const invoice = await getInvoiceDetail(params.invoiceId) 

    console.log("invoice", invoice)

    if (!invoice) {
        notFound()
    }

    return <InvoiceDetails invoice={invoice} />
}
