import type { Dispatch } from "react";

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Trip = {
  id: string;
  flag: string;
  countryName: string;
  stateName: string;
  date: string;
  duration: string;
  description: string;
  images: string[];
  coordinates: Coordinates;
};

export interface TripState {
  trips: Trip[];
  isLoading: boolean;
  error: string | null;
}

export type TripAction =
  | { type: "trip/add"; payload: Trip }
  | { type: "trip/remove"; payload: string }
  | { type: "trip/load" }
  | { type: "trip/success" }
  | { type: "trip/error"; payload: string }
  | { type: "trip/readDB"; payload: Trip[] };

export interface TripContextType extends TripState {
  dispatch: Dispatch<TripAction>;
}
