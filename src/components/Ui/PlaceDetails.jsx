function PlaceDetails() {
  // TODO: get the flag country name form the context
  const cityName = "USA";

  return (
    <div className="flex items-center">
      <img
        src="https://commons.wikimedia.org/wiki/File:Flag_of_France.png"
        alt="Place Icon"
        className="w-6 h-6 mr-2"
      />
      <p>{cityName}</p>
    </div>
  );
}

export default PlaceDetails;
