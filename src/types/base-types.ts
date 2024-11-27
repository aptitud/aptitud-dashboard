export type CustomerType = "Customer" | "NeedAssignment" | "ParentalLeave";

export interface TrelloCard {
    id: string;
    url: string;
}

export interface Comment {
    id: string;
    text: string;
    date: Date;
}

export interface Location {
    lat: number;
    lng: number;
}

export interface Avatar {
    sm: string;
    md: string;
    lg: string;
}
