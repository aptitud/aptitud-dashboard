import { MapLocation, TrelloCard, CustomerType } from "./base-types";

export interface Customer {
    name: string;
    type: CustomerType;
    trello?: TrelloCard;
    map?: MapLocation;
}
export interface Contract {
    customer: Customer;
    startDate: Date;
    endDate: Date;
}

export interface Employee {
    name: string;
    trello?: TrelloCard;
    map?: MapLocation;
    contracts: Contract[];
}
