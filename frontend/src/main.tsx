import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./auth/sign-in/SignInPage";
import ReactDOM from "react-dom/client";
import React from "react";
import SignUpPage from "./auth/sign-up/SignUpPage";
import App from "./App";
import { LandingPage } from "./Home/LandingPage";
import Dashboard from "./dashboard/dashboard";
import { EditResume } from "./dashboard/resume/[resumeId]/EditResume";
import RootLayout from "./RootLayout";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUpPage />,
  },
  {
    element: <RootLayout />,
    children: [
      {
        path: "/dashboard/resume/edit/:resumeId",
        element: <EditResume />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
