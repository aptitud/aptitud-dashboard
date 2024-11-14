import { getFinance } from "@/services/finance-service";

export default async function FinancePage() {
    const currentDate = new Date();
    const finance = await getFinance();

    return (
        <div className="grid grid-cols-customers gap-1">
            <h3>Finance</h3>
            <pre>{JSON.stringify(finance, null, 2)}</pre>
        </div>
    );
}
