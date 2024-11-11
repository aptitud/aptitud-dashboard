import { Employee } from "@/types/employee-types";
import { getCustomerCards, getEmployeeCards } from "./trello";
import { mapToEmployee } from "./trello-employee-mapper";

export const getEmployees = async (): Promise<Employee[]> => {
    const customerCards = await getCustomerCards();
    const employeeCards = await getEmployeeCards();

    return employeeCards.map((card) => mapToEmployee(card, customerCards));
};
