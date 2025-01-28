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
import MyFavouritesPage from "../pages/Dashboard/Favourites/MyFavouritesPage";
import Payment from "../pages/Dashboard/Payment/Payment";
import ApprovedContactRequest from "../pages/Dashboard/ApprovedContactRequest/ApprovedContactRequest";
import MyContactRequest from "../pages/Dashboard/MyContactRequest/MyContactRequest";
import ApprovedPremium from "../pages/Dashboard/ApprovedPremium/ApprovedPremium";
import GotMarried from "../pages/Dashboard/GotMarried/GotMarried";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";

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
        element: (
          <PrivateRoute>
            <DetailsPage></DetailsPage>
          </PrivateRoute>
        ),
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
        element: <MyContactRequest></MyContactRequest>,
      },
      {
        path: "favourites",
        element: <MyFavouritesPage></MyFavouritesPage>,
      },
      {
        path: "payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "married",
        element: <GotMarried></GotMarried>,
      },

      // Admin Route
      {
        path: "adminDashboard",
        element: <AdminDashboard></AdminDashboard>,
      },
      {
        path: "manage",
        element: <ManageUser></ManageUser>,
      },
      {
        path: "approvedContactRequest",
        element: <ApprovedContactRequest></ApprovedContactRequest>,
      },
      {
        path: "approvedPremium",
        element: <ApprovedPremium></ApprovedPremium>,
      },
    ],
  },
  {
    path: "*",
    element: <h1>ErrorPages</h1>,
  },
]);

// https://meet.google.com/mkp-riks-cpw
// https://meet.google.com/pmb-zgdr-syg
