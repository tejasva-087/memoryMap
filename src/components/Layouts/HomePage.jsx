import { Outlet } from "react-router-dom";

import Map from "../Map/Map";
import SideBar from "../Ui/SideBar";

function HomePage() {
  return (
    <div className="w-screen h-screen grid grid-cols-[400px_1fr] bg-zinc-900 transition-all duration-300">
      <SideBar />
      <Map />
      <Outlet />
    </div>
  );
}

export default HomePage;
