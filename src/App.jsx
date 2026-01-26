import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";

import { TripContextProvider } from "./context/TripContext";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import ViewTrips from "./components/Layouts/ViewTrips";
import AddTrip from "./components/Layouts/AddTrip";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          index: true,
          element: <ViewTrips />,
        },
        {
          path: "add",
          element: <AddTrip />,
        },
      ],
    },
  ]);

  return (
    <TripContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </TripContextProvider>
  );
}

export default App;
