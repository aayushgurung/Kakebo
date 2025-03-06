import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./dashboard/page/Home.tsx";
import DashboardLayout from "./dashboard/DashboardLayout.tsx";
import NotFound from "./components/ErrorElement.tsx";
import "./index.css";
import Budget from "./dashboard/page/Budget.tsx";
import { Toaster } from "@/components/ui/toaster";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "budget",
        element: <Budget />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>
);
