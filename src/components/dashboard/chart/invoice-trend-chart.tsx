"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const getLastNDays = (n: number) => {
  const data = [];
  const today = new Date();

  for (let i = 0; i < n; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    data.unshift({ date, invoices: 0 });
  }

  return data;
};

const chartConfig = {
  invoices: {
    label: "Hóa Đơn",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function InvoicesTrendChart({ invoices }: { invoices: any[] }) {
  const data = [...getLastNDays(30), ...invoices].map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    invoices: item.invoices,
  }));

  const aggregatedData = data.reduce((accumulator: any, current: any) => {
    const { date, invoices } = current;

    if (!accumulator[date]) {
      accumulator[date] = 0;
    }

    accumulator[date] += Number(invoices);

    return accumulator;
  }, {});

  const chartData = Object.entries(aggregatedData).map(([date, invoices]) => ({
    date,
    invoices,
  }));

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={15}
          minTickGap={50}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent className="w-[150px]" nameKey="invoices" />
          }
        />
        <Line dataKey="invoices" type="monotone" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  );
}
