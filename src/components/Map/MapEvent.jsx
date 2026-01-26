import { useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";

function MapEvent() {
  const MapEvent = useMapEvents({
    click(e) {
      console.log("Map clicked at", e.latlng);

      // CHANGING THE ROUTE TO /ADD FOR ADDING A NEW TRIP
    },
  });
  return null;
}

export default MapEvent;
