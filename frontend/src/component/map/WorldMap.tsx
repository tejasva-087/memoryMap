import { useEffect, useState } from "react";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { fetchUserLocation } from "../../services/location";

import MapEvents from "./MapEvents";
import MarkerList from "./MarkerList";

function WorldMap() {
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );

  useEffect(() => {
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");

    const onChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    matcher.addEventListener("change", onChange);

    return () => matcher.removeEventListener("change", onChange);
  }, []);

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

  if (isLoading) {
    return (
      <div className="h-svh w-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <MapContainer
      key={userLocation ? userLocation.join(",") : "default"}
      center={userLocation || [22.43, 75.5]}
      zoom={5}
      zoomControl={false}
      style={{
        height: "100%",
        width: "100%",
        cursor: "default",
      }}
    >
      {isDark ? (
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
      ) : (
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
      )}
      <MapEvents />
      <MarkerList />
    </MapContainer>
  );
}

export default WorldMap;
