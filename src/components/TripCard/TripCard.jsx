import {
  CalendarBlankIcon,
  ClockCountdownIcon,
  DotOutlineIcon,
} from "@phosphor-icons/react";

import TripCardHeader from "./TripCardHeader";
import InfoTag from "../Ui/InfoTag";
import TripMeta from "./TripMeta";

function TripCard({
  id,
  countryName,
  date,
  duration,
  rating,
  description,
  countryCode,
}) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-zinc-700 rounded-2xl">
      <TripCardHeader
        countryName={countryName}
        countryCode={countryCode}
        id={id}
      />
      <TripMeta date={date} duration={duration} rating={rating} />
    </div>
  );
}

export default TripCard;
