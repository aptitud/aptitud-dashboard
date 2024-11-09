import { Customer } from "@/types/customer-types";
import { getCustomerCards, getEmployeeCards } from "./trello";
import { mapToCustomer } from "./trello-customer-mapper";

export const getCustomers = async (): Promise<Customer[]> => {
    const customerCards = await getCustomerCards();
    const employeeCards = await getEmployeeCards();

    const customers = customerCards.map((card) => mapToCustomer(card, employeeCards));

    return customers;
};

const dummyData: Customer[] = [
    {
        name: "The Company",
        type: "Customer",
        trello: {
            id: "123",
            url: "todo",
        },
        contracts: [
            {
                employee: {
                    name: "Ann Vändare",
                },
                startDate: new Date("2025-01-13"),
                endDate: new Date("2025-03-05"),
            },
            {
                employee: {
                    name: "Nisse Landgren",
                },
                startDate: new Date("2021-12-13"),
                endDate: new Date("2025-04-05"),
            },
        ],
    },
];
