import { Popup } from "react-leaflet";

import PlaceDetail from "../Ui/PlaceDetail";

function CustomPopup({ countryCode, countryName, cityName }) {
  return (
    <Popup closeButton={false} minWidth={200} maxWidth={350}>
      <PlaceDetail
        countryCode={countryCode}
        countryName={countryName}
        cityName={cityName}
      />
    </Popup>
  );
}

export default CustomPopup;
