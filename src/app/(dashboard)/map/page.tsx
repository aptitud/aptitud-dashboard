import { GoogleMap } from "@/components/map/google-map";
import { googleConfig } from "@/configs/google-config";
import { getMapLocations } from "@/services/map-service";

export default async function MapsPage() {
  const mapLocations = await getMapLocations();

  return (
    <div className="absolute w-full h-[95%]">
      <GoogleMap
        officeMapLocation={googleConfig.Aptitud}
        mapLocations={mapLocations}
        apiKey={googleConfig.ApiKey}
        mapId={googleConfig.MapId}
      />
    </div>
  );
}

// Force the page to be dynamic to avoid cache problems
export const dynamic = "force-dynamic";
