import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";

import { TripContextProvider } from "./context/TripContext";
import HomePage from "./components/Layouts/HomePage";
import AddTrip from "./components/Layouts/AddTrip";
import ViewTrip from "./components/Layouts/ViewTrip";
import { ErrorContextProvider } from "./context/ErrorContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      children: [
        {
          path: "view/:id",
          element: <ViewTrip />,
        },
        {
          path: "add",
          element: <AddTrip />,
        },
      ],
    },
  ]);

  return (
    <ErrorContextProvider>
      <TripContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </TripContextProvider>
    </ErrorContextProvider>
  );
}

export default App;
