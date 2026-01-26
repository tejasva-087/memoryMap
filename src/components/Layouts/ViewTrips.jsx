import SideBar from "../Ui/SideBar";
import Logo from "../Ui/Logo";
import { useTrip } from "../../context/TripContext";
import TripList from "../TripCard/TripList";

function ViewTrips() {
  const { trips } = useTrip();

  return (
    <SideBar className={""}>
      <Logo />
      <div className="mt-6 w-full">
        {/* IF THERE ARE NO TRIPS */}
        {trips.length === 0 ? (
          <p className="w-2/3 text-center ml-auto mr-auto text-sm text-zinc-400">
            Your map looks a little lonely. Tap anywhere on the map to begin.
          </p>
        ) : (
          <TripList />
        )}

        {/* IF THERE ARE TRIPS */}
      </div>
    </SideBar>
  );
}

export default ViewTrips;
