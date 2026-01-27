import { getFlag } from "../../services/geoLocation";

function PlaceDetail({
  countryCode,
  countryName,
  cityName,
  defaultView = true,
}) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={getFlag(countryCode)}
        alt={`${countryName}'s flag`}
        className={`${defaultView ? "w-6" : "w-12"}`}
      />
      <h3
        className={`whitespace-nowrap ${defaultView ? "text-lg" : "text-2xl"}`}
      >
        {countryName}, {cityName}
      </h3>
    </div>
  );
}

export default PlaceDetail;
