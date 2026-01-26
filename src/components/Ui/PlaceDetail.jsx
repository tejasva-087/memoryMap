import { getFlag } from "../../services/geoLocation";

function PlaceDetail({ countryCode, countryName, cityName }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={getFlag(countryCode)}
        alt={`${countryName}'s flag`}
        className="w-6"
      />
      <h3 className="text-lg whitespace-nowrap">
        {countryName}, {cityName}
      </h3>
    </div>
  );
}

export default PlaceDetail;
