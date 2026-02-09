import { useNavigate } from "react-router-dom";
import PlaceDetails from "../ui/PlaceDetails";
import { CaretLeftIcon } from "@phosphor-icons/react";

type Prop = {
  countryName: string;
  stateName: string;
  flag: string;
};

function TripHeader({ countryName, stateName, flag }: Prop) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 mb-4">
      <button onClick={() => navigate("/")} className="cursor-pointer">
        <CaretLeftIcon className="text-3xl" />
      </button>
      <PlaceDetails
        countryName={countryName}
        stateName={stateName}
        flag={flag}
      />
    </div>
  );
}

export default TripHeader;
