import { createContext, useContext, useReducer } from "react";

const TripContext = createContext();
// {
//       countryFlag: "🇮🇳",
//       countryName: "India",
//       date: "12/01/26",
//       duration: "3 days",
//       ratings: 3,
//       description: "Some awful people, but can be a better place.",
//       coordinates: [20.5937, 78.9629],
//     },
//     {
//       countryFlag: "🇮🇳",
//       countryName: "India",
//       date: "12/01/26",
//       duration: "3 days",
//       ratings: 3,
//       description: "Some awful people, but can be a better place.",
//       coordinates: [20.5937, 78.9629],
//     },

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
