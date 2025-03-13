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
    Promise.all([loader.importLibrary("marker"), loader.importLibrary("core")]).then(() => {
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
          content: getMarkerContent(mapLocation.pointOfInterest.type),
          zIndex: mapLocation.pointOfInterest.type === "Aptitud" ? 100 : 0,
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

const getMarkerContent = (type: PointOfIntrestType) => {
  const element = document.createElement("div");

  switch (type) {
    case "Employee":
      element.innerHTML = `
        <div style="cursor: pointer; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="38" viewBox="0 0 32 44">
            <path d="M16 0C7.16 0 0 7.16 0 16c0 14.24 16 28 16 28s16-13.76 16-28C32 7.16 24.84 0 16 0z" fill="#FF3333"/>
            <path d="M16 4C9.37 4 4 9.37 4 16c0 10.68 12 21 12 21s12-10.32 12-21c0-6.63-5.37-12-12-12z" fill="#FF6666"/>
            <g transform="translate(8,8)">
              <path d="M15 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M12 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" 
                stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
          </svg>
        </div>`;
      break;

    case "Customer":
      element.innerHTML = `
          <div style="cursor: pointer; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="38" viewBox="0 0 32 44">
              <path d="M16 0C7.16 0 0 7.16 0 16c0 14.24 16 28 16 28s16-13.76 16-28C32 7.16 24.84 0 16 0z" fill="#2196F3"/>
              <path d="M16 4C9.37 4 4 9.37 4 16c0 10.68 12 21 12 21s12-10.32 12-21c0-6.63-5.37-12-12-12z" fill="#64B5F6"/>
              <g transform="translate(4,7)" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 21h18"/>
                <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
                <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/>
                <path d="M8 9h8"/>
                <path d="M8 13h8"/>
                <path d="M8 5h8"/>
              </g>
            </svg>
          </div>`;
      break;

    case "Aptitud":
      element.innerHTML = `
        <div style="cursor: pointer; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="38" viewBox="0 0 32 44">
            <path d="M16 0C7.16 0 0 7.16 0 16c0 14.24 16 28 16 28s16-13.76 16-28C32 7.16 24.84 0 16 0z" fill="#999999"/>
            <path d="M16 4C9.37 4 4 9.37 4 16c0 10.68 12 21 12 21s12-10.32 12-21c0-6.63-5.37-12-12-12z" fill="#dddddd"/>
            <image href="/aptitud.png" x="1" y="4" width="28" height="28"/>
          </svg>
        </div>`;
      break;
  }

  return element;
};

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
            <div class="flex-grow">
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
                    target="_trello" 
                    class="text-blue-600 hover:text-blue-800 underline"
                >
                    Visa i Trello
                </a>
            </div>`;
  }
  return "";
};
