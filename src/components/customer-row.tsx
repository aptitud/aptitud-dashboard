import { cn } from "@/lib/utils";
import { Contract, Customer } from "@/types/customer-types";
import { Button } from "./ui/button";
import Link from "next/link";

type ContractInformation = {
    activeContract: boolean;
    consultant: {
        name: string;
        trelloUrl?: string;
    };
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

    if (contracts.length === 0) return null;

    return (
        <>
            <div className={`p-2 row-span-${contracts.length} text-ellipsis text-nowrap`}>
                {customer.trello?.url ? (
                    <Link href={customer.trello?.url} target="_blank">
                        {customer.name}
                    </Link>
                ) : (
                    <span>{customer.name}</span>
                )}
            </div>
            {contracts.map((contract) => {
                const contractInformations = getContractInformations(contract, months);
                return contractInformations.map((contractInformation) => (
                    <ContractInformationComponent contractInformation={contractInformation} needAssignment={customer.type === "NeedAssignment"} parentalLeave={customer.type === "ParentalLeave"} />
                ));
            })}
        </>
    );
}

type ContractInformationProps = {
    contractInformation: ContractInformation;
    needAssignment?: boolean;
    parentalLeave?: boolean;
};

const ContractInformationComponent = ({ contractInformation, needAssignment, parentalLeave }: ContractInformationProps) => {
    let className = `p-2 rounded-sm col-span-${contractInformation.numberOfMonths} `;
    className = contractInformation.activeContract ? cn(className, "text-nowrap overflow-hidden text-ellipsis bg-green-700") : cn(className, "bg-slate-700");

    className = contractInformation.activeContract && needAssignment ? cn(className, "bg-red-700") : className;
    className = contractInformation.activeContract && parentalLeave ? cn(className, "bg-yellow-700") : className;

    const title = contractInformation.activeContract
        ? `${contractInformation.consultant} - ${contractInformation.startDate?.toLocaleDateString()} - ${contractInformation.endDate?.toLocaleDateString()}`
        : undefined;

    const key = contractInformation.activeContract ? title : contractInformation.consultant.name;
    return (
        <div key={key} className={className} title={title}>
            {contractInformation.activeContract ? (
                contractInformation.consultant.trelloUrl ? (
                    <Link href={contractInformation.consultant.trelloUrl} target="_blank">
                        {contractInformation.consultant.name}
                    </Link>
                ) : (
                    <span></span>
                )
            ) : (
                <span></span>
            )}
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
                consultant: {
                    name: contract.consultant.name,
                    trelloUrl: contract.consultant.trello?.url,
                },
                numberOfMonths,
                startDate: activeContract ? contract.startDate : undefined,
                endDate: activeContract ? contract.endDate : undefined,
            };
        }

        numberOfMonths++;
    }

    return {
        activeContract,
        consultant: {
            name: contract.consultant.name,
            trelloUrl: contract.consultant.trello?.url,
        },
        numberOfMonths,
        startDate: activeContract ? contract.startDate : undefined,
        endDate: activeContract ? contract.endDate : undefined,
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
