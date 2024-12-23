import { notFound, redirect } from "next/navigation";
import { getInvoiceDetail } from "@/lib/data";
import { InvoiceDetails } from "./invoice-detail";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

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

export default async function InvoiceDetailsPage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session || !session.user) redirect("/login");
  if (session.user.role === "customer") redirect("/");
  if (session.user.role !== "admin") redirect("/dashboard");

  const invoice = await getInvoiceDetail(params.invoiceId);

  console.log("invoice", invoice);

  if (!invoice) {
    notFound();
  }

  return <InvoiceDetails invoice={invoice} />;
}
