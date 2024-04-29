import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Footer from "../Components/Footer";
import Disaster from "../pages/disasters";
import Donation from "../pages/donations";
import HomePage from "../pages/homepage";
import Volunteer from "../pages/volunteers";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/homepage" replace />,
  },
  {
    path: "/homepage",
    element: <HomePage />,
  },
  {
    path: "/newDisaster",
    element: <Disaster />,
  },
  {
    path: "/disaster/:id",
    element: <Disaster />,
  },
  {
    path: "/volunteer",
    element: <Volunteer />,
    children: [
      
    ]
  },
  {
    path: "/Donations",
    element: <Donation />,
  },
  {
    path: "/footer",
    element: <Footer />,
  },
]);
export default router;
