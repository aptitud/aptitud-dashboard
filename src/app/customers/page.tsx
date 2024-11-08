import { CustomerRow } from "@/components/customer-row";
import { MonthHeader } from "@/components/month-header";
import { getCustomers } from "@/services/customer-service";

export default async function CustomersPage() {
    const currentDate = new Date();
    const customers = await getCustomers();
    return (
        <div className="grid grid-cols-customers gap-1">
            <div></div>
            <MonthHeader currentDate={currentDate} />
            {customers.map((customer) => (
                <CustomerRow currentDate={currentDate} customer={customer} />
            ))}
        </div>
    );
}
