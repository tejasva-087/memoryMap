import { Marker, useMap } from "react-leaflet";

import { customMarkerIcon } from "./CustomMapMarkerIcon";
import CustomPopup from "../Popup/CustomPopup";
import { useNavigate } from "react-router-dom";

function MapMarker({ trip }) {
  const navigate = useNavigate();

  const { countryCode, countryName, cityName, coordinates, id } = trip;
  const markerPosition = [coordinates.lat, coordinates.lng];

  return (
    <Marker
      position={markerPosition}
      icon={customMarkerIcon}
      eventHandlers={{
        popupopen: () => {
          navigate(`/view/${id}?lat=${coordinates.lat}&lng=${coordinates.lng}`);
        },
        popupclose() {
          navigate(`/`);
        },
      }}
    >
      <CustomPopup
        countryCode={countryCode}
        countryName={countryName}
        cityName={cityName}
      ></CustomPopup>
    </Marker>
  );
}

export default MapMarker;
