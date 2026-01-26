import { useTrip } from "../../context/TripContext";
import MapMarker from "./MapMarker";

function MarkerList() {
  const { trips } = useTrip();

  return (
    <>
      {trips.map((trip) => {
        return <MapMarker trip={trip} key={trip.id} />;
      })}
    </>
  );
}

export default MarkerList;
