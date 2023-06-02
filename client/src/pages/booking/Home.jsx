import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allRooms } from '../../api/rooms';
import RoomCard from '../../components/cards/RoomCard';
import Search from '../../components/forms/Search';

const Home = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [rooms, setRooms] = useState([]);

  const loadAllRooms = async () => {
    let res = await allRooms();
    setRooms(res.data);
  };

  useEffect(() => {
    loadAllRooms();
  }, []);

  return (
    <main className='flex flex-col items-center'>
      <div className='w-full max-w-3xl p-4'>
        <Search />
      </div>
      <h1 className='text-2xl font-semibold mt-8'>All rooms</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </main>
  );
};

export default Home;
