import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";

import { useTrip } from "../../context/tripContext";

import TripHeader from "../viewTrip/TripHeader";
import TripMeta from "../viewTrip/TripMeta";
import ImageGallery from "../ui/ImageGallery";

function ViewTrip() {
  const { id } = useParams();
  const { trips } = useTrip();
  const navigate = useNavigate();

  const trip = useMemo(() => {
    return trips.find((t) => String(t.id) === String(id));
  }, [trips, id]);

  if (!trip) {
    navigate("/");
    return null;
  }

  const { countryName, stateName, flag, date, duration, description, images } =
    trip;

  return (
    <aside className="h-full w-full p-5 max-[425px]:p-0">
      <div className="bg-zinc-50 dark:bg-zinc-900 h-full rounded-3xl p-8 border border-zinc-200 flex flex-col gap-4 overflow-scroll max-[425px]:h-svh max-[425px]:border-0 max-[425px]:rounded-none">
        <TripHeader
          countryName={countryName}
          stateName={stateName}
          flag={flag}
        />
        <TripMeta date={date} duration={duration} />
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed wrap-break-word">
          {description}
        </p>
        <ImageGallery images={images} countryName={countryName} />
      </div>
    </aside>
  );
}

export default ViewTrip;
