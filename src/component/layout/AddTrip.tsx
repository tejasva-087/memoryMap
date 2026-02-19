import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { useTrip } from "../../context/tripContext";
import { fetchLocationDetails } from "../../services/location";

import DatePicker from "../ui/input/DatePicker";
import InputField from "../ui/input/InputField";
import TextArea from "../ui/input/TextArea";
import ImageInput from "../ui/input/ImageInput";
import { CaretLeftIcon } from "@phosphor-icons/react";

function AddTrip() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const { createTrip } = useTrip();

  const [flag, setFlags] = useState<string>("");
  const [countryName, setCountryName] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function clearStates() {
    setFlags("");
    setCountryName("");
    setStateName("");
    setDate("");
    setDuration("");
    setDescription("");
    setImages([]);
    setError("");
  }

  useEffect(() => {
    if (!lat || !lng) return;
    async function getLocationDetails(lat: number, lng: number): Promise<void> {
      setIsLoading(true);
      clearStates();
      try {
        const locationDetails = await fetchLocationDetails({ lat, lng });
        setCountryName(locationDetails.address.country || "");
        setStateName(
          locationDetails.address.state ||
            locationDetails.address.city ||
            locationDetails.address.town ||
            locationDetails.address.village ||
            "",
        );
        setFlags(locationDetails.address.flag || "");
      } catch (err) {
        console.error(err);
        setError("Failed to create trip. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    getLocationDetails(+lat, +lng);
  }, [lat, lng]);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    setIsSubmitting(true);
    e.preventDefault();
    const id = crypto.randomUUID();
    try {
      await createTrip({
        id,
        flag,
        countryName,
        stateName,
        date,
        duration,
        description,
        images,
        coordinates: {
          lat: lat ? +lat : 0,
          lng: lng ? +lng : 0,
        },
      });
      navigate(`/view/${id}?lat=${lat}&lng=${lng}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (error)
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-red-500 text-center text-lg">{error}</p>
        <Link to="/" className="border-b border-primary pb-0.05 text-primary">
          Go back
        </Link>
      </div>
    );

  return (
    <div>
      <div className="relative mb-6 md:mb-8">
        <button
          className="text-2xl absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer focus:ring focus:ring-white-1 focus:outline-0 rounded-full p-1"
          onClick={() => navigate("/")}
        >
          <CaretLeftIcon weight="bold" />
        </button>
        <h3 className="text-2xl text-center font-bold">Add trip</h3>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:grid md:grid-cols-2"
      >
        <InputField
          id="country-name"
          label="Country"
          placeholder="eg: India, Germany, Japan..."
          input={countryName}
          setInput={setCountryName}
        />
        <InputField
          id="state-name"
          label="State"
          placeholder="eg: California, New York, Texas..."
          input={stateName}
          setInput={setStateName}
        />
        <DatePicker
          date={date}
          setDate={setDate}
          id="date-picker"
          label="Visit date"
        />
        <InputField
          id="duration"
          label="Duration"
          placeholder="eg: 3 days"
          input={duration}
          setInput={setDuration}
        />
        <TextArea
          id="description"
          label="Description"
          placeholder="Anything about the trip you want to remember..."
          text={description}
          setText={setDescription}
          className="md:col-span-2"
        />
        <ImageInput
          setImages={setImages}
          images={images}
          id="image-input"
          label="Upload image"
          error={images.length === 0 ? true : false}
          className="md:col-span-2"
        />
        <button
          className="bg-primary p-4 w-full rounded-xl cursor-pointer focus:ring focus:ring-white-1 focus:outline-0 md:col-span-2"
          type="submit"
          disabled={isSubmitting ? true : false}
        >
          Add trip
        </button>
      </form>
    </div>
  );
}

export default AddTrip;
