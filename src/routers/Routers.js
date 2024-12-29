import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import RentCar from "../pages/RentCar";
import NotFound from "../pages/NotFound";
// import Contact from "../pages/Contact";
import Register from "../pages/User/Register";
import Login from "../pages/User/Login";
import Layout from "../components/Shared/Layout";
import Profile from "../pages/User/Profile";
import AddCar from "../pages/User/AddCar";
import ChangePassword from "../pages/User/ChangePassword";
import Bill from "../pages/User/Bill";
import Payment from "../pages/Payment";
import ForgotPassword from "../pages/User/ForgotPassword";
import ResetForgotPassword from "../pages/User/ResetForgotPassword";
import VerifyOTP from "../pages/User/VerifyOTP";
import RegisterIndividual from "../pages/User/RegisterIndividual";
import RegisterBusiness from "../pages/User/RegisterBusiness";
import MyCar from "../pages/User/MyCar";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/rent/:slug" element={<RentCar />} />
      <Route path="/payment/:agreementId" element={<Payment />} />
      {/* <Route path="/contact" element={<Contact />} /> */}
      <Route path="/register" element={<Register />} />
      <Route path="/register-individual" element={<RegisterIndividual />} />
      <Route path="/register-business" element={<RegisterBusiness />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="*" element={<NotFound />} />

      {/* Nested routes inside Layout (user account section) */}
      <Route path="/user" element={<Layout />}>
        <Route index path="account" element={<Profile />} />
        <Route path="add-car" element={<AddCar />} />
        <Route path="my-car" element={<MyCar />} />
        <Route path="bill" element={<Bill />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
};

export default Routers;
