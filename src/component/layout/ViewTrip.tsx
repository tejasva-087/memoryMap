import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";

import { useTrip } from "../../context/tripContext";

import TripHeader from "../viewTrip/TripHeader";
import TripMeta from "../viewTrip/TripMeta";
import ImageGallery from "../ui/ImageGallery";

function ViewTrip() {
  const { id } = useParams();
  const { trips } = useTrip();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  const trip = useMemo(() => {
    return trips.find((t) => String(t.id) === String(id));
  }, [trips, id]);

  if (isLoading) {
    return (
      <aside className="h-full w-full p-5 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 bg-zinc-900 w-full h-full rounded-3xl">
          <div className="w-12 h-12 border-4 border-zinc-700 border-t-primary rounded-full animate-spin"></div>
          <p className="text-zinc-400 animate-pulse font-medium">
            Fetching trip details...
          </p>
        </div>
      </aside>
    );
  }

  if (!trip) navigate("/");

  const { countryName, stateName, flag, date, duration, description, images } =
    trip;

  return (
    <aside className="h-full w-full p-5">
      <div className="bg-zinc-50 dark:bg-zinc-900 h-full rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-4 overflow-y-auto">
        <TripHeader
          countryName={countryName}
          stateName={stateName}
          flag={flag}
        />
        <TripMeta date={date} duration={duration} />
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {description}
        </p>
        <ImageGallery images={images} countryName={countryName} />
      </div>
    </aside>
  );
}

export default ViewTrip;
