import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Register from "../pages/User/Register";
import Login from "../pages/User/Login";
import Layout from "../components/Shared/Layout";
import CarFavorite from "../pages/User/CarFavorite";
import Profile from "../pages/User/Profile";
import MyCar from "../pages/User/MyCar";
import MySrips from "../pages/User/MySrips";
import RentailCar from "../pages/User/RentailCar";
import UserAddresses from "../pages/User/UserAddresses";
import Gifts from "../pages/User/Gifts";
import ChangePassword from "../pages/User/ChangePassword";
import DeleteAccount from "../pages/User/DeleteAccount";
import DashboardCard from "../pages/DashboardCard/DashboardCard";
import DashboardContent from "../pages/DashboardContent/DashboardContent";
import EventCalendarContent from "../pages/EventCalendarContent/EventCalendarContent";
import FinancialManagementContent from "../pages/FinancialManagementContent/FinancialManagementContent";
import MaintenanceRequestContent from "../pages/MaintenanceRequestContent/MaintenanceRequestContent";
import VehicleRentalHomepage from "../pages/VehicleHireService/VehicleRentalHomepage";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashboardCard/>}/>
      <Route path="/dashboard2" element={<MaintenanceRequestContent/>}/>
      <Route path="*" element={<NotFound />} />

      {/* Nested routes inside Layout (user account section) */}
      <Route path="/user" element={<Layout />}>
        <Route index path="account" element={<Profile />} />
        <Route path="favorite-cars" element={<CarFavorite />} />
        <Route path="my-cars" element={<MyCar />} />
        <Route path="my-trips" element={<MySrips />} />
        <Route path="long-term-rental" element={<RentailCar />} />
        <Route path="addresses" element={<UserAddresses />} />
        <Route path="gifts" element={<Gifts />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="delete-account" element={<DeleteAccount />} />
      </Route>
      
      <Route path="/vehicle" element={<VehicleRentalHomepage />} />
    </Routes>
  );
};

export default Routers;
