import { Marker, useMap } from "react-leaflet";
import CustomPopup from "./popup/CustomPupup";
import { customMarkerIcon } from "./popup/CustomPointer";
import type { Trip } from "../../Types/TripTypes";
import type { LatLngTuple } from "leaflet";
import { useNavigate } from "react-router-dom";

type Prop = {
  trip: Trip;
};

function MapMarker({ trip }: Prop) {
  const navigate = useNavigate();

  const { flag, countryName, stateName, coordinates, id } = trip;
  const markerPosition: LatLngTuple = [coordinates.lat, coordinates.lng];

  const map = useMap();

  return (
    <Marker
      position={markerPosition}
      icon={customMarkerIcon}
      eventHandlers={{
        click: (e) => {
          e.originalEvent.stopPropagation();
          map.flyTo(markerPosition, 5, {
            animate: true,
            duration: 0.6,
          });
          navigate(`/view/${id}`);
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
