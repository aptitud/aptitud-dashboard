import { MapLocation } from "@/types/map-types";

export const googleConfig = {
    ApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    MapId: process.env.GOOGLE_MAPS_MAP_ID as string,

    Aptitud: {
        pointOfInterest: {
            name: "Aptitud",
            avatar: {
                sm: "/aptitud.png",
                md: "/aptitud.png",
                lg: "/aptitud.png",
            },
            address: "Ferkens gränd 3, 11130 Stockholm",
            type: "Aptitud",
        },
        location: {
            lat: 59.32425079999999,
            lng: 18.074446,
        },
    } as MapLocation,
};
