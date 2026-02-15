import { useNavigate, useSearchParams } from "react-router-dom";
import type { LeafletMouseEvent } from "leaflet";
import { Marker } from "leaflet";

import { useMapEvent, useMap } from "react-leaflet";
import { useEffect } from "react";

function MapEvents() {
  const [searchParam] = useSearchParams();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  const navigate = useNavigate();
  const map = useMap();

  useMapEvent("click", (e: LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    map.flyTo([lat, lng], 5, {
      animate: true,
      duration: 0.6,
    });
    navigate(`/add?lat=${lat}&lng=${lng}`);
  });

  useEffect(() => {
    if (!lat || !lng) return;

    map.closePopup();

    map.flyTo([+lat, +lng], 5, {
      animate: true,
      duration: 0.6,
    });

    map.eachLayer((layer) => {
      if (layer instanceof Marker) {
        const { lat: markerLat, lng: markerLng } = layer.getLatLng();
        if (markerLat === +lat && markerLng === +lng) {
          layer.openPopup();
        }
      }
    });
  }, [lat, lng, map]);

  return null;
}

export default MapEvents;
