import { createContext, useContext, useReducer } from "react";

const TripContext = createContext();

const initialState = {
  trips: [
    {
      id: "1",
      countryName: "India",
      countryCode: "in",
      date: "12/01/26",
      duration: "3 days",
      rating: 3,
      description: "Some awful people, but can be a better place.",
      coordinates: [20.5937, 78.9629],
    },
    {
      id: "2",
      countryName: "Bhutan",
      countryCode: "bt",
      date: "12/01/26",
      duration: "3 days",
      rating: 3,
      description: "Some awful people, but can be a better place.",
      coordinates: [20.5937, 78.9629],
    },
  ],
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
      console.log("Hello");
      console.log(state.trips.filter((trip) => trip.id !== action.payload));
      return {
        ...state,
        trips: state.trips.filter((trip) => trip.id !== action.payload),
      };
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
