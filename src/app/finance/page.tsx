import { FinanceChart } from "@/components/finance/finance-chart";
import { FinanceChartLegend } from "@/components/finance/finance-legend";
import { Card, CardContent } from "@/components/ui/card";
import { getFinance } from "@/services/finance-service";

export default async function FinancePage() {
    const financeData = await getFinance();

    const chart1Data = financeData.data.map(({ date, revenue, employees }) => ({ date, revenue, employees: employees! * 1000000 }));
    const chart2Data = financeData.data.map(({ date, result, liquidity }) => ({ date, result, liquidity }));

    return (
        <Card className="relative h-full w-full rounded-lg shadow-md pt-4">
            <CardContent>
                <FinanceChart chartData={chart1Data} showXAxisValues={false} />
                <FinanceChart chartData={chart2Data} showXAxisValues={true} />
                <FinanceChartLegend />
            </CardContent>
        </Card>
    );
}
