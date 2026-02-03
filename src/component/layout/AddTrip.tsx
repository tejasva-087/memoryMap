import FormHeader from "../form/formHeader";
import TripForm from "../form/TripForm";

function AddTripForm() {
  return (
    <aside className="h-full w-full p-5">
      <div className="bg-zinc-50 dark:bg-zinc-900 h-full rounded-3xl p-8 border border-zinc-200 flex flex-col gap-12">
        <FormHeader />
        <TripForm />
      </div>
    </aside>
  );
}

export default AddTripForm;
