export type CustomerType = "Customer" | "NeedAssignment" | "ParentalLeave";

interface TrelloCard {
    id: string;
    url: string;
}

interface MapLocation {
    long: string;
    lat: string;
}

export interface Contract {
    consultant: {
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
