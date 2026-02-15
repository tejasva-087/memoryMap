import { CalendarDotsIcon, ClockIcon } from "@phosphor-icons/react";
import MetaPreview from "../ui/MetaPreview";

type Prop = {
  date: string;
  duration: string;
};

function TripMeta({ date, duration }: Prop) {
  return (
    <ul className="flex items-center gap-4 border-b border-t border-zinc-200 dark:border-zinc-500 pb-2 max-[768px]:flex-col max-[768px]:items-start">
      <li>
        <MetaPreview
          heading="visiting date"
          value={date}
          icon={<CalendarDotsIcon weight="fill" />}
        />
      </li>
      <li>
        <MetaPreview
          heading="Trip duration"
          value={duration}
          icon={<ClockIcon weight="fill" />}
        />
      </li>
    </ul>
  );
}

export default TripMeta;
