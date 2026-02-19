import { Outlet, useSearchParams } from "react-router-dom";
import WorldMap from "../map/WorldMap";
import BottomSheet from "../ui/BottomSheet";
import Logo from "../ui/Logo";

function HomePage() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className="h-svh w-screen overflow-hidden relative">
      <Logo className="absolute top-5 left-5 z-1000" />
      <WorldMap />
      <BottomSheet key={`${lat || ""}-${lng || ""}`}>
        <Outlet />
      </BottomSheet>
    </div>
  );
}

export default HomePage;
