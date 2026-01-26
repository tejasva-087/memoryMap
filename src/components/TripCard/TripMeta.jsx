import {
  CalendarBlankIcon,
  ClockCountdownIcon,
  DotOutlineIcon,
} from "@phosphor-icons/react";

import InfoTag from "../Ui/InfoTag";
import Ratings from "../Ui/Ratings";

function TripMeta({ date, duration, rating }) {
  return (
    <div className="flex items-center gap-2">
      <InfoTag icon={<CalendarBlankIcon weight="fill" />} text={date} />
      <DotOutlineIcon weight="fill" />
      <InfoTag icon={<ClockCountdownIcon weight="fill" />} text={duration} />
      <DotOutlineIcon weight="fill" />
      <Ratings rating={rating} />
    </div>
  );
}

export default TripMeta;
