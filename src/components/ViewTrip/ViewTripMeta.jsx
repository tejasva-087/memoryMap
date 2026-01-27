import {
  CalendarBlankIcon,
  ClockCountdownIcon,
  DotOutlineIcon,
} from "@phosphor-icons/react";
import InfoTag from "../Ui/InfoTag";
import Ratings from "../Ui/Ratings";

function ViewTripMeta({ date, duration, rating }) {
  return (
    <div className="flex items-center gap-4">
      {/* DATE */}
      <InfoTag
        defaultView={false}
        icon={<CalendarBlankIcon weight="fill" />}
        text={date}
      />
      <DotOutlineIcon weight="fill" />
      {/* DURATION */}
      <InfoTag
        defaultView={false}
        icon={<ClockCountdownIcon weight="fill" />}
        text={duration}
      />
      <DotOutlineIcon weight="fill" />
      {/* RATING */}
      <Ratings rating={rating} viewOnly={false} defaultView={false} />
    </div>
  );
}

export default ViewTripMeta;
