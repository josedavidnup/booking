import React from "react";
import DashboardNav from "../../components/nav/DashboardNav";
import ConnectNav from "../../components/nav/ConnectNav";
import { Link } from "react-router-dom";

export const DashboardRoom = () => {
  return (
    <>
      <div>
        <ConnectNav />
      </div>
      <div className="flex justify-around bg-slate-700 text-white flex-col">
        <div>
          <DashboardNav />
        </div>
        <div>
          <div>
            <div>
              <h2>Your rooms</h2>
            </div>
            <div>
              <Link to={"/user/rooms/new"}>+ Add new</Link>
            </div>
          </div>
          {/* <p>Bookings and browser hotels</p> */}
        </div>
      </div>
    </>
  );
};
