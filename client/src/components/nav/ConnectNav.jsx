import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const ConnectNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
        <div className="w-10 h-10 rounded-full bg-gray-600 flex justify-center items-center mr-3">
          {user.name[0]}
        </div>
        <div>
          <h2 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{`Joined ${moment(
            user.createdAt
          ).fromNow()}`}</p>
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
