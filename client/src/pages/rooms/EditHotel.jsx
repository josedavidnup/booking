import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DatePicker } from "antd";
import { getHotel } from "../../api/rooms";

const EditHotel = () => {
  const { roomId } = useParams();

  const loadSellerHotel = async () => {
    const res = await getHotel(roomId);
    console.log(res);
  };

  useEffect(() => {
    console.log(roomId);
    loadSellerHotel();
  }, []);

  return (
    <div>
      <h2>Edit Hotel</h2>
    </div>
  );
};

export default EditHotel;
