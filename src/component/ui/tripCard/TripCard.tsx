import TripCardHeader from "./TripCardHeader";
import TripCardMeta from "./TripCardMeta";

type TripCardProp = {
  date: string;
  duration: string;
  countryName: string;
  stateName: string;
  flag: string;
  id: string;
};

function TripCard({
  date,
  duration,
  countryName,
  stateName,
  flag,
  id,
}: TripCardProp) {
  return (
    <li className="bg-white-2 dark:bg-black-2 p-4 rounded-lg shadow-md flex flex-col gap-4">
      <TripCardHeader
        countryName={countryName}
        stateName={stateName}
        flag={flag}
        id={id}
      />
      <TripCardMeta date={date} duration={duration} />
    </li>
  );
}

export default TripCard;
