import { InvoicesTrendChart } from "@/components/dashboard/chart/invoice-trend-chart";
import { RevenueTrendChart } from "@/components/dashboard/chart/revenue-trend-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getInvoices, getInvoicesByStatus, getRevenues } from "@/lib/data";

export default async function Page() {
  const invoices = await getInvoices();
  const revenues = await getRevenues();

  console.log(revenues);

  const totalCancelled = (await getInvoicesByStatus("cancelled")).length;
  const invoicesDelivered = await getInvoicesByStatus("delivered");

  const totalDelivered = invoicesDelivered.length;
  const totalRevenue = invoicesDelivered.reduce(
    (sum, item) => sum + (item.totalAmount ?? 0),
    0,
  );

  const totalInvoice: number = invoices.reduce(
    (sum, item) => sum + item.invoices,
    0,
  );

  return (
    <div className="flex-1">
      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Hóa Đơn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Number(totalInvoice)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã Giao</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDelivered}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã Hủy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCancelled}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng Doanh Thu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue}</div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Biểu Đồ Doanh Thu</CardTitle>
            <CardDescription>Báo cáo 6 tháng gần đây</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueTrendChart revenues={revenues} />
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Biểu Đồ Hóa Đơn</CardTitle>
            <CardDescription>Báo cáo 30 ngày gần đây</CardDescription>
          </CardHeader>
          <CardContent>
            <InvoicesTrendChart invoices={invoices} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
