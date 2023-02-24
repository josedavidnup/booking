import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const ConnectNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  return (
    <div className="flex justify-around items-center">
      <div className="flex">
        <div className="w-10 h-10 rounded-full bg-gray-600 flex justify-center items-center mr-3">
          {user.name[0]}
        </div>
        <div>
          <h2>{user.name}</h2>
          <p>{`Joined ${moment(user.createdAt).fromNow()}`}</p>
        </div>
      </div>
      {auth.token &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled && (
          <>
            <div>Pending balance</div>
            <div>Payout settings</div>
          </>
        )}
    </div>
  );
};

export default ConnectNav;
