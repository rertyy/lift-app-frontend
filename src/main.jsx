import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root";
import Welcome from "./routes/welcome";
import Floors from "./components/Lift/Floors";
import "./index.css";
import ErrorPage from "./routes/error-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test from "./routes/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Welcome />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/floors",
        element: <Floors />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/test",
        element: <Test />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
