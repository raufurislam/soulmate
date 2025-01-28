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
import AboutUs from "../pages/Home/AboutUs/AboutUs";
import ContactUs from "../pages/Home/ContactUs/ContactUs";
import AdminRoute from "./AdminRoute";

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
        path: "about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "contact",
        element: <ContactUs></ContactUs>,
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
        element: (
          <PrivateRoute>
            <MyContactRequest></MyContactRequest>
          </PrivateRoute>
        ),
      },
      {
        path: "favourites",
        element: (
          <PrivateRoute>
            <MyFavouritesPage></MyFavouritesPage>
          </PrivateRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "married",
        element: (
          <PrivateRoute>
            <GotMarried></GotMarried>
          </PrivateRoute>
        ),
      },

      // Admin Route
      {
        path: "adminDashboard",
        element: (
          <AdminRoute>
            <AdminDashboard></AdminDashboard>
          </AdminRoute>
        ),
      },
      {
        path: "manage",
        element: (
          <AdminRoute>
            <ManageUser></ManageUser>
          </AdminRoute>
        ),
      },
      {
        path: "approvedContactRequest",
        element: (
          <AdminRoute>
            <ApprovedContactRequest></ApprovedContactRequest>
          </AdminRoute>
        ),
      },
      {
        path: "approvedPremium",
        element: (
          <AdminRoute>
            <ApprovedPremium></ApprovedPremium>
          </AdminRoute>
        ),
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
