import React from "react";
import { Link } from "react-router-dom";

const DashboardNav = () => {
  return (
    <ul className="flex m-10">
      <li className="mr-5">
        <Link to={"/user/dashboard"}>Your bookings</Link>
      </li>
      <li>
        <Link to={"/user/rooms"}>Your rooms</Link>
      </li>
    </ul>
  );
};

export default DashboardNav;
