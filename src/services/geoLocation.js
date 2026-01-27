// IMP: REVERSE GEOCODING API = https://nominatim.openstreetmap.org/reverse?lat=20.5937&lon=78.9629&format=json

// IMP: SEARCHING API = https://nominatim.openstreetmap.org/ui/search.html?state=utah&format=json

function getFlag(countryCode) {
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
}

async function getPlaceDetails(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    );
    const data = res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

export { getFlag, getPlaceDetails };
