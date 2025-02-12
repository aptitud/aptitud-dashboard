import { formatDate, getMonths, Month } from "@/lib/date-helper";
import { cn } from "@/lib/utils";
import { Comment } from "@/types/base-types";
import { Contract, Customer } from "@/types/customer-types";
import { LinkOrText } from "./ui/link";
import { isContractInPeriod } from "@/lib/contract-helper";

type Employee = {
  name: string;
  trelloUrl?: string;
  comments: Comment[];
};

type ContractInformation = {
  activeContract: boolean;
  employee: Employee;
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
        <LinkOrText href={customer.trello?.url} target="_trello">
          {customer.name}
        </LinkOrText>
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
  const { activeContract, startDate, endDate, employee, numberOfMonths } = contractInformation;
  let className = `px-2 rounded-sm col-span-${numberOfMonths} `;

  if (!activeContract) {
    return (
      <div key={employee.name} className={cn(className, "bg-idle-background")} title="">
        <span></span>
      </div>
    );
  }

  className = cn(className, "text-nowrap overflow-hidden text-ellipsis bg-active-background");
  className = needAssignment ? cn(className, "bg-needassignment-background") : className;
  className = parentalLeave ? cn(className, "bg-parentalleave-background") : className;

  let title = `${employee.name} - ${formatDate(startDate, "yyyy-mm-dd")} - ${formatDate(endDate, "yyyy-mm-dd")}`;
  if (employee.comments.length > 0) {
    title += `\n${employee.comments.map((c) => `\n- ${c.text}`)}`;
  }

  const linkText = `${employee.comments.length > 0 ? "* " : ""}${employee.name}`;

  return (
    <div key={title} className={className} title={title}>
      <LinkOrText href={employee.trelloUrl} target="_trello">
        {linkText}
      </LinkOrText>
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
