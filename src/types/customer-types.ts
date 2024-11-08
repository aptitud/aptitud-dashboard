interface TrelloCard {
    url: string;
}

interface MapLocation {
    long: string;
    lat: string;
}

export interface Customer {
    name: string;
    trello?: TrelloCard;
    map?: MapLocation;
    employees: {
        name: string;
        startDate: Date;
        endDate: Date;
    }[];
}
