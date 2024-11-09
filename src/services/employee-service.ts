import { Employee } from "@/types/employee-types";
import { getCustomerCards, getEmployeeCards } from "./trello";
import { mapToEmployee } from "./trello-employee-mapper";

export const getEmployees = async (): Promise<Employee[]> => {
    const customerCards = await getCustomerCards();
    const employeeCards = await getEmployeeCards();

    const employees = employeeCards.map((card) => mapToEmployee(card, customerCards));
    return employees;
};

const dummyData: Employee[] = [
    {
        name: "Ann Vändare",
        trello: {
            id: "123",
            url: "todo",
        },
        contracts: [
            {
                customer: {
                    name: "The Company",
                    type: "Customer",
                    trello: {
                        id: "121212",
                        url: "",
                    },
                },
                startDate: new Date("2025-01-13"),
                endDate: new Date("2025-03-05"),
            },
            {
                customer: {
                    name: "Another Comnpany",
                    type: "ParentalLeave",
                },
                startDate: new Date("2025-05-13"),
                endDate: new Date("2025-08-25"),
            },
        ],
    },
];
