import { createContext, useContext, useReducer } from "react";

const TripContext = createContext();

const initialState = {
  trips: [],
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "trip/add":
      return {
        ...state,
        trips: [...state.trips, action.payload],
      };
    case "trip/remove":
      return {
        ...state,
        trips: state.trips.filter((trip) => trip.id !== action.payload),
      };
    case "trip/loading":
      return { ...state, isLoading: true };

    case "trip/loaded":
      return { ...state, isLoading: false };

    case "trip/loadingError":
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

function TripContextProvider({ children }) {
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

  if (context === undefined) {
    throw new Error("useTrip must be used within a TripProvider");
  }

  return context;
}

export { TripContextProvider, useTrip };
