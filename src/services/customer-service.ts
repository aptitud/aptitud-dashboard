import { Customer } from "@/types/customer-types";

export const getCustomers = (): Promise<Customer[]> => {
    // TODO - get data from Trello
    return new Promise((resolve) => resolve(dummyData));
};

const dummyData = [
    {
        name: "The Company",
        trello: {
            url: "todo",
        },
        contracts: [
            {
                consultant: "Ann Vändare",
                startDate: new Date("2025-01-13"),
                endDate: new Date("2025-03-05"),
            },
            {
                consultant: "Nisse Landgren",
                startDate: new Date("2021-12-13"),
                endDate: new Date("2025-04-05"),
            },
        ],
    },
];
