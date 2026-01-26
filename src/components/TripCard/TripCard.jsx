import { useNavigate } from "react-router-dom";

function TripCard({ id, coordinates, children }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`view/${id}?lat=${coordinates.lat}&lng=${coordinates.lng}`);
  }

  return (
    <div
      className="flex flex-col gap-4 p-4 bg-zinc-700 rounded-xl"
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

export default TripCard;
