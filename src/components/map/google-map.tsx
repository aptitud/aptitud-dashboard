"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { MapLocation } from "@/types/map-types";
import { Location } from "@/types/base-types";

interface GoogleMapProps {
    mapCenter: Location;
    mapLocations: MapLocation[];
    apiKey: string;
    mapId: string;
}

export function GoogleMap({ mapCenter, mapLocations, apiKey, mapId }: GoogleMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const loader = new Loader({
            apiKey,
            version: "weekly",
            libraries: ["places"],
        });

        loader.importLibrary("marker").then(() => {
            if (!mapRef.current) return;

            const map = new google.maps.Map(mapRef.current, {
                mapId: mapId,
                center: mapCenter || { lat: 0, lng: 0 },
                zoom: 12,
            });

            // Add markers for each location
            mapLocations.forEach((mapLocation) => {
                new google.maps.marker.AdvancedMarkerElement({
                    position: mapLocation.location,
                    map,
                    title: mapLocation.pointOfInterest.name,
                });
            });
        });
    }, [mapCenter, mapLocations, apiKey, mapId]);

    return <div ref={mapRef} className="absolute w-full h-full rounded-lg shadow-md" />;
}
