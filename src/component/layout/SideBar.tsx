import { useTrip } from "../../context/tripContext";
import TripCard from "../ui/tripCard/TripCard";

function SideBar() {
  const { trips } = useTrip();
  return (
    <div className="">
      {trips.length === 0 ? (
        <p className="text-center text-black-3 dark:text-white-3 w-2/3 m-auto">
          Your map looks a little lonely. Tap anywhere on the map to begin.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trips.map((trip) => {
            return (
              <TripCard
                date={trip.date}
                duration={trip.duration}
                countryName={trip.countryName}
                stateName={trip.stateName}
                flag={trip.flag}
                id={trip.id}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SideBar;
