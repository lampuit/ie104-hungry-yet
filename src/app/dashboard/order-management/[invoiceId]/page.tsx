import { notFound, redirect } from "next/navigation";
import { getInvoiceDetail } from "@/lib/data";
import { InvoiceDetails } from "./invoice-detail";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

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

  const invoice = await getInvoiceDetail(params.invoiceId);

  if (!invoice) {
    notFound();
  }

  return <InvoiceDetails invoice={invoice} />;
}
