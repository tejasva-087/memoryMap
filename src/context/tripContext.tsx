import { createContext, useContext, useReducer, type ReactNode } from "react";

import type {
  TripAction,
  TripContextType,
  TripState,
} from "../Types/TripTypes";

const initialState: TripState = {
  trips: [
    // {
    //   id: "12",
    //   flag: "12",
    //   countryName: "1232",
    //   stateName: "21231",
    //   date: "12312",
    //   duration: "123123",
    //   description: "q2e12e1",
    //   images: ["1231", "q21312"],
    //   coordinates: { lat: 123, lng: 123 },
    // },
  ],
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

  if (!context) return "useTrip must be used within TripProvider";

  return context;
}

export { TripProvider, useTrip };
