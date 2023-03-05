import React, { useState, useEffect } from "react";
import DashboardNav from "../../components/nav/DashboardNav";
import ConnectNav from "../../components/nav/ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createConnectAccount } from "../../api/stripe";
import { toast } from "react-toastify";
import logoStripe from "../../assets/images/stripe-connect.svg";
import { sellerRooms } from "../../api/rooms";
import RoomCard from "../../components/cards/RoomCard";

export const DashboardRoom = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res);
      window.location.href = res.data;
    } catch (error) {
      console.log(error);
      toast.error("Stripe connect failed. Try again later");
      setLoading(false);
    }
  };

  const loadSellerRooms = async () => {
    const { data } = await sellerRooms(auth.token);
    setRooms(data);
  };

  useEffect(() => {
    loadSellerRooms();
  }, []);

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
      <div className="flex">
        {rooms.map((room) => (
          <RoomCard
            key={room._id}
            room={room}
            showViewMoreButton={false}
            owner={true}
          />
        ))}
      </div>
    </div>
  );

  const notConnected = () => (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-around">
        <div>
          <h4 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
            Setup payouts to post your rooms
          </h4>
          <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
            <img src={logoStripe} alt="" className="h-5" />
            <span
              onClick={handleClick}
              className="flex-1 ml-3 whitespace-nowrap"
              disabled={loading}
            >
              {loading ? "Processing..." : "Stripe Connect wallet"}
            </span>
          </div>
          <p>
            <small>
              You'll be redirected to stripe to complete the onboarding process
            </small>
          </p>
          <div>
            <a
              href="#"
              className="text-sm font-normal text-gray-500 dark:text-gray-400"
            >
              Why do I need to connect with my wallet?
            </a>
            <p className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
              Booking partners with stripe to transfer earnings to your bank
              account
            </p>
          </div>
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
