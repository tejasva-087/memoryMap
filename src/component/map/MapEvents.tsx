import { useNavigate } from "react-router-dom";
import type { LeafletMouseEvent } from "leaflet";

import { useMapEvent, useMap } from "react-leaflet";

function MapEvents() {
  const navigate = useNavigate();
  const map = useMap();

  useMapEvent("click", (e: LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    map.flyTo([lat, lng], map.getZoom(), {
      animate: true,
      duration: 0.6,
    });
    navigate(`/add?lat=${lat}&lng=${lng}`);
  });

  return null;
}

export default MapEvents;
