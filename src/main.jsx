import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";

/**
 * This is the instance of the query client that will be used to handle all queries
 * made to the server using the `@tanstack/react-query` library.
 *
 * https://tanstack.com/query/latest/docs/framework/react/quick-start
 */
const queryClient = new QueryClient();

import { routeTree } from "./routeTree.gen";
import { NotFound } from "./pages/NotFound";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
