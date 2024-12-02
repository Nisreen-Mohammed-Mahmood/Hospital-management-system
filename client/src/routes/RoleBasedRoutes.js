import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import PatientLayout from "../layouts/PatientLayout";
import GuestLayout from "../layouts/GuestLayout";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/Admin";
import DoctorDashboard from "../pages/Doctor/Doctor";
import Home from "../pages/Home";
import Register from "../pages/auth/Register";
import Appointments from "../pages/Patient/Appointments";
import Doctors from "../pages/Patient/Doctors";
import BillingHistory from "../pages/Patient/Billing";
import Profile from "../pages/Patient/Profile";

const RoleBasedRoutes = ({ role }) => {
  return (
    <Routes>
      {/* Guest Routes */}
      <Route element={<GuestLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      {/* Role-Based Routes */}
      {role && (
        <>
          {role === "admin" && (
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
          )}
          {role === "doctor" && (
            <Route element={<DoctorLayout />}>
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            </Route>
          )}
          {role === "patient" && (
            <Route element={<PatientLayout />}>
              <Route path="/patient/appointments" element={<Appointments />} />
              <Route path="/patient/doctors" element={<Doctors />} />
              <Route
                path="/patient/billingHistory"
                element={<BillingHistory />}
              />
              <Route path="/patient/profile" element={<Profile />} />
            </Route>
          )}
        </>
      )}
      {/* Fallback Route */}
      <Route path="*" element={<Login />} />{" "}
      {/* Redirect to login if no valid route */}
    </Routes>
  );
};

export default RoleBasedRoutes;
