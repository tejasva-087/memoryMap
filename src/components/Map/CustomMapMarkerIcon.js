import L from "leaflet";
import mapPin from "../../assets/map-pin.svg";

const customMarkerIcon = new L.Icon({
  iconUrl: mapPin,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export { customMarkerIcon };
