import { createContext, useContext, useReducer, type ReactNode } from "react";

import type {
  TripAction,
  TripContextType,
  TripState,
} from "../Types/TripTypes";

const initialState: TripState = {
  trips: [],
  isLoading: false,
  error: null,
};

function reducer(state: TripState, action: TripAction): TripState {
  switch (action.type) {
    case "trip/add":
      return { ...state, trips: [...state.trips, action.payload] };

    case "trip/remove":
      return {
        ...state,
        trips: state.trips.filter((trip) => trip.id !== action.payload),
      };
    case "trip/load":
      return { ...state, isLoading: true };

    case "trip/success":
      return { ...state, isLoading: false };
    case "trip/error":
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}

const TripContext = createContext<TripContextType | undefined>(undefined);

function TripProvider({ children }: { children: ReactNode }) {
  const [{ trips, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  return (
    <TripContext.Provider value={{ trips, isLoading, error, dispatch }}>
      {children}
    </TripContext.Provider>
  );
}

function useTrip() {
  const context = useContext(TripContext);

  if (!context) throw new Error("useTrip must be used within a TripProvider");

  return context;
}

export { TripProvider, useTrip };
