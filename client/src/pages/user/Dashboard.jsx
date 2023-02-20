import React from "react";
import ConnectNav from "../../components/nav/ConnectNav";
import DashboardNav from "../../components/nav/DashboardNav";

const Dashboard = () => {
  return (
    <>
      <div>
        <h1>Dashboard</h1>
      </div>
      <div className="flex justify-around bg-slate-700 flex-cols">
        <div>
          <ConnectNav />
        </div>
        <div>
          <DashboardNav />
        </div>
        <div>
          <p>Bookings and browser hotels</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
