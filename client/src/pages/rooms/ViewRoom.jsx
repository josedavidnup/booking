import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { diffDays, getRoom } from "../../api/rooms";
import moment from "moment";
import { useSelector } from "react-redux";
import { getSessionId } from "../../api/stripe";
import { loadStripe } from "@stripe/stripe-js";

const ViewRoom = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState({});
  const [image, setImage] = useState("");
  const { auth } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const loadSellerRoom = async () => {
    const res = await getRoom(roomId);
    console.log(res);
    setRoom(res.data);
    setImage(`${import.meta.env.VITE_BASE_URL}/room/image/${res.data._id}`);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!auth.user) navigate("/login");
    const res = await getSessionId(auth.token, roomId);
    // console.log(res.data.sessionId);
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);
    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => console.log(result));
  };

  useEffect(() => {
    loadSellerRoom();
  }, []);

  return (
    <div>
      <h1>{room.title}</h1>
      <div>
        <img src={image} alt={room.title} />
      </div>
      <div>
        <b>{room.content}</b>
        <p>${room.price}</p>
        <span className="tracking-tight text-gray-900 dark:text-white">
          for {diffDays(room.from, room.to)}
          {diffDays(room.from, room.to) <= 1 ? " day" : " days"}
        </span>
        <p>
          From <br />{" "}
          {moment(new Date(room.from)).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
        <p>
          to <br />{" "}
          {moment(new Date(room.to)).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
        <i>Posted by {room.postedBy && room.postedBy.name} </i>

        <button
          onClick={handleClick}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {auth && auth.token ? "Book Now" : "Login to Book"}
        </button>
      </div>
    </div>
  );
};

export default ViewRoom;
