"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { MapLocation, PointOfIntrestType } from "@/types/map-types";

interface GoogleMapProps {
    officeMapLocation: MapLocation;
    mapLocations: MapLocation[];
    apiKey: string;
    mapId: string;
}

export function GoogleMap({ officeMapLocation, mapLocations, apiKey, mapId }: GoogleMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loader = new Loader({
            apiKey,
            version: "weekly",
            libraries: ["places"],
        });

        // Load both marker and core libraries
        Promise.all([loader.importLibrary("marker"), loader.importLibrary("core")]).then(([markerLib, coreLib]) => {
            if (!mapRef.current) return;

            const map = new google.maps.Map(mapRef.current, {
                mapId: mapId,
                center: officeMapLocation.location || { lat: 0, lng: 0 },
                zoom: 12,
            });

            // Create one InfoWindow instance to reuse
            const infoWindow = new google.maps.InfoWindow();

            // Add markers for each location
            [officeMapLocation, ...mapLocations].forEach((mapLocation) => {
                const marker = new google.maps.marker.AdvancedMarkerElement({
                    position: mapLocation.location,
                    map,
                    title: mapLocation.pointOfInterest.name,
                });

                const headerContent = getHeaderContent(mapLocation.pointOfInterest.type);
                const content = getContent(mapLocation);

                // Add click listener to marker
                marker.addListener("click", () => {
                    infoWindow.setHeaderContent(headerContent);
                    infoWindow.setContent(content);
                    infoWindow.setOptions({ minWidth: 200 });
                    infoWindow.close(); // Close any open info window
                    infoWindow.open({
                        map,
                        anchor: marker,
                    });
                });
            });

            // Close InfoWindow when clicking on the map
            map.addListener("click", () => {
                infoWindow.close();
            });
        });
    }, [officeMapLocation, mapLocations, apiKey, mapId]);

    return <div ref={mapRef} className="absolute w-full h-full rounded-lg shadow-md text-black" />;
}

const getHeaderContent = (type: PointOfIntrestType) => {
    switch (type) {
        case "Employee":
            return "Kollega";
        case "Customer":
            return "Kund";
        case "Aptitud":
            return "Kontor";
        default:
            return "";
    }
};

const getContent = (mapLocation: MapLocation) => {
    const avatar = getAvatar(mapLocation);
    const trelloLink = getTrelloLink(mapLocation);

    return `
        <div class="flex items-center gap-2">
            ${avatar}
            <div>
                <h3 class="font-bold mb-1">${mapLocation.pointOfInterest.name}</h3>
                <div class="mb-2">${mapLocation.pointOfInterest.address}</div>
                ${trelloLink}
            </div>
        </div>`;
};

const getAvatar = (mapLocation: MapLocation) => {
    if (mapLocation.pointOfInterest.avatar) {
        return `
            <img 
                src="${mapLocation.pointOfInterest.avatar?.sm}" 
                alt="${mapLocation.pointOfInterest.name}"
                class="self-start w-8 h-8 rounded-full object-cover"
            />`;
    }
    return "";
};

const getTrelloLink = (mapLocation: MapLocation) => {
    if (mapLocation.trello?.url) {
        return `
            <div class="flex justify-end">
                <a 
                    href="${mapLocation.trello.url}" 
                    target="_blank" 
                    class="text-blue-600 hover:text-blue-800 underline"
                >
                    Visa i Trello
                </a>
            </div>`;
    }
    return "";
};
