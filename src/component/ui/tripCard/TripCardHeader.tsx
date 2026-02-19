import { TrashIcon } from "@phosphor-icons/react";
import PlaceDetails from "../PlaceDetail";
import { useTrip } from "../../../context/tripContext";

type TripCardHeaderProp = {
  countryName: string;
  stateName: string;
  flag: string;
  id: string;
};

function TripCardHeader({
  countryName,
  stateName,
  flag,
  id,
}: TripCardHeaderProp) {
  const { removeTrip } = useTrip();

  return (
    <div className="flex items-center justify-between">
      <PlaceDetails
        countryName={countryName}
        stateName={stateName}
        flag={flag}
      />
      <button
        className="text-2xl text-black-3 dark:text-white-3"
        onClick={() => removeTrip(id)}
      >
        <TrashIcon weight="fill" />
      </button>
    </div>
  );
}

export default TripCardHeader;
