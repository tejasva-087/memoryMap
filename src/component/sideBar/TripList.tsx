import { useTrip } from "../../context/tripContext";
import type { Trip } from "../../Types/TripTypes";
import TripBtn from "./TripBtn";

function TripList() {
  const { trips } = useTrip();

  return (
    <ul className="flex flex-col gap-4">
      {trips.map((trip: Trip) => (
        <TripBtn
          key={trip.id}
          id={trip.id}
          countryName={trip.countryName}
          stateName={trip.stateName}
          date={trip.date}
          duration={trip.duration}
          flag={trip.flag}
        />
      ))}
    </ul>
  );
}

export default TripList;
