import { cn } from "@/lib/utils";
import { Contract, Customer } from "@/types/customer-types";

type ContractInformation = {
    activeContract: boolean;
    consultant: string;
    numberOfMonths: number;
    startDate?: Date;
    endDate?: Date;
};

type Month = {
    from: Date;
    to: Date;
};

type Props = {
    customer: Customer;
    currentDate: Date;
};

export function CustomerRow({ customer, currentDate }: Props) {
    let months = getMonths(currentDate, 12);
    const firstDateInPeriod = months[0].from;
    const lastDateInPeriod = months[months.length - 1].to;

    const contracts = customer.contracts.filter((contract) => isContractInPeriod(contract, firstDateInPeriod, lastDateInPeriod));

    return (
        <>
            <div className={`p-2 row-span-${contracts.length} text-ellipsis text-nowrap`}>{customer.name}</div>
            {contracts.map((contract) => {
                const contractInformations = getContractInformations(contract, months);
                return contractInformations.map((contractInformation) => <ContractInformationComponent contractInformation={contractInformation} />);
            })}
        </>
    );
}

type ContractInformationProps = {
    contractInformation: ContractInformation;
};

const ContractInformationComponent = ({ contractInformation }: ContractInformationProps) => {
    let className = `p-2 rounded-sm col-span-${contractInformation.numberOfMonths} `;
    className = contractInformation.activeContract ? cn(className, "text-nowrap overflow-hidden text-ellipsis bg-green-700") : cn(className, "bg-slate-700");

    const title = contractInformation.activeContract
        ? `${contractInformation.consultant} - ${contractInformation.startDate?.toLocaleDateString()} - ${contractInformation.endDate?.toLocaleDateString()}`
        : undefined;

    const key = contractInformation.activeContract ? title : contractInformation.consultant;
    return (
        <div key={key} className={className} title={title}>
            {contractInformation.activeContract ? contractInformation.consultant : ""}
        </div>
    );
};

const getContractInformations = (contract: Contract, months: Month[]): ContractInformation[] => {
    const result: ContractInformation[] = [];
    let offset = 0;

    while (offset < months.length) {
        const contractInformation = getContractInformation(contract, months, offset);
        result.push(contractInformation);
        offset += contractInformation.numberOfMonths;
    }

    return result;
};

const getContractInformation = (contract: Contract, months: Month[], monthOffest: number): ContractInformation => {
    const currentMonths = [...months.slice(monthOffest)];

    let activeContract = isContractInPeriod(contract, currentMonths[0].from, currentMonths[0].to);
    let numberOfMonths = 1;

    for (let index = 1; index < currentMonths.length; index++) {
        const currentMonth = currentMonths[index];

        if (isContractInPeriod(contract, currentMonth.from, currentMonth.to) !== activeContract) {
            return {
                activeContract,
                consultant: contract.consultant,
                numberOfMonths,
                startDate: activeContract ? contract.startDate : undefined,
                endDate: activeContract ? contract.endDate : undefined,
            };
        }

        numberOfMonths++;
    }

    return {
        activeContract,
        consultant: contract.consultant,
        numberOfMonths,
    };
};

const isContractInPeriod = (contract: Contract, periodStart: Date, periodEnd: Date) => {
    return (contract.startDate <= periodStart && contract.endDate >= periodStart) || (contract.startDate >= periodStart && contract.startDate <= periodEnd);
};

const getMonths = (date: Date, numberOfMonth: number): Month[] => {
    let months = new Array<Month>(numberOfMonth);

    for (let index = 0; index < numberOfMonth; index++) {
        months[index] = {
            from: getFirstDateInMonth(date, index),
            to: getLastDateInMonth(date, index),
        };
    }
    return months;
};

const getFirstDateInMonth = (date: Date, monthOffset: number) => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    return new Date(Date.UTC(year, month + monthOffset, 1));
};

const getLastDateInMonth = (date: Date, monthOffset: number) => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    return new Date(Date.UTC(year, month + 1 + monthOffset, 0));
};
