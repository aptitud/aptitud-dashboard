import { mapToMapLocation } from "./maps-mapper";
import { getEmployeeCards } from "./trello";
import { MapLocation } from "@/types/map-types";

export const getMapLocations = async (): Promise<MapLocation[]> => {
    const employeeCards = await getEmployeeCards();

    //const mapLocations = dummyData;
    const mapLocations = (await Promise.all(employeeCards.map((card) => mapToMapLocation(card)))).filter((x) => !!x);
    return mapLocations;
};

const dummyData: MapLocation[] = [
    {
        pointOfInterest: {
            name: "Peter Qwärnström",
            type: "Employee",
            address: "Skogsvägen 11, 13549 Tyresö",
        },
        location: {
            lat: 59.2526684,
            lng: 18.2430559,
        },
    },
];
