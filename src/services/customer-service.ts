import { Customer } from "@/types/customer-types";
import { getCustomerCards, getEmployeeCards, getMemberComments } from "./trello";
import { mapToCustomer } from "./trello-customer-mapper";

export const getCustomers = async (): Promise<Customer[]> => {
  const customerCards = await getCustomerCards();
  const employeeCards = await getEmployeeCards();

  const employeeCardIds = employeeCards.map((card) => card.id);
  const employeeComments = await getMemberComments(employeeCardIds);

  return customerCards.map((card) => mapToCustomer(card, employeeCards, employeeComments));
};
