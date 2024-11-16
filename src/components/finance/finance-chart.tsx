"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { FinanceRowData } from "@/types/finance-types";
import { useEffect, useState } from "react";
import { chartConfig } from "./finance-chart-config";

type Props = {
    chartData: FinanceRowData[];
    showXAxisValues: boolean;
};
export function FinanceChart({ chartData, showXAxisValues }: Props) {
    const [aspectRatio, setAspectRatio] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setAspectRatio(window.innerWidth / ((window.innerHeight - 100) / 2));
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const allValues = [...chartData.flatMap((p) => p.revenue), ...chartData.flatMap((p) => p.result), ...chartData.flatMap((p) => p.liquidity), ...chartData.flatMap((p) => p.employees)].filter(
        (p) => p !== undefined
    );

    const minValue = allValues.sort((a, b) => a - b)[0];
    const maxValue = allValues.sort((a, b) => b - a)[0];

    const startValue = Math.floor(minValue / 1000000) * 1000000;
    const endValue = Math.ceil(maxValue / 1000000) * 1000000;
    const millionValues = Array.from({ length: (endValue - startValue) / 2000000 + 1 }, (_, index) => startValue + index * 2000000);

    return (
        <ChartContainer config={chartConfig} className="h-full w-full" style={{ aspectRatio }}>
            <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value: Date) => (showXAxisValues ? value.getFullYear().toString() : "")} />
                <YAxis domain={[minValue, maxValue]} ticks={millionValues} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line dataKey="revenue" type="monotone" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
                <Line dataKey="employees" type="monotone" stroke="var(--color-employees)" strokeWidth={2} dot={false} />
                <Line dataKey="result" type="monotone" stroke="var(--color-result)" strokeWidth={2} dot={false} />
                <Line dataKey="liquidity" type="monotone" stroke="var(--color-liquidity)" strokeWidth={2} dot={false} />
            </LineChart>
        </ChartContainer>
    );
}
