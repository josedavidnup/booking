import React from "react";
import { Link } from "react-router-dom";

const DashboardNav = () => {
  return (
    <ul className="flex flex-col">
      <li>
        <Link to={"/user/dashboard"}>My bookings</Link>
      </li>
      <li>
        <Link to={"/user/dashboard/rooms"}>My rooms</Link>
      </li>
    </ul>
  );
};

export default DashboardNav;
