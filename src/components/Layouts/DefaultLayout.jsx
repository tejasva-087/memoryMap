import { Outlet } from "react-router-dom";

import Map from "../Map/Map";

function DefaultLayout() {
  return (
    <div className="w-screen h-screen grid grid-cols-[400px_1fr] bg-zinc-900">
      <Outlet />
      <Map />
    </div>
  );
}

export default DefaultLayout;
