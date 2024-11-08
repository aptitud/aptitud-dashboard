import { Contract, Customer, CustomerType } from "@/types/customer-types";
import { CustomerCard, EmployeeCard } from "./trello-types";
import { trelloConfig } from "@/configs/trello-config";

export const mapToCustomer = (customerCard: CustomerCard, employeeCards: EmployeeCard[]): Customer => {
    return {
        name: customerCard.name,
        type: getCustomerType(customerCard),
        trello: {
            id: customerCard.id,
            url: customerCard.shortUrl,
        },
        contracts: getCustomerContracts(customerCard.desc, employeeCards),
    };
};

const getCustomerType = (customerCard: CustomerCard): CustomerType => {
    const config = trelloConfig();

    switch (customerCard.id) {
        case config.NeedAssignmentCardId:
            return "NeedAssignment";
        case config.ParentalLeaveCardId:
            return "ParentalLeave";
        default:
            return "Customer";
    }
};
const getCustomerContracts = (description: string, employeeCards: EmployeeCard[]): Contract[] => {
    const contractSeparator = "\n";
    const contractPartSeparator = " - ";

    const elements = description.split(contractSeparator);

    return elements
        .map((e) => {
            if (e.indexOf(contractPartSeparator) === -1) return null;

            const contractParts = e.split(contractPartSeparator);
            const consultant = contractParts[0].trim();
            const employeeCard = employeeCards?.find((x) => x.name === consultant);

            return {
                consultant: {
                    name: contractParts[0].trim(),
                    trello: employeeCard
                        ? {
                              id: employeeCard.id,
                              url: employeeCard.shortUrl,
                          }
                        : undefined,
                },
                startDate: new Date(contractParts[1].trim()),
                endDate: new Date(contractParts[2].trim()),
            };
        })
        .filter((x) => x !== null);
};
