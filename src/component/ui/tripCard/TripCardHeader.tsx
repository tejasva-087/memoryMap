import { TrashIcon } from "@phosphor-icons/react";
import PlaceDetails from "../PlaceDetail";
import { useTrip } from "../../../context/tripContext";

type TripCardHeaderProp = {
  countryName: string;
  placeName: string;
  flag: string;
  id: string;
};

function TripCardHeader({
  countryName,
  placeName,
  flag,
  id,
}: TripCardHeaderProp) {
  const { removeTrip } = useTrip();

  return (
    <div className="flex items-center justify-between">
      <PlaceDetails
        countryName={countryName}
        placeName={placeName}
        flag={flag}
      />
      <button
        className="text-2xl text-black-3 dark:text-white-3"
        onClick={(e) => {
          e.stopPropagation();
          removeTrip(id);
        }}
      >
        <TrashIcon weight="fill" />
      </button>
    </div>
  );
}

export default TripCardHeader;
