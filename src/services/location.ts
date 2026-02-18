import type { NominatimResponse } from "../types/nominatimTypes";
import type { Coordinates } from "../types/tripTypes";

async function fetchWithTimeout(
  url: string,
  timeout: number = 5000,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("The request timed out. Please try again.");
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// ----------------------------------------
// FETCHING USER'S CURRENT LOCATION
// ----------------------------------------

export async function fetchUserLocation(): Promise<Coordinates> {
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
}: Coordinates): Promise<NominatimResponse | never> {
  try {
    const res = await fetchWithTimeout(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    );
    if (!res.ok)
      throw new Error(
        "We're having trouble reaching the location service. Please try again in a moment.",
      );

    const data: NominatimResponse = await res.json();
    data.address.flag = data.address.country_code
      ? `https://flagcdn.com/w40/${data.address.country_code.toLowerCase()}.png`
      : "https://flagcdn.com/w40/un.png";

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
