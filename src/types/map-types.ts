import { Location } from "./base-types";

type PointOfIntrestType = "Customer" | "Employee" | "Aptitud";

export interface MapLocation {
    pointOfInterest: {
        name: string;
        type: PointOfIntrestType;
        address: string;
    };
    location: Location;
}
