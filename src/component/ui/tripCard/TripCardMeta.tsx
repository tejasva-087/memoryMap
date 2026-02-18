import { CalendarDotsIcon, ClockIcon } from "@phosphor-icons/react";
import MetaData from "../MetaData";
import { DotOutlineIcon } from "@phosphor-icons/react/dist/ssr";

type TripCardMetaProp = {
  date: string;
  duration: string;
};

function TripCardMeta({ date, duration }: TripCardMetaProp) {
  return (
    <ul className="flex items-center gap-2">
      <li>
        <MetaData value={date} icon={<CalendarDotsIcon weight="fill" />} />
      </li>
      <DotOutlineIcon weight="fill" className="text-2xl" />
      <li>
        <MetaData value={duration} icon={<ClockIcon weight="fill" />} />
      </li>
    </ul>
  );
}

export default TripCardMeta;
