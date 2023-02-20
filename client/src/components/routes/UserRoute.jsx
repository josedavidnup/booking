import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "../../pages/user/Dashboard";
import { DashboardRoom } from "../../pages/user/DashboardRoom";

const UserRoute = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth.token ? (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="dashboard/rooms" element={<DashboardRoom />} />
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default UserRoute;
