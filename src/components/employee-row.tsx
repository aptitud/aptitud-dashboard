import { cn } from "@/lib/utils";
import Link from "next/link";
import { Contract, Customer, Employee } from "@/types/employee-types";
import { CustomerType } from "@/types/base-types";
import { getMonths, Month } from "@/lib/date-helper";

type ContractInformation = {
    customer?: {
        name: string;
        type: CustomerType;
        trelloUrl?: string;
    };
    numberOfMonths: number;
    startDate?: Date;
    endDate?: Date;
};

type Props = {
    employee: Employee;
    currentDate: Date;
};

export function EmployeeRow({ employee, currentDate }: Props) {
    const months = getMonths(currentDate, 12);
    const firstDateInPeriod = months[0].from;
    const lastDateInPeriod = months[months.length - 1].to;

    const contracts = employee.contracts.filter((contract) => isContractInPeriod(contract, firstDateInPeriod, lastDateInPeriod)).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    const contractInformations = getContractInformations(contracts, months);

    return (
        <>
            <div className={`p-1 text-ellipsis text-nowrap`}>
                {employee.trello?.url ? (
                    <Link href={employee.trello?.url} target="_trello">
                        {employee.name}
                    </Link>
                ) : (
                    <span>{employee.name}</span>
                )}
            </div>
            {contractInformations.map((contractInformation, index) => (
                <ContractInformationComponent key={`${contractInformation.customer?.name}-${index}`} contractInformation={contractInformation} />
            ))}
        </>
    );
}

type ContractInformationProps = {
    contractInformation: ContractInformation;
};

const ContractInformationComponent = ({ contractInformation }: ContractInformationProps) => {
    let className = `p-1 rounded-sm col-span-${contractInformation.numberOfMonths} `;
    className = !!contractInformation.customer ? cn(className, "text-nowrap overflow-hidden text-ellipsis bg-active-background") : cn(className, "bg-idle-background");

    className = contractInformation.customer?.type === "NeedAssignment" ? cn(className, "bg-needassignment-background") : className;
    className = contractInformation.customer?.type === "ParentalLeave" ? cn(className, "bg-parentalleave-background") : className;

    const title = contractInformation.customer
        ? `${contractInformation.customer.name} - ${contractInformation.startDate?.toLocaleDateString()} - ${contractInformation.endDate?.toLocaleDateString()}`
        : undefined;

    return (
        <div className={className} title={title}>
            {contractInformation.customer ? (
                contractInformation.customer.trelloUrl ? (
                    <Link href={contractInformation.customer.trelloUrl} target="_trello">
                        {contractInformation.customer.name}
                    </Link>
                ) : (
                    <span>{contractInformation.customer.name}</span>
                )
            ) : (
                <span></span>
            )}
        </div>
    );
};

const getContractInformations = (contracts: Contract[], months: Month[]): ContractInformation[] => {
    const result: ContractInformation[] = [];

    let monthOffest = 0;
    for (let index = 0; index < contracts.length; index++) {
        const contract = contracts[index];

        const unassignedContractInformation = getUnassignedContractInformation(contract, months, monthOffest);
        if (unassignedContractInformation) {
            result.push(unassignedContractInformation);
            monthOffest += unassignedContractInformation.numberOfMonths;
        }

        const contractInformation = getContractInformation(contract, months, monthOffest);
        result.push(contractInformation);
        monthOffest += contractInformation.numberOfMonths;

        if (monthOffest >= months.length) break;
    }

    if (monthOffest < months.length) {
        result.push({
            numberOfMonths: months.length - monthOffest,
        });
    }
    return result;
};

const getUnassignedContractInformation = (contract: Contract, months: Month[], monthOffest: number): ContractInformation | undefined => {
    const currentMonths = [...months.slice(monthOffest)];
    let numberOfMonthBeforeContract = 0;

    for (let index = 0; index < currentMonths.length; index++) {
        const month = currentMonths[index];

        if (isContractInPeriod(contract, month.from, month.to)) break;
        numberOfMonthBeforeContract++;
    }

    return numberOfMonthBeforeContract > 0 ? { numberOfMonths: numberOfMonthBeforeContract } : undefined;
};

const getContractInformation = (contract: Contract, months: Month[], monthOffest: number): ContractInformation => {
    const currentMonths = [...months.slice(monthOffest)];
    const customer: Customer | undefined = isContractInPeriod(contract, currentMonths[0].from, currentMonths[0].to) ? contract.customer : undefined;
    let numberOfMonths = 1;

    for (let index = 1; index < currentMonths.length; index++) {
        const currentMonth = currentMonths[index];

        if (!isContractInPeriod(contract, currentMonth.from, currentMonth.to) && !!customer) {
            return {
                customer: {
                    name: customer.name,
                    type: customer.type,
                    trelloUrl: customer.trello?.url,
                },
                numberOfMonths,
                startDate: contract.startDate,
                endDate: contract.endDate,
            };
        }

        if (isContractInPeriod(contract, currentMonth.from, currentMonth.to) && !customer) {
            return {
                numberOfMonths,
            };
        }

        if (isContractInPeriod(contract, currentMonth.from, currentMonth.to) && contract.customer.name !== customer?.name) {
            return {
                customer,
                numberOfMonths,
                startDate: contract.startDate,
                endDate: contract.endDate,
            };
        }

        numberOfMonths++;
    }

    return {
        customer,
        numberOfMonths,
        startDate: contract.startDate,
        endDate: contract.endDate,
    };
};

const isContractInPeriod = (contract: Contract, periodStart: Date, periodEnd: Date) => {
    return (contract.startDate <= periodStart && contract.endDate >= periodStart) || (contract.startDate >= periodStart && contract.startDate <= periodEnd);
};
