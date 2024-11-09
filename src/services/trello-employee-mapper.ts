import { Contract } from "@/types/employee-types";
import { Contract as CustomerContract } from "@/types/customer-types";
import { CustomerCard, EmployeeCard } from "./trello-types";
import { Employee } from "@/types/employee-types";
import { getCustomerType } from "./trello-customer-mapper";

export const mapToEmployee = (employeeCard: EmployeeCard, customerCards: CustomerCard[]): Employee => {
    return {
        name: employeeCard.name,
        trello: {
            id: employeeCard.id,
            url: employeeCard.shortUrl,
        },
        contracts: getEmployeeContracts(employeeCard, customerCards),
    };
};

const getEmployeeContracts = (employeeCard: EmployeeCard, customerCards: CustomerCard[]): Contract[] => {
    const result: Contract[] = [];

    customerCards.forEach((customerCard) => {
        const customerContracts = getCustomerContracts(employeeCard, customerCard);

        for (let index = 0; index < customerContracts.length; index++) {
            const customerContract = customerContracts[index];

            result.push({
                customer: {
                    name: customerCard.name,
                    type: getCustomerType(customerCard),
                    trello: {
                        id: customerCard.id,
                        url: customerCard.shortUrl,
                    },
                },
                startDate: customerContract.startDate,
                endDate: customerContract.endDate,
            });
        }
    });

    return result;
};

const getCustomerContracts = (employeeCard: EmployeeCard, customerCard: CustomerCard): CustomerContract[] => {
    const contractSeparator = "\n";
    const contractPartSeparator = " - ";

    const elements = customerCard.desc.split(contractSeparator);

    return elements
        .map((e) => {
            if (e.indexOf(contractPartSeparator) === -1) return null;

            const contractParts = e.split(contractPartSeparator);
            const employeeName = contractParts[0].trim();

            if (employeeName !== employeeCard.name) return null;

            return {
                employee: {
                    name: employeeName,
                },
                startDate: new Date(contractParts[1].trim()),
                endDate: new Date(contractParts[2].trim()),
            };
        })
        .filter((x) => x !== null);
};
