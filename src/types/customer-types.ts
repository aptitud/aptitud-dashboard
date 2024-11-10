import { Location, TrelloCard, CustomerType } from "./base-types";

export interface Contract {
    employee: {
        name: string;
        trello?: TrelloCard;
        location?: Location;
    };
    startDate: Date;
    endDate: Date;
}

export interface Customer {
    name: string;
    type: CustomerType;
    trello?: TrelloCard;
    location?: Location;
    contracts: Contract[];
}
