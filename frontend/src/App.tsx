import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./component/pages/HomePage";
import { TripProvider } from "./context/tripContext";
import SideBar from "./component/layout/SideBar";
import AddTrip from "./component/layout/AddTrip";
import ViewTrip from "./component/layout/ViewTrip";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      children: [
        { index: true, element: <SideBar /> },
        { path: "/add", element: <AddTrip /> },
        {
          path: "/view/:id",
          element: <ViewTrip key={window.location.pathname} />,
        },
      ],
    },
  ]);
  return (
    <TripProvider>
      <RouterProvider router={router}></RouterProvider>
    </TripProvider>
  );
}

export default App;
