type Prop = {
  countryName: string;
  stateName: string;
  flag: string;
};

function PlaceDetails({ countryName, stateName, flag }: Prop) {
  return (
    <div className="flex items-center justify-center gap-2">
      <img src={flag} alt="" className="w-12" />
      <h3 className="text-xl">
        {stateName}, {countryName}
      </h3>
    </div>
  );
}

export default PlaceDetails;
