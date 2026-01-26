import {
  CalendarBlankIcon,
  ClockCountdownIcon,
  DotOutlineIcon,
} from "@phosphor-icons/react";

import Ratings from "../Ui/Ratings";
import InfoTag from "../Ui/InfoTag";

function TripMeta({ date, duration, rating }) {
  return (
    <div className="flex items-center gap-2">
      {/* DATE */}
      <InfoTag icon={<CalendarBlankIcon weight="fill" />} text={date} />
      <DotOutlineIcon weight="fill" />
      {/* DURATION */}
      <InfoTag icon={<ClockCountdownIcon weight="fill" />} text={duration} />
      <DotOutlineIcon weight="fill" />
      {/* RATING */}
      <Ratings rating={rating} viewOnly={false} />
    </div>
  );
}

export default TripMeta;
