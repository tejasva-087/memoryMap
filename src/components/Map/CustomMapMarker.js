import L from "leaflet";
import mapPin from "../../assets/map-pin.svg";

const customMarkerIcon = new L.Icon({
  iconUrl: mapPin,
  iconSize: [40, 40], // size of the icon
  iconAnchor: [20, 40], // point of the icon which corresponds to marker location
  popupAnchor: [0, -40], // point from which the popup should open
});

export default customMarkerIcon;
