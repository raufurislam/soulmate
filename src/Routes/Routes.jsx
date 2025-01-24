import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import AuthPage from "../pages/AuthPage/AuthPage/AuthPage";
import Login from "../pages/AuthPage/Login/Login";
import SignUp from "../pages/AuthPage/SignUp/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import EditBiodata from "../pages/Dashboard/EditBiodata/EditBiodata";
import ViewBiodata from "../pages/Dashboard/ViewBiodata/ViewBiodata";
import Biodatas from "../pages/Biodatas/Biodatas/Biodatas";
import DetailsPage from "../pages/DetailsPage/DetailsPage";
import ManageUser from "../pages/Dashboard/ManageUser/ManageUser";

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
        element: <Biodatas></Biodatas>,
      },
      {
        path: "biodatas/:id",
        element: <DetailsPage></DetailsPage>,
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
    element: (
      <PrivateRoute redirectTo="/">
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // User Route
      {
        path: "viewBiodata",
        element: (
          <PrivateRoute>
            <ViewBiodata></ViewBiodata>
          </PrivateRoute>
        ),
      },
      {
        path: "editBiodata",
        element: (
          <PrivateRoute>
            <EditBiodata></EditBiodata>
          </PrivateRoute>
        ),
      },
      {
        path: "myContact",
        element: <h1>myContact</h1>,
      },
      {
        path: "favourites",
        element: <h1>favourites</h1>,
      },

      // Admin Route
      {
        path: "adminDashboard",
        element: <h1>Admin Dashboard</h1>,
      },
      {
        path: "manage",
        element: <ManageUser></ManageUser>,
      },
    ],
  },
  {
    path: "*",
    element: <h1>ErrorPages</h1>,
  },
]);
