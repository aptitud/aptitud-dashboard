export type CustomerType = "Customer" | "NeedAssignment" | "ParentalLeave";

export interface TrelloCard {
    id: string;
    url: string;
}

export interface MapLocation {
    long: string;
    lat: string;
}
