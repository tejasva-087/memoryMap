import { useNavigate, useSearchParams } from "react-router-dom";

import { useMapEvent, useMap } from "react-leaflet";
import { Marker } from "leaflet";
import type { LeafletMouseEvent } from "leaflet";

import { useEffect } from "react";

function MapEvents() {
  const [searchParam] = useSearchParams();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  const navigate = useNavigate();

  const map = useMap();

  // USER CLICKS ON MAP THEY ARE REDIRECTED TO THE ADD TRIP FORM
  useMapEvent("click", (e: LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    map.flyTo([lat, lng], 5, {
      animate: true,
      duration: 0.6,
    });
    navigate(`/add?lat=${lat}&lng=${lng}`);
  });

  // USER CLICKS ON THE TRIP ON SIDE BAR SO IT FLIES TO IT'S LOCATION AND OPENS THEIR POPUP IF IT IS A VALID LOCATION
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
