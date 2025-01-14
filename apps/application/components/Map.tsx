import { useProposalsContextState } from "@/contexts/ProposalsContext";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useMemo, useState } from "react";

const Map: React.FC = () => {
  const {
    location: { gMapsLocationObject },
  } = useProposalsContextState();

  const libraries = useMemo(() => ["places"], []);

  const mapCenter = useMemo(() => gMapsLocationObject, [gMapsLocationObject]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  // use this to manipulate the map after its been loaded.
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <GoogleMap
      options={mapOptions}
      zoom={14}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      onLoad={(map) => setMap(map)}
    >
      <MarkerF
        position={mapCenter}
        onLoad={() => console.log("Marker Loaded")}
      />
    </GoogleMap>
  );
};

export default Map;
