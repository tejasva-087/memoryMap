import { Popup } from "react-leaflet";

type Prop = {
  flag: string;
  countryName: string;
  stateName: string;
};

function CustomPopup({ flag, countryName, stateName }: Prop) {
  return (
    <Popup closeButton={false} minWidth={150}>
      <div className="flex items-center gap-2 p-1">
        <img src={flag} alt="" className="w-10 rounded-sm shadow-sm" />
        <h5 className="font-bold text-sm text-zinc-800 m-0">
          {stateName}, {countryName}
        </h5>
      </div>
    </Popup>
  );
}

export default CustomPopup;
