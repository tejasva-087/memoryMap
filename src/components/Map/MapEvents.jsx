import { useMapEvent } from "react-leaflet";
import { useNavigate } from "react-router-dom";

function MapEvents() {
  const navigate = useNavigate();

  const map = useMapEvent({
    click: (e) => {
      const { lat, lng } = e.latlng;
      navigate(`/add?lat=${lat}&lng=${lng}`);
    },
  });

  return <div>MapEvents</div>;
}

export default MapEvents;
