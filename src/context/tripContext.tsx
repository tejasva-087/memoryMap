import { createContext, useContext, useReducer, type ReactNode } from "react";

import type {
  TripAction,
  TripContextType,
  TripState,
} from "../Types/TripTypes";

const initialState: TripState = {
  trips: [
    {
      id: "trip-2024-001",
      flag: "https://flagcdn.com/w80/jp.png",
      countryName: "Japan",
      stateName: "Kyoto",
      date: "2024-03-25",
      duration: "7 days",
      description:
        "Explored the historic temples and witnessed the peak of the cherry blossom season. The Gion district at night was magical.",
      images: [
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
        "https://images.unsplash.com/photo-1545569341-9eb8b30979d9",
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
        "https://images.unsplash.com/photo-1545569341-9eb8b30979d9",
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
        "https://images.unsplash.com/photo-1545569341-9eb8b30979d9",
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
        "https://images.unsplash.com/photo-1545569341-9eb8b30979d9",
      ],
      coordinates: {
        lat: 35.0116,
        lng: 135.7681,
      },
    },
    {
      id: "trip-2024-002",
      flag: "https://flagcdn.com/w80/it.png",
      countryName: "Italy",
      stateName: "Tuscany",
      date: "2024-05-12",
      duration: "5 days",
      description:
        "Road trip through the rolling hills of Val d'Orcia. Spent the afternoons wine tasting and the evenings eating homemade pasta.",
      images: [
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
        "https://images.unsplash.com/photo-1531572753322-ad063cecc140",
      ],
      coordinates: {
        lat: 43.7711,
        lng: 11.2486,
      },
    },
    {
      id: "trip-2024-003",
      flag: "https://flagcdn.com/w80/is.png",
      countryName: "Iceland",
      stateName: "Southern Region",
      date: "2024-01-10",
      duration: "4 days",
      description:
        "Chased the Northern Lights near Vik. The black sand beaches and the Skógafoss waterfall were absolutely breathtaking.",
      images: [
        "https://images.unsplash.com/photo-1476610182048-b716b8518aae",
        "https://images.unsplash.com/photo-1504829857797-ddff29c27947",
      ],
      coordinates: {
        lat: 63.4186,
        lng: -19.006,
      },
    },
    {
      id: "trip-2024-004",
      flag: "https://flagcdn.com/w80/us.png",
      countryName: "United States",
      stateName: "Arizona",
      date: "2024-09-05",
      duration: "3 days",
      description:
        "Hiking in Sedona. The red rock formations are unlike anything else. Caught an incredible sunset at Cathedral Rock.",
      images: [
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
        "https://images.unsplash.com/photo-1498623116890-37e912163d5d",
      ],
      coordinates: {
        lat: 34.8697,
        lng: -111.7608,
      },
    },
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

  if (!context) throw new Error("useTrip must be used within a TripProvider");

  return context;
}

export { TripProvider, useTrip };
