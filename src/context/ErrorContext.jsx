import { createContext, useContext, useReducer } from "react";

const ErrorContext = createContext();

const initialState = {
  error: null,
  blockApplication: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "error/fetching-location":
      return {
        ...state,
        error:
          "We couldn't find your precise location. This usually happens if permissions are blocked in your browser settings.",
      };
    default:
      return state;
  }
}

function ErrorContextProvider({ children }) {
  const [{ error, blockApplication }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <ErrorContext.Provider value={{ error, blockApplication, dispatch }}>
      {children}
    </ErrorContext.Provider>
  );
}

function useError() {
  const context = useContext(ErrorContext);

  if (context === undefined) {
    throw new Error("useError must be used within a TripProvider");
  }

  return context;
}

export { ErrorContextProvider, useError };
