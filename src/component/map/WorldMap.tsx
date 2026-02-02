import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { fetchUserLocation } from "../../services/location";
import MapEvents from "./MapEvents";

function WorldMap() {
  const [isLoading, setIsLoading] = useState(false);
  // TODO: provide a notification bar fro this error (maybe error context)
  const [error, setError] = useState<string | null>(null);
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
        setError("Something went wrong while fetching your location.");
      } finally {
        setIsLoading(false);
      }
    }

    getUserLocation();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <MapContainer
      center={userLocation || [22.71, 75.87]}
      zoom={13}
      zoomControl={false}
      style={{ height: "100%", width: "100%", cursor: "default" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents />
    </MapContainer>
  );
}

export default WorldMap;
