import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getFlag, getPlaceDetails } from "../../services/geoLocation";
import Input from "../Ui/Input";
import { useTrip } from "../../context/TripContext";
import TextArea from "../Ui/TextArea";
import Ratings from "../Ui/Ratings";

function AddTripForm() {
  const { isLoading, error, dispatch } = useTrip();

  const [searchParams] = useSearchParams();
  const [lat, lng] = [searchParams.get("lat"), searchParams.get("lng")];

  const [countryName, setCountryName] = useState("");
  const [cityName, setCityName] = useState("");
  const [flag, setFlag] = useState("");
  const [id, setId] = useState("");

  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchLocationDetails() {
      dispatch({ type: "trip/loading" });
      setId("");
      setCityName("");
      setCountryName("");
      setFlag(() => getFlag(""));

      try {
        const data = await getPlaceDetails(lat, lng);
        setId(data.place_id);
        setCityName(data.address.city);
        setCountryName(data.address.country);
        setFlag(() => getFlag(data.address.country_code));

        dispatch({ type: "trip/loaded" });
      } catch (err) {
        console.error(err);
        dispatch({
          type: "trip/loadingError",
          payload:
            "there was an error loading the location you were pointing to.",
        });
      }
    }

    fetchLocationDetails();
  }, [lat, lng, setId, setCityName, setCountryName, setFlag, dispatch]);

  return (
    <>
      {isLoading && <div class="loader"></div>}
      {!isLoading && (
        <>
          <header className="flex items-center justify-between">
            <h3 className="text-center text-xl">Add to MemoryMap</h3>
            <button>CLOSE</button>
          </header>
          <form className="flex flex-col gap-4">
            <Input
              state={countryName}
              setState={setCountryName}
              type="text"
              placeholder="Enter city name"
              label="Country"
              id="country"
            />
            <Input
              state={cityName}
              setState={setCityName}
              type="text"
              placeholder="Enter city name"
              label="City"
              id="city"
            />
            <Input
              state={date}
              setState={setDate}
              type="date"
              placeholder="Date"
              label="Date"
              id="date"
            />
            <Input
              state={duration}
              setState={setDuration}
              type="text"
              placeholder="eg: 3 days"
              label="Duration"
              id="duration"
            />
            <TextArea
              state={description}
              setState={setDescription}
              name="trip description"
              placeholder="e.g., The night on that street..."
              label="Description"
              id="duration"
            />
          </form>
        </>
      )}
    </>
  );
}

export default AddTripForm;
