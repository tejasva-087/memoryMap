import { Outlet } from "react-router-dom";
import WorldMap from "../map/WorldMap";
import { useTrip } from "../../context/tripContext";

function HomePage() {
  const { isLoading } = useTrip();

  if (isLoading)
    return (
      <div className="w-screen h-svh flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );

  return (
    <main className="h-svh w-screen relative">
      <WorldMap />
      <div
        className="absolute top-0 left-0 w-130 h-full 
           max-[768px]:top-auto max-[768px]:bottom-0 
           max-[768px]:w-150 max-[768px]:h-[50vh]
           max-[425px]:h-auto
           overflow-scroll max-[425px]:w-screen transition-all duration-300"
        style={{ zIndex: 9999 }}
      >
        <Outlet />
      </div>
    </main>
  );
}

export default HomePage;
