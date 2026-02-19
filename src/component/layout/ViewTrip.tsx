import { Link, useNavigate, useParams } from "react-router-dom";
import type { Trip } from "../../types/tripTypes";
import { useTrip } from "../../context/tripContext";
import { CaretLeftIcon } from "@phosphor-icons/react";
import PlaceDetails from "../ui/PlaceDetail";
import TripCardMeta from "../ui/tripCard/TripCardMeta";
import ImageCarousel from "../ui/ImageCarousel";

function ViewTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips } = useTrip();

  const trip: Trip | undefined = trips.find((trip) => trip.id === id);

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-red-500 text-center text-lg">
          We couldn't find that trip, please go back and try again.
        </p>
        <Link to="/" className="border-b border-primary pb-0.05 text-primary">
          Go back
        </Link>
      </div>
    );
  }
  const { countryName, stateName, flag, date, duration, description } = trip;

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <button
          className="text-2xl cursor-pointer focus:ring focus:ring-white-1 focus:outline-0 rounded-full p-1"
          onClick={() => navigate("/")}
        >
          <CaretLeftIcon weight="bold" />
        </button>
        <PlaceDetails
          countryName={countryName}
          stateName={stateName}
          flag={flag}
          imgStyle="w-8"
          textStyle="text-xl!"
        />
      </div>
      <div className="border-t border-b border-black-3 dark:border-white-3 py-4">
        <TripCardMeta
          date={date}
          duration={duration}
          minimal={false}
          className="flex-col items-start"
          separate={false}
        />
      </div>
      <p className="p-4">{description}</p>
      <ImageCarousel />
    </div>
  );
}

export default ViewTrip;
