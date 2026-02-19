import { CalendarDotsIcon, ClockIcon } from "@phosphor-icons/react";
import MetaData from "../MetaData";
import { DotOutlineIcon } from "@phosphor-icons/react/dist/ssr";

type TripCardMetaProp = {
  date: string;
  duration: string;
  minimal?: boolean;
  className?: string;
  separate?: boolean;
};

function TripCardMeta({
  date,
  duration,
  minimal = true,
  className = "",
  separate = true,
}: TripCardMetaProp) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      <li>
        <MetaData
          minimal={minimal}
          value={date}
          icon={<CalendarDotsIcon weight="fill" />}
          heading="Date"
        />
      </li>
      <DotOutlineIcon
        weight="fill"
        className={
          separate
            ? "text-2xl text-black-3 dark:text-white-3 block"
            : "text-2xl text-black-3 dark:text-white-3 hidden"
        }
      />
      <li>
        <MetaData
          minimal={minimal}
          value={duration}
          icon={<ClockIcon weight="fill" />}
          heading="Duration"
        />
      </li>
    </ul>
  );
}

export default TripCardMeta;
