import React, { useEffect } from "react";
import { SpinningCircles } from "react-loading-icons";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInLocalStorage } from "../api/auth";
import { getAccountStatus } from "../api/stripe";

const StripeCallback = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const accountStatus = async () => {
    try {
      const res = await getAccountStatus(auth.token);
      res.data.stripe_seller = JSON.parse(res.data.stripe_seller);
      updateUserInLocalStorage(res.data, () => {
        dispatch(logInUser(res.data));
        window.location.href = "user/rooms";
      });
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
