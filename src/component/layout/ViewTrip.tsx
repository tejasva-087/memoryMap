import { useParams } from "react-router-dom";
import { useTrip } from "../../context/tripContext";
import type { Trip } from "../../Types/TripTypes";
import TripHeader from "../viewTrip/TripHeader";
import TripMeta from "../viewTrip/TripMeta";
import ImageGallery from "../ui/ImageGallery";
import { useEffect, useMemo, useState } from "react";
import ViewTripSkeleton from "../ui/ViewTripSkeleton";

function ViewTrip() {
  const { id } = useParams();
  const { trips } = useTrip();
  const [isLoading, setIsLoading] = useState(true);

  const trip = useMemo(() => {
    return trips.find((t) => String(t.id) === String(id));
  }, [trips, id]);
  if (!trip) return null;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300); // Small buffer for visual smoothness
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading || !trip) {
    return <ViewTripSkeleton />;
  }

  const { countryName, stateName, flag, date, duration, description, images } =
    trip;

  return (
    <aside className="h-full w-full p-5">
      <div className="bg-zinc-50 dark:bg-zinc-900 h-full rounded-3xl p-8 border border-zinc-200 flex flex-col gap-4 overflow-scroll">
        <TripHeader
          countryName={countryName}
          stateName={stateName}
          flag={flag}
        />
        <TripMeta date={date} duration={duration} />
        <p className="">{description}</p>
        <ImageGallery images={images} countryName={countryName} />
      </div>
    </aside>
  );
}

export default ViewTrip;
