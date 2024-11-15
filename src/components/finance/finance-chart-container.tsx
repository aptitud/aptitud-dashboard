import { FinanceData } from "@/types/finance-types";
import { ChartConfig } from "../ui/chart";
import { FinanceChart } from "./finance-chart";
import { Card, CardContent } from "../ui/card";

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

type Props = {
    financeData: FinanceData;
};

export const FinanceChartContainer = ({ financeData }: Props) => {
    const chart1Data = financeData.data.map(({ date, revenue, employees }) => ({ date, revenue, employees: employees! * 1000000 }));
    const chart2Data = financeData.data.map(({ date, result, liquidity }) => ({ date, result, liquidity }));

    return (
        <Card className="relative h-full w-full rounded-lg shadow-md text-black pt-4">
            <CardContent>
                <FinanceChart chartData={chart1Data} showXAxisValues={false} />
                <FinanceChart chartData={chart2Data} showXAxisValues={true} />
            </CardContent>
        </Card>
    );
};
