import React, { useEffect } from "react";
import { SpinningCircles } from "react-loading-icons";
import { useSelector, useDispatch } from "react-redux";
import { getAccountStatus } from "../api/stripe";

const StripeCallback = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const accountStatus = async () => {
    try {
      const res = await getAccountStatus(auth.token);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth && auth.token) accountStatus();
  }, [auth]);

  return (
    <div className="flex justify-center items-center">
      <SpinningCircles stroke="#98ff98" speed={0.75} />
    </div>
  );
};

export default StripeCallback;
