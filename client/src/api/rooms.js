import axios from "axios";

export const createRoom = async (token, data) =>
  await axios.post(`/create-room`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const allRooms = async () => await axios.get(`/rooms`);

export const diffDays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  const difference = Math.round(Math.abs((start - end) / day));
  return difference;
};

export const sellerRooms = async (token) =>
  await axios.get(`/seller-rooms`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteRoom = async (token, roomId) =>
  await axios.delete(`/delete-room/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getRoom = async (roomId) => await axios.get(`/room/${roomId}`);

export const updateRoom = async (token, data, roomId) =>
  await axios.put(`/update-room/${roomId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
