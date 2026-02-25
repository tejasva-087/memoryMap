import { Outlet, useSearchParams } from "react-router-dom";
import WorldMap from "../map/WorldMap";
import BottomSheet from "../ui/BottomSheet";
import Logo from "../ui/Logo";
import { useTrip } from "../../context/tripContext";

function HomePage() {
  const { isLoading } = useTrip();

  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (isLoading) {
    return (
      <div className="h-svh w-svh flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="h-svh w-screen relative">
      <Logo className="absolute top-5 left-5 z-1000" />
      <WorldMap />
      <BottomSheet key={`${lat || ""}-${lng || ""}`}>
        <Outlet />
      </BottomSheet>
    </div>
  );
}

export default HomePage;
