import { FinanceChartContainer } from "@/components/finance/finance-chart-container";
import { getFinance } from "@/services/finance-service";

export default async function FinancePage() {
    const finance = await getFinance();

    return (
        <div className="w-full h-full rounded-lg shadow-md text-black">
            <FinanceChartContainer financeData={finance} />
        </div>
    );
}
