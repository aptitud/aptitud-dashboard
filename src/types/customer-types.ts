interface TrelloCard {
    url: string;
}

interface MapLocation {
    long: string;
    lat: string;
}

export interface Contract {
    consultant: string;
    startDate: Date;
    endDate: Date;
}

export interface Customer {
    name: string;
    trello?: TrelloCard;
    map?: MapLocation;
    contracts: Contract[];
}
