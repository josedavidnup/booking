import React from "react";
import DashboardNav from "../../components/nav/DashboardNav";
import ConnectNav from "../../components/nav/ConnectNav";

export const DashboardRoom = () => {
  return (
    <>
      <div>
        <h1>Dashboard Room</h1>
      </div>
      <div className="flex justify-around bg-slate-700 text-white">
        <div>
          <ConnectNav />
        </div>
        <div>
          <DashboardNav />
        </div>
        <div>
          <p>My rooms</p>
        </div>
      </div>
    </>
  );
};
