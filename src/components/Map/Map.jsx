import { useEffect, useState } from "react";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import CustomMapMarker from "./CustomMapMarker";
import CustomPopup from "./CustomPopUp";
import MapEvent from "./MapEvent";

const NODE_ENV = "development";

function Map() {
  const [userLocation, setUserLocation] = useState(null);

  // FETCHING USER'S CURRENT LOCATION
  useEffect(() => {
    if (NODE_ENV === "development") return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      });
    }
  }, [setUserLocation]);

  return (
    <MapContainer
      center={userLocation || [51.505, -0.09]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></TileLayer>
      <MapEvent />
    </MapContainer>
  );
}

export default Map;
