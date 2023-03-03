import axios from "axios";

export const createRoom = async (token, data) =>
  await axios.post(`/create-room`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
