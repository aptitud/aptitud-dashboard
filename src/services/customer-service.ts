import { Customer } from "@/types/customer-types";
import { getCustomerCards, getEmployeeCards } from "./trello";
import { mapToCustomer } from "./trello-customer-mapper";

export const getCustomers = async (): Promise<Customer[]> => {
    const customerCards = await getCustomerCards();
    const employeeCards = await getEmployeeCards();

    return customerCards.map((card) => mapToCustomer(card, employeeCards));
};
