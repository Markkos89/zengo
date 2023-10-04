// import { useProposalsContextState } from "@/contexts/ProposalsContext";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  type Libraries,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";

interface IMapProps {
  lat?: number;
  lng?: number;
}

const MAPLIBRARIES: Libraries = ["places"];

const Map: React.FC<IMapProps> = ({ lat = 20.587834, lng = -100.389245 }) => {
  // const {
  //   location: { gMapsLocationObject },
  // } = useProposalsContextState();

  const libraries = useMemo(() => ["places"], []);

  const mapCenter = useMemo(
    () => ({
      lat,
      lng,
    }),
    [lat, lng]
  );

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
    libraries: MAPLIBRARIES,
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
