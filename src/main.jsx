import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";

import { routeTree } from "./routeTree.gen";
import { NotFound } from "./pages/NotFound";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: NotFound,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
