import { getMonths, Month } from "@/lib/date-helper";
import { cn } from "@/lib/utils";
import { Comment } from "@/types/base-types";
import { Contract, Customer } from "@/types/customer-types";
import Link from "next/link";

type ContractInformation = {
  activeContract: boolean;
  employee: {
    name: string;
    trelloUrl?: string;
    comments: Comment[];
  };
  numberOfMonths: number;
  startDate?: Date;
  endDate?: Date;
};

type Props = {
  customer: Customer;
  currentDate: Date;
};

export function CustomerRow({ customer, currentDate }: Props) {
  const months = getMonths(currentDate, 12);
  const firstDateInPeriod = months[0].from;
  const lastDateInPeriod = months[months.length - 1].to;

  const contracts = customer.contracts.filter((contract) =>
    isContractInPeriod(contract, firstDateInPeriod, lastDateInPeriod),
  );

  if (contracts.length === 0) return null;

  return (
    <>
      <div className={`px-2 row-span-${contracts.length} text-ellipsis text-nowrap`}>
        {customer.trello?.url ? (
          <Link href={customer.trello?.url} target="_trello">
            {customer.name}
          </Link>
        ) : (
          <span>{customer.name}</span>
        )}
      </div>
      {contracts.map((contract) => {
        const contractInformations = getContractInformations(contract, months);
        return contractInformations.map((contractInformation, index) => (
          <ContractInformationComponent
            key={`${contractInformation.employee.name}-${index}`}
            contractInformation={contractInformation}
            needAssignment={customer.type === "NeedAssignment"}
            parentalLeave={customer.type === "ParentalLeave"}
          />
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

const ContractInformationComponent = ({
  contractInformation,
  needAssignment,
  parentalLeave,
}: ContractInformationProps) => {
  let className = `px-2 rounded-sm col-span-${contractInformation.numberOfMonths} `;
  className = contractInformation.activeContract
    ? cn(className, "text-nowrap overflow-hidden text-ellipsis bg-active-background")
    : cn(className, "bg-idle-background");

  className =
    contractInformation.activeContract && needAssignment ? cn(className, "bg-needassignment-background") : className;
  className =
    contractInformation.activeContract && parentalLeave ? cn(className, "bg-parentalleave-background") : className;

  let title = contractInformation.activeContract
    ? `${contractInformation.employee.name} - ${contractInformation.startDate?.toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })} - ${contractInformation.endDate?.toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })}`
    : "";

  title +=
    contractInformation.activeContract && contractInformation.employee.comments.length > 0
      ? `\n${contractInformation.employee.comments.map((c) => `\n- ${c.text}`)}`
      : "";

  const key = contractInformation.activeContract ? title : contractInformation.employee.name;
  return (
    <div key={key} className={className} title={title}>
      {contractInformation.activeContract ? (
        contractInformation.employee.trelloUrl ? (
          <Link href={contractInformation.employee.trelloUrl} target="_trello">
            {`${contractInformation.employee.comments.length > 0 ? "* " : ""}${contractInformation.employee.name}`}
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
  const activeContract = isContractInPeriod(contract, currentMonths[0].from, currentMonths[0].to);
  let numberOfMonths = 1;

  for (let index = 1; index < currentMonths.length; index++) {
    const currentMonth = currentMonths[index];

    if (isContractInPeriod(contract, currentMonth.from, currentMonth.to) !== activeContract) {
      return {
        activeContract,
        employee: {
          name: contract.employee.name,
          trelloUrl: contract.employee.trello?.url,
          comments: contract.employee.comments,
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
    employee: {
      name: contract.employee.name,
      trelloUrl: contract.employee.trello?.url,
      comments: contract.employee.comments,
    },
    numberOfMonths,
    startDate: activeContract ? contract.startDate : undefined,
    endDate: activeContract ? contract.endDate : undefined,
  };
};

const isContractInPeriod = (contract: Contract, periodStart: Date, periodEnd: Date) => {
  return (
    (contract.startDate <= periodStart && contract.endDate >= periodStart) ||
    (contract.startDate >= periodStart && contract.startDate <= periodEnd)
  );
};
