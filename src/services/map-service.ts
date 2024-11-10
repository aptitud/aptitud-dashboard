import { mapToMapLocation } from "./maps-mapper";
import { getEmployeeCards, getMembers } from "./trello";
import { MapLocation } from "@/types/map-types";

export const getMapLocations = async (): Promise<MapLocation[]> => {
    const employeeCards = await getEmployeeCards();
    const members = await getMembers();

    //const mapLocations = dummyData;
    const mapLocations = (await Promise.all(employeeCards.map((card) => mapToMapLocation(card, members)))).filter((x) => !!x);
    return mapLocations;
};

const dummyData: MapLocation[] = [
    {
        pointOfInterest: {
            name: "Ann Vändare",
            avatar: {
                sm: "aptitud.png",
                md: "aptitud.png",
                lg: "aptitud.png",
            },
            type: "Employee",
            address: "Skogsvägen 11, 13549 Tyresö",
        },
        location: {
            lat: 59.2526684,
            lng: 18.2430559,
        },
    },
];
