import { CustomerCard, EmployeeCard, Member } from "./trello-types";
import { MapLocation } from "@/types/map-types";
import { getGeoLocation } from "./google-maps";

export const mapToMapLocation = async (
  employeeCard: EmployeeCard,
  members: Member[],
): Promise<MapLocation | undefined> => {
  const address = getAddress(employeeCard);
  if (!address) return undefined;

  const geoLocation = await getGeoLocation(address);
  if (!geoLocation) return undefined;

  const member = members.find((x) => x.id === employeeCard.idMembers[0]);

  return {
    pointOfInterest: {
      name: employeeCard.name,
      avatar: member
        ? {
            sm: `${member.avatarUrl}/30.png`,
            md: `${member.avatarUrl}/50.png`,
            lg: `${member.avatarUrl}/170.png`,
          }
        : undefined,
      type: "Employee",
      address,
    },
    location: {
      lat: geoLocation.geometry.location.lat,
      lng: geoLocation.geometry.location.lng,
    },
    trello: {
      id: employeeCard.id,
      url: employeeCard.shortUrl,
    },
  };
};

export const mapCustomerToMapLocation = async (customerCard: CustomerCard): Promise<MapLocation | undefined> => {
  if (!customerCard.coordinates) return undefined;

  return {
    pointOfInterest: {
      name: customerCard.name,
      type: "Customer",
      address: customerCard.locationName,
    },
    location: {
      lat: customerCard.coordinates?.latitude,
      lng: customerCard.coordinates?.longitude,
    },
    trello: {
      id: customerCard.id,
      url: customerCard.shortUrl,
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
