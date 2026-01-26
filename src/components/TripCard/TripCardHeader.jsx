import { TrashIcon } from "@phosphor-icons/react";
import { useTrip } from "../../context/TripContext";
import { getFlag } from "../../services/geoLocation";

function TripCardHeader({ countryName, countryCode, id }) {
  const { dispatch } = useTrip();

  function handleRemoveTrip(id) {
    dispatch({ type: "trip/remove", payload: id });
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          src={getFlag(countryCode)}
          alt={`${countryName}'s flag`}
          className="w-8"
        />
        <h3 className="text-2xl">{countryName}</h3>
      </div>

      <button
        onClick={() => handleRemoveTrip(id)}
        className="cursor-pointer text-2xl"
      >
        <TrashIcon weight="fill" />
      </button>
    </div>
  );
}

export default TripCardHeader;
