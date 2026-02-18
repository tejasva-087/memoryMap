import { useNavigate } from "react-router-dom";

import { Marker, useMap } from "react-leaflet";
import type { LatLngTuple } from "leaflet";

import CustomPopup from "./CustomPopup";
import { customMarkerIcon } from "./popup";
import type { Coordinates } from "../../types/tripTypes";

type Prop = {
  flag: string;
  countryName: string;
  stateName: string;
  coordinates: Coordinates;
  id: string;
};

function MapMarker({ flag, countryName, stateName, coordinates, id }: Prop) {
  const navigate = useNavigate();
  const map = useMap();

  const markerPosition: LatLngTuple = [coordinates.lat, coordinates.lng];

  return (
    <Marker
      position={markerPosition}
      icon={customMarkerIcon}
      eventHandlers={{
        click: (e) => {
          e.originalEvent.stopPropagation();
          map.flyTo(markerPosition, map.getZoom(), {
            animate: true,
            duration: 0.3,
          });
          navigate(
            `/view/${id}?lat=${markerPosition[0]}&lng=${markerPosition[1]}`,
          );
        },
      }}
    >
      <CustomPopup
        flag={flag}
        countryName={countryName}
        stateName={stateName}
      ></CustomPopup>
    </Marker>
  );
}

export default MapMarker;
