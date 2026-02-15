import { useSearchParams } from "react-router-dom";
import FormHeader from "../form/formHeader";
import TripForm from "../form/TripForm";

function AddTripForm() {
  const [params] = useSearchParams();
  const lat = params.get("lat");
  const lng = params.get("lng");

  return (
    <aside className="h-full w-full p-5 max-[425px]:p-0">
      <div className="bg-zinc-50 dark:bg-zinc-900 h-full rounded-3xl p-8 border border-zinc-200 flex flex-col gap-4 overflow-scroll max-[425px]:h-svh max-[425px]:border-0 max-[425px]:rounded-none">
        <FormHeader />
        <TripForm key={`${lat}-${lng}`} />
      </div>
    </aside>
  );
}

export default AddTripForm;
