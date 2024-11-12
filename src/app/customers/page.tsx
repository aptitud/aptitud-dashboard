import { CustomerRow } from "@/components/customer-row";
import { MonthHeader } from "@/components/month-header";
import { getCustomers } from "@/services/customer-service";

export default async function CustomersPage() {
    const currentDate = new Date();
    const allcustomers = await getCustomers();

    const needAssignment = allcustomers.filter((p) => p.type === "NeedAssignment");
    const parentalLeave = allcustomers.filter((p) => p.type === "ParentalLeave");
    const customers = allcustomers.filter((p) => p.type === "Customer");

    return (
        <div className="grid grid-cols-customers gap-1">
            <div></div>
            <MonthHeader currentDate={currentDate} />

            {parentalLeave.map((customer) => (
                <CustomerRow key={customer.name} currentDate={currentDate} customer={customer} />
            ))}

            <div className="col-span-13 h-4"></div>

            {needAssignment.map((customer) => (
                <CustomerRow key={customer.name} currentDate={currentDate} customer={customer} />
            ))}

            <div className="col-span-13 h-4"></div>

            {customers.map((customer) => (
                <CustomerRow key={customer.name} currentDate={currentDate} customer={customer} />
            ))}
        </div>
    );
}
