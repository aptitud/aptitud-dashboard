import { mapToMapLocation } from "./maps-mapper";
import { getEmployeeCards, getMembers } from "./trello";
import { MapLocation } from "@/types/map-types";

export const getMapLocations = async (): Promise<MapLocation[]> => {
    const employeeCards = await getEmployeeCards();
    const members = await getMembers();

    return (await Promise.all(employeeCards.map((card) => mapToMapLocation(card, members)))).filter((x) => !!x);
};
