import { Outlet } from "react-router-dom";
import WorldMap from "../map/WorldMap";

function HomePage() {
  return (
    <main className="h-svh w-screen relative">
      <WorldMap />
      <div
        className="absolute top-0 left-0 w-130 h-full"
        style={{ zIndex: 9999 }}
      >
        <Outlet />
      </div>
    </main>
  );
}

export default HomePage;
