import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "../../pages/user/Dashboard";
import { DashboardRoom } from "../../pages/user/DashboardRoom";
import NewRoom from "../../pages/rooms/NewRoom";
import StripeCallback from "../../stripe/StripeCallback";
import EditRoom from "../../pages/rooms/EditRoom";

const UserRoute = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth.token ? (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="rooms" element={<DashboardRoom />} />
      <Route path="rooms/new" element={<NewRoom />} />
      <Route path="stripe/callback" element={<StripeCallback />} />
      <Route path="room/edit/:roomId" element={<EditRoom />} />
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default UserRoute;
