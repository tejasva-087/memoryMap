import { useEffect, useState } from "react";
import { getFlag, getPlaceDetails } from "../../services/geoLocation";
import { useSearchParams } from "react-router-dom";

function AddTripForm() {
  const [searchParams] = useSearchParams();
  const [lat, lng] = [searchParams.get("lat"), searchParams.get("lng")];

  const [countryName, setCountryName] = useState(""); // ✅
  const [cityName, setCityName] = useState(""); // ✅
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [flag, setFlag] = useState(""); // ✅
  const [id, setId] = useState(""); // ✅

  // const [countryName, setCountryName] = useState("");

  useEffect(() => {
    async function fetchLocationDetails() {
      const data = await getPlaceDetails(lat, lng);
      setId(data.place_id);
      setCityName(data.address.city);
      setCountryName(data.address.country);
      setFlag(() => getFlag(data.address.country_code));
    }

    fetchLocationDetails();
  }, [lat, lng, setId, setCityName, setCountryName, setFlag]);

  console.log(countryName, cityName, id, flag);

  return <form>AddTripForm</form>;
}

export default AddTripForm;
