import { useNavigate } from "react-router-dom";

import { X } from "@phosphor-icons/react";
import PlaceDetail from "../Ui/PlaceDetail";
import ViewTripMeta from "./ViewTripMeta";

function ViewTripHeader({
  countryCode,
  cityName,
  countryName,
  date,
  duration,
  rating,
}) {
  const navigate = useNavigate();

  function handleCloseView() {
    navigate("/");
  }

  return (
    <header className="flex flex-col gap-6 border-b border-zinc-500 pb-4 px-4">
      <div className="flex items-center justify-between">
        <PlaceDetail
          countryCode={countryCode}
          cityName={cityName}
          countryName={countryName}
          defaultView={false}
        />
        <button onClick={handleCloseView} className="text-2xl">
          <X />
        </button>
      </div>
      <ViewTripMeta date={date} duration={duration} rating={rating} />
    </header>
  );
}

export default ViewTripHeader;
