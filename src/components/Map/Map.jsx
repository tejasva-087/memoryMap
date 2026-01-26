import { useEffect, useState } from "react";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import MapEvent from "./MapEvent";
import MarkerList from "./MarkerList";

// IMP: REMOVE THIS VARIABLE
const NODE_ENV = "development";

function Map() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // IMP: REMOVE THIS LINE OF CODE
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
      <MarkerList />
    </MapContainer>
  );
}

export default Map;
