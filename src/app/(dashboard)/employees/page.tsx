import { EmployeeRow } from "@/components/employee-row";
import { MonthHeader } from "@/components/month-header";
import { getEmployees } from "@/services/employee-service";

export default async function CustomersPage() {
  const currentDate = new Date();
  const employees = await getEmployees();

  return (
    <div className="grid grid-cols-customers gap-1 w-[200%] sm:w-full">
      <div></div>
      <MonthHeader currentDate={currentDate} />

      {employees.map((employee) => (
        <EmployeeRow key={employee.name} currentDate={currentDate} employee={employee} />
      ))}
    </div>
  );
}

// Force the page to be dynamic to avoid cache problems
export const dynamic = "force-dynamic";
