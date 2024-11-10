import { EmployeeCard } from "./trello-types";
import { MapLocation } from "@/types/map-types";
import { getGeoLocation } from "./google-maps";

export const mapToMapLocation = async (employeeCard: EmployeeCard): Promise<MapLocation | undefined> => {
    const address = getAddress(employeeCard);
    if (!address) return undefined;

    const geoLocation = await getGeoLocation(address);
    if (!geoLocation) return undefined;

    return {
        pointOfInterest: {
            name: employeeCard.name,
            type: "Employee",
            address,
        },
        location: {
            lat: geoLocation.geometry.location.lat,
            lng: geoLocation.geometry.location.lng,
        },
    };
};

const getAddress = (employeeCard: EmployeeCard): string | undefined => {
    const rowSeparator = "\n";
    const addressIdentifier = "Adress: ";

    const rows = employeeCard.desc.split(rowSeparator);

    const addressRows = rows.filter((x) => x.indexOf(addressIdentifier) !== -1);

    if (addressRows.length === 0) return undefined;

    return addressRows[0].substring(addressIdentifier.length).trim();
};
