import { GoogleMap } from "@/components/map/google-map";
import { googleConfig } from "@/configs/google-config";
import { getMapLocations } from "@/services/map-service";

export default async function MapsPage() {
    const mapLocations = await getMapLocations();

    return <GoogleMap mapCenter={mapLocations[0].location} mapLocations={mapLocations} apiKey={googleConfig.ApiKey} mapId={googleConfig.MapId} />;
}
