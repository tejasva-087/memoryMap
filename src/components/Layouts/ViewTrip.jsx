import { useParams } from "react-router-dom";

import ViewTripHeader from "../ViewTrip/ViewTripHeader";
import TripMeta from "../TripCard/TripMeta";
import { useTrip } from "../../context/TripContext";
import PlaceDetail from "../Ui/PlaceDetail";

function ViewTrip() {
  const { id } = useParams();

  const { trips } = useTrip();
  const {
    countryCode,
    cityName,
    countryName,
    date,
    duration,
    rating,
    description,
  } = trips.filter((trip) => {
    return id === trip.id;
  })[0];

  return (
    <div
      className="absolute top-0 h-screen w-150 bg-zinc-800 text-zinc-50 p-12 flex flex-col gap-6 side-bar-animate overflow-y-scroll"
      style={{ zIndex: 999 }}
    >
      <ViewTripHeader
        countryCode={countryCode}
        cityName={cityName}
        countryName={countryName}
        date={date}
        duration={duration}
        rating={rating}
      />
      <p className="whitespace-normal border-b border-zinc-500 pb-4">
        {description}
      </p>
    </div>
  );
}

export default ViewTrip;
