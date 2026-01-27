import AddTripForm from "../AddTripForm/AddTripForm";

function AddTrip() {
  return (
    <div
      className="absolute top-0 h-screen w-150 bg-zinc-800 text-zinc-50 p-12 flex flex-col gap-6 side-bar-animate overflow-y-scroll"
      style={{ zIndex: 999 }}
    >
      <AddTripForm />
    </div>
  );
}

export default AddTrip;
