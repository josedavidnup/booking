import React from "react";
import { Link } from "react-router-dom";
import ConnectNav from "../../components/nav/ConnectNav";
import DashboardNav from "../../components/nav/DashboardNav";

const Dashboard = () => {
  return (
    <>
      <div>
        <ConnectNav />
      </div>
      <div className="flex justify-around bg-slate-700 flex-cols text-white flex-col">
        <div>
          <DashboardNav />
        </div>
        <div>
          <div>
            <div>
              <h2>Your bookings</h2>
            </div>
            <div>
              <Link to={"/"}>Browse hotels</Link>
            </div>
          </div>
          {/* <p>Bookings and browser hotels</p> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
