import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import AuthPage from "../pages/AuthPage/AuthPage/AuthPage";
import Login from "../pages/AuthPage/Login/Login";
import SignUp from "../pages/AuthPage/SignUp/SignUp";

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
    path: "*",
    element: <h1>ErrorPages</h1>,
  },
]);
