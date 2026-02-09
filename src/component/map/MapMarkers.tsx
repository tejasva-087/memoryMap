import { useTrip } from "../../context/tripContext";
import type { Trip } from "../../Types/TripTypes";
import MapMarker from "./MapMarker";

function MapMarkers() {
  const { trips } = useTrip();
  return (
    <>
      {trips.map((trip: Trip) => {
        return <MapMarker trip={trip} key={trip.id} />;
      })}
    </>
  );
}

export default MapMarkers;
