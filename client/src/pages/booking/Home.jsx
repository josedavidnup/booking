import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allRooms } from "../../api/rooms";
import RoomCard from "../../components/cards/RoomCard";

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
    <main className="flex">
      <h1>All rooms</h1>
      {rooms.map((room) => (
        <RoomCard key={room._id} room={room} owner />
      ))}
    </main>
  );
};

export default Home;
