import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userRoomBookings } from "../../api/rooms";
import ConnectNav from "../../components/nav/ConnectNav";
import DashboardNav from "../../components/nav/DashboardNav";
import { useSelector } from "react-redux";
import BookingCard from "../../components/cards/BookingCard";

const Dashboard = () => {
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));
  const [bookings, setBookings] = useState([]);

  const loadUserBookings = async () => {
    const res = await userRoomBookings(token);
    setBookings(res.data);
  };

  useEffect(() => {
    loadUserBookings();
  }, []);

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
          <div className="flex justify-around">
            <div>
              <h2>Your bookings</h2>
            </div>
            <div>
              <Link to={"/"}>Browse hotels</Link>
            </div>
          </div>
          <div>
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                room={booking.room}
                session={booking.session}
                orderedBy={booking.orderedBy}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
