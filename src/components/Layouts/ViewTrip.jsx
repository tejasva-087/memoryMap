import { useParams } from "react-router-dom";

function ViewTrip() {
  const params = useParams();
  console.log(params);
  return (
    <div
      className="absolute top-0 right-0 h-screen w-150 bg-zinc-800"
      style={{ zIndex: 999 }}
    >
      ViewTrip
    </div>
  );
}

export default ViewTrip;
