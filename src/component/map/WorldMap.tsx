import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// import { fetchUserLocation } from "../../services/location";
// import MapEvents from "./MapEvents";
// import MapMarkers from "./MapMarkers";

function WorldMap() {
  // const [isLoading, setIsLoading] = useState(false);
  const [userLocation] = useState<[number, number] | null>(null);

  // useEffect(() => {
  //   async function getUserLocation() {
  //     try {
  //       setIsLoading(true);
  //       // const location = await fetchUserLocation();
  //       setUserLocation([location.lat, location.lng]);
  //       setIsLoading(false);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   getUserLocation();
  // }, []);

  return (
    <MapContainer
      key={userLocation ? userLocation.join(",") : "default"}
      center={[22.43, 75.5]}
      zoom={5}
      zoomControl={false}
      style={{ height: "100%", width: "100%", cursor: "default" }}
    >
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      /> */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {/* <MapEvents />
      <MapMarkers /> */}
    </MapContainer>
  );
}

export default WorldMap;
