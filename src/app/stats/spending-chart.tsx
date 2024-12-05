import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  spending: {
    label: "Spending",
    color: "#2563eb",
  },
} satisfies ChartConfig;

interface SpendingData {
  category: string;
  amount: number;
}

export function SpendingChart({
  spendingData,
}: {
  spendingData: SpendingData[];
}) {
  return (
    <ChartContainer
      config={chartConfig}
      className="h-80 flex place-self-center w-11/12 md:w-full"
    >
      <BarChart accessibilityLayer data={spendingData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="amount" fill="#60a5fa" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
