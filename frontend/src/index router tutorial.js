import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Routes,
  BrowserRouter,
  Router,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Index from "./pages/Index";
import ViewPage from "./components/Modal/ViewPage";
import Feed from "./components/Feed";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ResetPassword from "./pages/auth/ResetPassword";
import Home from "./pages/auth/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "index",
        element: <Feed />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

// JSX
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route errorElement={<ErrorPage />}>
//       <Route path="/index" element={<Index />}>
//         <Route index element={<Feed />} />
//       </Route>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/reset-password" element={<ResetPassword />} />
//     </Route>
//   )
// );

// Пример из туториала. В данном случае App.jsx не нужен
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
