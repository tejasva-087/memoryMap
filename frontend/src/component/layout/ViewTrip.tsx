import { Link, useNavigate, useParams } from "react-router-dom";
import type { Trip } from "../../types/tripTypes";
import { useTrip } from "../../context/tripContext";
import { CaretLeftIcon } from "@phosphor-icons/react";
import PlaceDetails from "../ui/PlaceDetail";
import TripCardMeta from "../ui/tripCard/TripCardMeta";
import ImageGallery from "../ui/ImageGallery";

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
  const { countryName, placeName, flag, date, duration, description, images } =
    trip;

  return (
    <div className="">
      <div className="flex items-center gap-2 mb-6">
        <button
          className="text-2xl cursor-pointer focus:ring focus:ring-white-1 focus:outline-0 rounded-full p-1"
          onClick={() => navigate("/")}
        >
          <CaretLeftIcon weight="bold" />
        </button>
        <PlaceDetails
          countryName={countryName}
          placeName={placeName}
          flag={flag}
          imgStyle="w-8"
          textStyle="text-xl!"
        />
      </div>
      <div className="border-t border-b border-white-3 dark:border-black-3 px-2 py-2">
        <TripCardMeta
          date={date}
          duration={duration}
          minimal={false}
          className="flex items-start flex-col sm:flex-row sm:gap-4"
          separate={false}
        />
      </div>
      <p className="p-4">{description}</p>

      <ImageGallery images={images} />
    </div>
  );
}

export default ViewTrip;
