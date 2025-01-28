"use client";

import { ReactNode, useMemo } from "react";
import { CartesianGrid, Line, LineChart, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { ChartContainer } from "@/components/ui/simple-chart";
import { ChartTooltipContainer, ChartTooltipItem } from "@/components/ui/chart-tooltip";
import { FinanceData, FinanceRowData } from "@/types/finance-types";
import useAspectRatio from "@/hooks/use-aspect-ratio";
import { calculateYAxisValues } from "@/lib/chart-helper";
import { formatDate } from "@/lib/date-helper";
import { formatNumber } from "@/lib/number-helper";
import { chartConfig } from "./finance-chart-config";

function getChartData(financeData: FinanceData): FinanceRowData[] {
  return financeData.data.map(({ date, result, liquidity }) => ({ date, result, liquidity }));
}

function ChartTooltip({ active, payload }: TooltipProps<ValueType, NameType>): ReactNode {
  if (active && payload && payload.length) {
    const data = payload[0].payload as FinanceRowData;
    return (
      <ChartTooltipContainer>
        <ChartTooltipItem label={formatDate(data.date)} />
        <ChartTooltipItem
          color={chartConfig.result.color}
          label={`${chartConfig.result.label}:`}
          value={formatNumber(data.result)}
        />
        <ChartTooltipItem
          color={chartConfig.liquidity.color}
          label={`${chartConfig.liquidity.label}:`}
          value={formatNumber(data.liquidity)}
        />
      </ChartTooltipContainer>
    );
  }

  return null;
}

type FinanceResultChartProps = {
  financeData: FinanceData;
  showXAxisValues: boolean;
};

export function FinanceResultChart({ financeData, showXAxisValues }: FinanceResultChartProps) {
  const aspectRatio = useAspectRatio();
  const chartData = useMemo(() => getChartData(financeData), [financeData]);
  const yAxis = useMemo(() => calculateYAxisValues(chartData), [chartData]);

  return (
    <ChartContainer id="result" className="h-full w-full" style={{ aspectRatio }}>
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
          tickMargin={8}
          tickFormatter={(value: Date) => (showXAxisValues ? formatDate(value) : "")}
        />
        <YAxis domain={[yAxis.min, yAxis.max]} ticks={yAxis.ticks} />
        <Tooltip cursor={false} content={<ChartTooltip />} />
        <Line dataKey="result" type="monotone" stroke={chartConfig.result.color} strokeWidth={2} dot={false} />
        <Line dataKey="liquidity" type="monotone" stroke={chartConfig.liquidity.color} strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  );
}
