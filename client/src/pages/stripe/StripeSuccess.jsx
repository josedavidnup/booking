import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { stripeSuccessRequest } from "../../api/stripe";

const StripeSuccess = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    stripeSuccessRequest(token, roomId).then((res) => {
      if (res.data.success) {
        navigate("/user/dashboard");
      } else {
        navigate("/stripe/cancel");
      }
    });
  }, [roomId]);

  return <div>Stripe Success</div>;
};

export default StripeSuccess;
