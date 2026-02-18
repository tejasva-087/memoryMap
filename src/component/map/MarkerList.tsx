import { useTrip } from "../../context/tripContext";
import type { Trip } from "../../types/tripTypes";
import MapMarker from "./MapMarker";

function MarkerList() {
  const { trips } = useTrip();
  console.log(trips);

  return (
    <>
      {trips.map((trip: Trip) => {
        return (
          <MapMarker
            key={trip.id}
            flag={trip.flag}
            countryName={trip.countryName}
            id={trip.id}
            stateName={trip.stateName}
            coordinates={trip.coordinates}
          />
        );
      })}
    </>
  );
}

export default MarkerList;
