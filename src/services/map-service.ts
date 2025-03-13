import { mapCustomerToMapLocation, mapToMapLocation } from "./maps-mapper";
import { getCustomerCards, getEmployeeCards, getMembers } from "./trello";
import { MapLocation } from "@/types/map-types";

export const getMapLocations = async (): Promise<MapLocation[]> => {
  const customerCards = await getCustomerCards();
  const employeeCards = await getEmployeeCards();
  const members = await getMembers();

  return (
    await Promise.all([
      ...employeeCards.map((card) => mapToMapLocation(card, members)),
      ...customerCards.map((card) => mapCustomerToMapLocation(card)),
    ])
  ).filter((x) => !!x);
};
