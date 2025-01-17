import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import AuthPage from "../pages/AuthPage/AuthPage/AuthPage";
import Login from "../pages/AuthPage/Login/Login";
import SignUp from "../pages/AuthPage/SignUp/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "biodatas",
        element: <h1>biodatas</h1>,
      },
      {
        path: "auth",
        element: <AuthPage></AuthPage>,
        children: [
          {
            path: "login",
            element: <Login></Login>,
          },
          {
            path: "signUp",
            element: <SignUp></SignUp>,
          },
        ],
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "editBiodata",
        element: <h1>Edit Bio</h1>,
      },
    ],
  },
  {
    path: "*",
    element: <h1>ErrorPages</h1>,
  },
]);
