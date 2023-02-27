import React, { useState } from "react";
import DashboardNav from "../../components/nav/DashboardNav";
import ConnectNav from "../../components/nav/ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineHome } from "react-icons/ai";
import { createConnectAccount } from "../../api/stripe";
import { toast } from "react-toastify";

export const DashboardRoom = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res);
      window.location.href = res;
    } catch (error) {
      console.log(error);
      toast.error("Stripe connect failed. Try again later");
      setLoading(false);
    }
  };

  const connected = () => (
    <div>
      <div className="flex justify-around">
        <div>
          <h2>Your rooms</h2>
        </div>
        <div>
          <Link to={"/user/rooms/new"}>+ Add new</Link>
        </div>
      </div>
    </div>
  );

  const notConnected = () => (
    <div>
      <div className="flex justify-around">
        <div>
          <AiOutlineHome />
          <h4>Setup payouts to post your rooms</h4>
          <p>
            Booking partners with stripe to transfer earnings to your bank
            account
          </p>
          <button
            onClick={handleClick}
            className="border-2 border-green-700 bg-green-700 rounded p-3"
            disabled={loading}
          >
            {loading ? "Processing..." : "Setup Payouts"}
          </button>
          <p>
            <small>
              You'll be redirected to stripe to complete the onboarding process
            </small>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div>
        <ConnectNav />
      </div>
      <div className="flex justify-around bg-slate-700 text-white flex-col">
        <div>
          <DashboardNav />
        </div>

        {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled
          ? connected()
          : notConnected()}
      </div>
    </>
  );
};
