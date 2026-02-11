import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { fetchUserLocation } from "../../services/location";
import MapEvents from "./MapEvents";
import MapMarkers from "./MapMarkers";

function WorldMap() {
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );

  useEffect(() => {
    async function getUserLocation() {
      try {
        setIsLoading(true);
        const location = await fetchUserLocation();
        setUserLocation([location.lat, location.lng]);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    getUserLocation();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <MapContainer
      key={userLocation ? userLocation.join(",") : "default"}
      center={userLocation || [43.7711, 11.2486]}
      zoom={5}
      zoomControl={false}
      style={{ height: "100%", width: "100%", cursor: "default" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents />
      <MapMarkers />
    </MapContainer>
  );
}

export default WorldMap;
