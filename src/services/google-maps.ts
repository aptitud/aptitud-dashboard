import { googleConfig } from "@/configs/google-config";
import { GeoLocation } from "./google-types";

const fetchOptions: RequestInit = {
    headers: {
        "Content-Type": "application/json",
    },
    next: { revalidate: 3600, tags: ["google"] },
};

export const getGeoLocation = async (address: string): Promise<GeoLocation | undefined> => {
    try {
        const encodedAddress = encodeURIComponent(address);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleConfig.ApiKey}`;
        const response = await fetch(url, fetchOptions);
        if (!response.ok) throw new Error(`Could not fetch geocode for address ${address} from Google`);

        const result = await response.json();
        if (result.status !== "OK") throw new Error(`Could not fetch geocode for address ${address} from Google`);
        if (result.results.length === 0) return undefined;
        return result.results[0];
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch customer cards from Trello");
    }
};
