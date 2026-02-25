import { createContext, useContext, useEffect, useReducer } from "react";

import type {
  TripAction,
  TripContextType,
  TripState,
  Trip,
} from "../types/tripTypes";
import { deleteTrip, getAllTrips, saveTrip } from "../services/indexDB";

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
    case "trip/readDB":
      return { ...state, trips: action.payload, isLoading: false };
    default:
      return state;
  }
}

const TripContext = createContext<TripContextType | undefined>(undefined);

type TripProviderProp = {
  children: React.ReactNode;
};
function TripProvider({ children }: TripProviderProp) {
  const [{ trips, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    async function getTripData() {
      dispatch({ type: "trip/load" });
      try {
        const data = await getAllTrips();
        dispatch({ type: "trip/readDB", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "trip/error", payload: "Failed to load trips" });
      }
    }
    getTripData();
  }, []);

  const createTrip = async function (newTrip: Trip) {
    try {
      await saveTrip(newTrip);
      dispatch({ type: "trip/add", payload: newTrip });
    } catch (err) {
      console.error(err);
      dispatch({ type: "trip/error", payload: "Failed to save trip" });
    }
  };

  const removeTrip = async function (id: string) {
    try {
      await deleteTrip(id);
      dispatch({ type: "trip/remove", payload: id });
    } catch (err) {
      console.error(err);
      dispatch({ type: "trip/error", payload: "Failed to delete trip" });
    }
  };

  return (
    <TripContext.Provider
      value={{ trips, isLoading, error, dispatch, createTrip, removeTrip }}
    >
      {children}
    </TripContext.Provider>
  );
}

function useTrip() {
  const context = useContext(TripContext);
  if (!context) throw new Error("useTrip must be used within a TripProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { TripProvider, useTrip };
