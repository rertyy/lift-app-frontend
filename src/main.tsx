import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";
import Welcome from "./components/Welcome.tsx";
import Root from "./Root.tsx";
import App from "./components/App.tsx";
import WebSockFloors from "./components/WebSocketFloors.tsx";

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
        element: <WebSockFloors />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
