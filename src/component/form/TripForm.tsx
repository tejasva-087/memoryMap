import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { WarningIcon } from "@phosphor-icons/react";

import { useTrip } from "../../context/tripContext";

import Input from "../ui/input/Input";
import TextArea from "../ui/input/TextArea";
import ImageUploader from "../ui/input/Image";
import DatePicker from "../ui/input/DatePicker";
import { fetchLocationDetails } from "../../services/location";
import { saveTrip } from "../../services/indexDB";

function TripForm() {
  const { trips, dispatch } = useTrip();
  const [error, setError] = useState<string | null>(null);

  const [params] = useSearchParams();
  const lat = Number(params.get("lat"));
  const lng = Number(params.get("lng"));

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [flag, setFlag] = useState("https://flagcdn.com/w40/un.png");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");
  const [id, setId] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let validationError: string | null = null;

    if (!countryName) validationError = "Please provide the country name.";
    else if (!stateName) validationError = "Please provide the state name.";
    else if (!date || new Date(date) > new Date())
      validationError = "Please provide a correct date";
    else if (!duration) validationError = "Please specify the duration.";
    else if (!description) validationError = "Please provide a description.";
    else if (!images || images.length === 0)
      validationError = "Please upload some images";

    setError(validationError);

    if (validationError) return;

    const trip = {
      id: `${id}${trips.length}`,
      countryName,
      stateName,
      description,
      duration,
      images,
      date,
      flag,
      coordinates: {
        lat,
        lng,
      },
    };

    await saveTrip(trip);

    dispatch({
      type: "trip/add",
      payload: trip,
    });

    navigate("/");
    return;
  }

  useEffect(() => {
    async function getLocationDetails() {
      try {
        setIsLoading(true);
        const data = await fetchLocationDetails({ lat, lng });
        if (!data) return;
        setCountryName(data.address.country || "");
        setStateName(data.address.state || "");
        setFlag(data.address.flag || "");
        setId(data.address.country_code || "");
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    getLocationDetails();
  }, [lat, lng]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="loader"></div>
      </div>
    );

  return (
    <form
      className="flex flex-col justify-between h-full gap-8"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex flex-col gap-4">
        <Input
          id="country"
          state={countryName}
          setState={setCountryName}
          label="Country"
          placeholder="eg: Japan, India, Germany..."
        />

        <Input
          id="state"
          state={stateName}
          setState={setStateName}
          label="State"
          placeholder="eg: California, New York, Texas..."
        />
        <DatePicker
          id="visit-date"
          label="Visit date"
          date={date}
          setDate={setDate}
        />
        <Input
          id="duration"
          state={duration}
          setState={setDuration}
          label="Duration"
          placeholder="eg: 3 days"
        />
        <TextArea
          id="description"
          state={description}
          setState={setDescription}
          label="Description"
          placeholder="eg: The night near the beach..."
        />

        <ImageUploader
          id="upload-image"
          label="Upload images"
          images={images}
          setState={setImages}
          error={images.length === 0 ? true : false}
        />
      </div>
      <div className="flex flex-col gap-2">
        {error && (
          <p className="text-red-500 flex items-center gap-1">
            <WarningIcon />
            {error}
          </p>
        )}
        <button className="bg-primary p-4 w-full rounded-xl cursor-pointer focus:ring focus:ring-white focus:outline-0">
          Submit
        </button>
      </div>
    </form>
  );
}

export default TripForm;
