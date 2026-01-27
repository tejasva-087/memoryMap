import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import MarkerList from "./MarkerList";
import MapEvents from "./MapEvents";

function Map() {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "100%", width: "100%", cursor: "default" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></TileLayer>
      <MapEvents />
      <MarkerList />
    </MapContainer>
  );
}

export default Map;
