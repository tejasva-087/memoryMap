import { useState } from "react";
import Input from "../ui/input/Input";

function TripForm() {
  // const { isLoading, error, dispatch } = useTrip();

  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");

  return (
    <form className="flex flex-col gap-4">
      <Input
        id="country"
        state={countryName}
        setState={setCountryName}
        label="Country"
        placeholder="Enter the country you visited"
      />

      <Input
        id="state"
        state={stateName}
        setState={setStateName}
        label="State"
        placeholder="Enter the state you visited"
      />
    </form>
  );
}

export default TripForm;
