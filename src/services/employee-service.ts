import { Employee } from "@/types/employee-types";
import { getCustomerCards, getEmployeeCards } from "./trello";
import { mapToEmployee } from "./trello-employee-mapper";

const excludedEmloyees = ["Anders Löwenborg", "Linda Malmqvist", "Giovannie Malmqvist", "Giovannie Johanson"];

export const getEmployees = async (): Promise<Employee[]> => {
    const customerCards = await getCustomerCards();
    const employeeCards = await getEmployeeCards();

    return employeeCards.map((card) => mapToEmployee(card, customerCards)).filter((x) => excludedEmloyees.indexOf(x.name) === -1);
};
