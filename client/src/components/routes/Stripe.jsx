import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import StripeCallback from "../../pages/stripe/StripeCallback";
import StripeSuccess from "../../pages/stripe/StripeSuccess";
import StripeCancel from "../../pages/stripe/StripeCancel";

const Stripe = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth.token ? (
    <Routes>
      <Route path="/callback" element={<StripeCallback />} />
      <Route path="/success/:roomId" element={<StripeSuccess />} />
      <Route path="/cancel" element={<StripeCancel />} />
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default Stripe;
