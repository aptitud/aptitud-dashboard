import { Location, TrelloCard, CustomerType } from "./base-types";

export interface Customer {
    name: string;
    type: CustomerType;
    trello?: TrelloCard;
    location?: Location;
}
export interface Contract {
    customer: Customer;
    startDate: Date;
    endDate: Date;
}

export interface Employee {
    name: string;
    trello?: TrelloCard;
    location?: Location;
    contracts: Contract[];
}
