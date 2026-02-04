import { useState } from "react";
import Input from "../ui/input/Input";
import TextArea from "../ui/input/TextArea";
import ImageUploader from "../ui/input/Image";

function TripForm() {
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [images, setImages] = useState<string[]>([]);

  console.log(images);
  return (
    <form className="flex flex-col gap-4">
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
      />
    </form>
  );
}

export default TripForm;
