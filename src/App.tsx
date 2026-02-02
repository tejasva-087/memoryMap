import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./component/pages/HomePage";
import { TripProvider } from "./context/tripContext";
import SideBar from "./component/layout/SideBar";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      children: [
        { index: true, element: <SideBar /> },
        { path: "/add", element: <p>Add trip</p> },
        { path: "/view", element: <p>view trip</p> },
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
