import { Avatar, Location, TrelloCard } from "./base-types";

export type PointOfIntrestType = "Customer" | "Employee" | "Aptitud";

export interface MapLocation {
  pointOfInterest: {
    name: string;
    avatar?: Avatar;
    type: PointOfIntrestType;
    address: string;
  };
  trello?: TrelloCard;
  location: Location;
}
