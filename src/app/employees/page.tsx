import { MonthHeader } from "@/components/month-header";

export default async function CustomersPage() {
    const currentDate = new Date();
    return (
        <div className="grid grid-cols-customers gap-1">
            <div></div>
            <MonthHeader currentDate={currentDate} />
        </div>
    );
}
