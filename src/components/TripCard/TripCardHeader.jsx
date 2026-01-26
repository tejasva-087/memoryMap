import { TrashIcon } from "@phosphor-icons/react";

import { useTrip } from "../../context/TripContext";
import PlaceDetail from "../Ui/PlaceDetail";

function TripCardHeader({ id, countryCode, countryName, cityName }) {
  const { dispatch } = useTrip();

  function handleRemoveTrip(id) {
    dispatch({ type: "trip/remove", payload: id });
  }

  return (
    <header className="flex items-center justify-between">
      <PlaceDetail
        countryCode={countryCode}
        countryName={countryName}
        cityName={cityName}
      ></PlaceDetail>

      <button onClick={() => handleRemoveTrip(id)} className="cursor-pointer">
        <TrashIcon weight="fill" />
      </button>
    </header>
  );
}

export default TripCardHeader;
