import { Outlet } from "react-router-dom";
import WorldMap from "../map/WorldMap";
import BottomSheet from "../ui/BottomSheet";
import Logo from "../ui/Logo";
import { useTrip } from "../../context/tripContext";

function HomePage() {
  const { trips } = useTrip();
  const title = trips.length > 0 ? "Your Trips" : "Add your first trip!";
  return (
    <div className="h-svh w-screen overflow-hidden relative">
      <Logo className="absolute top-5 left-5 z-1000" />
      <WorldMap />
      <BottomSheet title={title} titleStyles="text-center text-2xl font-bold">
        <Outlet />
      </BottomSheet>
    </div>
  );
}

export default HomePage;
