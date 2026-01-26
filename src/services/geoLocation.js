// IMP: REVERSE GEOCODING API = https://nominatim.openstreetmap.org/reverse?lat=20.5937&lon=78.9629&format=json

// IMP: SEARCHING API = https://nominatim.openstreetmap.org/ui/search.html?state=utah&format=json

function getFlag(countryCode) {
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
}

export { getFlag };
