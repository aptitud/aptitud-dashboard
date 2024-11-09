import { MapLocation, TrelloCard, CustomerType } from "./base-types";

export interface Contract {
    employee: {
        name: string;
        trello?: TrelloCard;
        map?: MapLocation;
    };
    startDate: Date;
    endDate: Date;
}

export interface Customer {
    name: string;
    type: CustomerType;
    trello?: TrelloCard;
    map?: MapLocation;
    contracts: Contract[];
}
