type Prop = {
  countryName: string;
  placeName: string;
  flag: string;
  imgStyle?: string;
  textStyle?: string;
};

function PlaceDetails({
  countryName,
  placeName,
  flag,
  imgStyle = "",
  textStyle = "",
}: Prop) {
  return (
    <div className="flex items-center justify-center gap-2">
      <img src={flag} alt="" className={`w-10 ${imgStyle}`} />
      <h3 className={`text-lg ${textStyle}`}>
        {placeName}, {countryName}
      </h3>
    </div>
  );
}

export default PlaceDetails;
