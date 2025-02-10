import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ThanksSignup from "../components/ThanksSignup";
import Dashboard from "../Layout/Dashboard";
import ManageUsers from "../pages/Admin/ManageUsers";
import MyProfile from "../pages/Users/MyProfile";
import AddOffers from "../pages/Admin/AddOffers";
import ManageOffers from "../pages/Admin/ManageOffers";
import UpdateOffer from "../pages/Admin/UpdateOffers";
import AllOffers from "../pages/Users/AllOffers";
import OfferDetails from "../pages/Users/OfferDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/thanks-for-apply",
        element: <ThanksSignup></ThanksSignup>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // ADMIN
      {
        path: 'manage-users',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'add-offers',
        element: <AddOffers></AddOffers>
      },
      {
        path: 'manage-offers',
        element: <ManageOffers></ManageOffers>
      },
      {
        path: 'update-offer/:offerId',
        element: <UpdateOffer></UpdateOffer>
      },
      // Publisher
      {
        path: 'offers',
        element: <AllOffers></AllOffers>
      },
      {
        path: 'offers/:id',
        element: <OfferDetails></OfferDetails>
      },
      
      {
        path: 'my-profile',
        element: <MyProfile></MyProfile>
      },
    ]
  },
]);

export default router;
