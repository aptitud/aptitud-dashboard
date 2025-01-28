import { FinanceChartLegend } from "@/components/finance/finance-legend";
import { FinanceResultChart } from "@/components/finance/finance-result-chart";
import { FinanceRevenueChart } from "@/components/finance/finance-revenue-chart";
import { Card, CardContent } from "@/components/ui/card";
import { getFinance } from "@/services/finance-service";

export default async function FinancePage() {
    const financeData = await getFinance();

    return (
        <Card className="relative h-full w-full rounded-lg shadow-md pt-4">
            <CardContent>
                <FinanceRevenueChart financeData={financeData} showXAxisValues={false} /> 
                <FinanceResultChart financeData={financeData} showXAxisValues={true} /> 
                <FinanceChartLegend />
            </CardContent>
        </Card>
    );
}
