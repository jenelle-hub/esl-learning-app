import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import AuthCallback from "./AuthCallback.jsx";
import "./index.css"; // kung meron kang global styles

const router = createBrowserRouter([
  { path: "/", element: <App /> },
{ path: "/auth/callback", element: <AuthCallback /> },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
