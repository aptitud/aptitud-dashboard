export type CustomerType = "Customer" | "NeedAssignment" | "ParentalLeave";

export interface TrelloCard {
    id: string;
    url: string;
}

export interface Location {
    lat: number;
    lng: number;
}
