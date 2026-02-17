import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./component/pages/HomePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
