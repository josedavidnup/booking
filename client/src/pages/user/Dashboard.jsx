import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userRoomBookings } from '../../api/rooms';
import ConnectNav from '../../components/nav/ConnectNav';
import DashboardNav from '../../components/nav/DashboardNav';
import { useSelector } from 'react-redux';
import BookingCard from '../../components/cards/BookingCard';

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
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='w-full '>
          <ConnectNav />
        </div>
        <gidiv className='bg-slate-700 text-white rounded-lg p-4'>
          <div>
            <DashboardNav />
          </div>
          <div className='mt-4'>
            <div className='flex flex-col sm:flex-row justify-between'>
              <div>
                <h2 className='text-xl font-semibold'>Your bookings</h2>
              </div>
              <div className='mt-2 sm:mt-0'>
                <Link to='/' className='text-blue-500 underline'>
                  Browse hotels
                </Link>
              </div>
            </div>
            <div className='mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
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
        </gidiv>
      </div>
    </>
  );
};

export default Dashboard;
