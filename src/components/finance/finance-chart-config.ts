import { ChartConfig } from "../ui/chart";

export const chartConfig = {
    revenue: {
        label: "Omsättning",
        color: "hsl(var(--chart-revenue))",
    },
    result: {
        label: "Resultat",
        color: "hsl(var(--chart-result))",
    },
    liquidity: {
        label: "Likviditet",
        color: "hsl(var(--chart-liquidity))",
    },
    employees: {
        label: "Antal anställda",
        color: "hsl(var(--chart-employees))",
    },
} satisfies ChartConfig;
