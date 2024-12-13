"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const getLastNMonths = (n: number) => {
  const data = [];
  const today = new Date();

  for (let i = 1; i < n; i++) {
    const date = new Date();
    date.setMonth(today.getMonth() - i);
    data.unshift({ monthYear: date, revenues: 0 });
  }

  return data;
};
const chartConfig = {
  revenues: {
    label: "Doanh thu",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RevenueTrendChart({ revenues }: { revenues: any[] }) {
  const chartData = [...getLastNMonths(6), ...revenues].map((item) => ({
    monthYear: new Date(item.monthYear).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    }),
    revenues: item.revenues,
  }));

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="monthYear"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="revenues" fill="var(--color-desktop)" radius={8}>
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
