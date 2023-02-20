import React from "react";
import { Link } from "react-router-dom";

const DashboardNav = () => {
  return (
    <ul className="flex ">
      <li>
        <Link to={"/user/dashboard"}>Your bookings</Link>
      </li>
      <li>
        <Link to={"/user/rooms"}>Your rooms</Link>
      </li>
    </ul>
  );
};

export default DashboardNav;
