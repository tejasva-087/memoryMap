import { useNavigate } from "react-router-dom";
import type { LeafletMouseEvent } from "leaflet";

import { useMapEvent, useMap } from "react-leaflet";

function MapEvents() {
  const navigate = useNavigate();
  const map = useMap();

  useMapEvent("click", (e: LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    navigate(`/add?lat=${lat}&lng=${lng}`);
    map.setView([lat, lng]);
  });

  return null;
}

export default MapEvents;
