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
  return financeData.data.map(({ date, revenue, employees }) => ({ date, revenue, employees: employees! * 1000000 }));
}

function ChartTooltip({ active, payload } : TooltipProps<ValueType, NameType>): ReactNode {
    if (active && payload && payload.length) {
        const data = payload[0].payload as FinanceRowData;
        return (
            <ChartTooltipContainer>
                <ChartTooltipItem label={formatDate(data.date)} />
                <ChartTooltipItem color={chartConfig.revenue.color} label={`${chartConfig.revenue.label}:`} value={formatNumber(data.revenue)} />
                <ChartTooltipItem color={chartConfig.employees.color} label={`${chartConfig.employees.label}:`} value={data.employees! / 1000000} />
            </ChartTooltipContainer>
        );
    }

    return null;
}

type FinanceRevenueChartProps = {
    financeData: FinanceData;
    showXAxisValues: boolean;
};

export function FinanceRevenueChart({ financeData, showXAxisValues }: FinanceRevenueChartProps) {
    const aspectRatio = useAspectRatio();
    const chartData = useMemo(() => getChartData(financeData), [financeData]);
    const yAxis = useMemo(() => calculateYAxisValues(chartData), [chartData]);

    return (
        <ChartContainer id="revenue" className="h-full w-full" style={{ aspectRatio }}>
            <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value: Date) => (showXAxisValues ? formatDate(value) : "")} />
                <YAxis domain={[yAxis.min, yAxis.max]} ticks={yAxis.ticks} />
                <Tooltip cursor={false} content={<ChartTooltip />} />
                <Line dataKey="revenue" type="monotone" stroke={chartConfig.revenue.color} strokeWidth={2} dot={false} />
                <Line dataKey="employees" type="monotone" stroke={chartConfig.employees.color} strokeWidth={2} dot={false} />
            </LineChart>
        </ChartContainer>
    );
}