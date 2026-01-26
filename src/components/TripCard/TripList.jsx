import { useTrip } from "../../context/TripContext";
import TripCard from "./TripCard";
import TripCardHeader from "./TripCardHeader";
import TripMeta from "./TripMeta";

function TripList() {
  const { trips } = useTrip();

  return (
    <ul className="flex flex-col gap-4">
      {trips.map((trip) => {
        const {
          id,
          countryName,
          countryCode,
          cityName,
          date,
          duration,
          rating,
          coordinates,
        } = trip;
        return (
          <li key={trip.id}>
            {/* 1. TRIP CARD */}
            <TripCard coordinates={coordinates} id={id}>
              {/* 2. TRIP HEADER */}
              <TripCardHeader
                id={id}
                countryCode={countryCode}
                countryName={countryName}
                cityName={cityName}
              ></TripCardHeader>

              {/* 3.TRIP META */}
              <TripMeta
                date={date}
                duration={duration}
                rating={rating}
              ></TripMeta>
            </TripCard>
          </li>
        );
      })}
    </ul>
  );
}

export default TripList;
