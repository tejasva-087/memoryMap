import type { NominatimResponse } from "../Types/Nominatimtypes";
import type { Coordinates } from "../Types/TripTypes";

const isDevelopment = false;

// ----------------------------------------
// FETCHING USER'S CURRENT LOCATION
// ----------------------------------------

export async function fetchUserLocation(): Promise<Coordinates> {
  // IF IN DEVELOPMENT MODE JUST RETURN A PREDEFINED LOCATION
  if (isDevelopment) return { lat: 22.71, lng: 75.87 };

  // IF USER'S BROWSER IS'NT ALLOWING TO USE LOCATION THROW ERROR
  if (!navigator.geolocation) {
    throw new Error("It looks like your browser isn't sharing your location.");
  }

  // RETURN THE LOCATION IF EVERYTHING WORKS FINE ELSE THROE ERROR
  return await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        resolve({ lat, lng });
      },
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  });
}

// ----------------------------------------
// FETCHING LOCATION DETAILS
// ----------------------------------------

export async function fetchLocationDetails({
  lat,
  lng,
}: Coordinates): Promise<NominatimResponse> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    );
    if (!res.ok)
      throw new Error(
        "We're having trouble reaching the location service. Please try again in a moment.",
      );

    const data: NominatimResponse = await res.json();
    data.address.flag = `https://flagcdn.com/w40/${data.address.country_code.toLowerCase()}.png`;

    return data;
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? err.message
        : "An unexpected error occurred. Please try again.",
    );
  }
}

// ----------------------------------------
// SEARCHING FOR LOCATIONS
// ----------------------------------------
