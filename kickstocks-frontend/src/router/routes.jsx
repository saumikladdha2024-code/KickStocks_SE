import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import StockAnalysis from "../pages/StockAnalysis";
import Watchlist from "../pages/Watchlist";
import Forecast from "../pages/Forecast";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "analysis/:ticker?", element: <StockAnalysis /> },
      { path: "watchlist", element: <Watchlist /> },
      { path: "forecast/:ticker?", element: <Forecast /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);