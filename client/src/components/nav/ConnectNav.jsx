import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { getAccountBalance, payoutSetting } from "../../api/stripe";
import { currencyFormatter } from "../../api/stripe";
import { AiFillSetting } from "react-icons/ai";
import { toast } from "react-toastify";

const ConnectNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user, token } = auth;
  const [balance, setBalance] = useState(0);

  const handlePayoutSettings = async () => {
    try {
      const res = await payoutSetting(token);
      console.log(`Response for payout setting link`);
      // window.location.href = res.data.url;
      window.open(res.data.url);
    } catch (error) {
      console.log(error);
      toast.error(`Unable to access settings. Try again`);
    }
  };

  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      setBalance(res.data);
    });
  }, []);

  return (
    <div className="flex justify-around">
      <div className="w-full flex justify-between items-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex justify-center items-center mr-3">
            {user.name[0]}
          </div>
          <div>
            <h2 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user.name}
            </h2>
            <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
              <svg
                aria-hidden="true"
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {`Joined ${moment(user.createdAt).fromNow()}`}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        {auth.token &&
          auth.user &&
          auth.user.stripe_seller &&
          auth.user.stripe_seller.charges_enabled && (
            <>
              <div className="w-full flex justify-between items-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {balance &&
                  balance.pending &&
                  balance.pending.map((bp, i) => (
                    <div className="flex justify-end px-4 pt-4" key={i}>
                      <h2 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        {currencyFormatter(bp)}
                      </h2>
                    </div>
                  ))}
              </div>
              <button
                type="button"
                onClick={handlePayoutSettings}
                className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
              >
                <AiFillSetting />
                Payouts
              </button>
            </>
          )}
      </div>
    </div>
  );
};

export default ConnectNav;
