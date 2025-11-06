import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WatchlistProvider } from "./context/WatchlistContext";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
