import {
  CalendarDotsIcon,
  ClockIcon,
  DotOutlineIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useTrip } from "../../context/tripContext";
import MetaPreview from "../ui/MetaPreview";
import { useNavigate } from "react-router-dom";
import type { Coordinates } from "../../Types/TripTypes";

type Prop = {
  id: string;
  countryName: string;
  stateName: string;
  date: string;
  duration: string;
  flag: string;
  coordinates: Coordinates;
};

function TripBtn({
  id,
  countryName,
  stateName,
  date,
  duration,
  flag,
  coordinates,
}: Prop) {
  const { dispatch } = useTrip();
  const navigate = useNavigate();

  return (
    <li
      className="p-6 bg-zinc-800 rounded-xl flex flex-col gap-4 cursor-pointer"
      onClick={() => {
        navigate(`/view/${id}?lat=${coordinates.lat}&lng=${coordinates.lng}`);
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={flag} alt={`${countryName}'s flag`} className="w-10" />
          <h3 className="text-lg">
            {stateName}, {countryName}
          </h3>
        </div>
        <button
          className="text-xl cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: "trip/remove", payload: id });
          }}
        >
          <TrashIcon weight="fill" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <MetaPreview
          minimal={true}
          value={date}
          icon={<CalendarDotsIcon weight="fill" />}
        />
        <DotOutlineIcon weight="fill" />
        <MetaPreview
          minimal={true}
          value={duration}
          icon={<ClockIcon weight="fill" />}
        />
      </div>
    </li>
  );
}

export default TripBtn;
