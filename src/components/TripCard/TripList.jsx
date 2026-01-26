import { useTrip } from "../../context/TripContext";
import TripCard from "./TripCard";

function TripList() {
  const { trips } = useTrip();

  console.log(trips);

  return (
    <ul className="flex flex-col gap-4">
      {trips.map((trip) => {
        return (
          <li key={trip.id}>
            <TripCard
              id={trip.id}
              countryName={trip.countryName}
              countryCode={trip.countryCode}
              date={trip.date}
              duration={trip.duration}
              ratings={trip.ratings}
              description={trip.description}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default TripList;
