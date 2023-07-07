import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";
import Welcome from "./components/Welcome.tsx";
import Root from "./Root.tsx";
import App from "./components/App.tsx";
import Floors from "./components/Floors.tsx";

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
        path: "/app",
        element: <App />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/floors",
        element: <Floors />,
        errorElement: <ErrorPage />,
      },
      // {
      //     path: "/test",
      //     element: <Test />,
      //     errorElement: <ErrorPage />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
