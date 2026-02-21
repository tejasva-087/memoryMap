import { useNavigate } from "react-router-dom";
import TripCardHeader from "./TripCardHeader";
import TripCardMeta from "./TripCardMeta";
import type { Coordinates } from "../../../types/tripTypes";

type TripCardProp = {
  date: string;
  duration: string;
  countryName: string;
  stateName: string;
  flag: string;
  id: string;
  coordinates: Coordinates;
};

function TripCard({
  date,
  duration,
  countryName,
  stateName,
  flag,
  id,
  coordinates,
}: TripCardProp) {
  const navigate = useNavigate();

  return (
    <li
      className="bg-white-2 dark:bg-black-2 p-4 rounded-lg shadow-md flex flex-col gap-4 cursor-pointer focus:ring focus:ring-white-1 focus:outline-0"
      onClick={() =>
        navigate(`/view/${id}?lat=${coordinates.lat}&lng=${coordinates.lng}`)
      }
    >
      <TripCardHeader
        countryName={countryName}
        stateName={stateName}
        flag={flag}
        id={id}
      />
      <TripCardMeta
        date={date}
        duration={duration}
        className="flex items-start"
      />
    </li>
  );
}

export default TripCard;
