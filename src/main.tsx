import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router";
import "./index.css";
import "./App.css";
import App from "./App";
import TrophyView from "./views/TrophyView";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
  },
  {
    path: "/trophies",
    element: (
      <ErrorBoundary>
        <TrophyView />
      </ErrorBoundary>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
