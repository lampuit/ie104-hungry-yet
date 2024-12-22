import { notFound } from "next/navigation";
import { getInvoiceDetail } from "@/lib/data";
import { InvoiceDetails } from "./invoice-detail";

export default async function InvoiceDetailsPage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const invoice = await getInvoiceDetail(params.invoiceId);

  console.log("invoice", invoice);

  if (!invoice) {
    notFound();
  }

  return <InvoiceDetails invoice={invoice} />;
}
