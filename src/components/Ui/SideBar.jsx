import { useTrip } from "../../context/TripContext";
import Logo from "./Logo";
import TripList from "../TripCard/TripList";

function SideBar() {
  const trips = useTrip();
  return (
    <aside
      className={`bg-zinc-800 text-zinc-100 p-6 flex items-center flex-col`}
    >
      <Logo />
      <div className="mt-6 w-fu">
        {trips.length === 0 ? (
          // IF THERE ARE NO TRIPS
          <p className="w-2/3 text-center ml-auto mr-auto text-sm text-zinc-400">
            Your map looks a little lonely. Tap anywhere on the map to begin.
          </p>
        ) : (
          // IF THERE ARE TRIPS
          <TripList />
        )}
      </div>
    </aside>
  );
}

export default SideBar;
