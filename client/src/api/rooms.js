import axios from "axios";

export const createRoom = async (token, data) =>
  await axios.post(`/create-hotel`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
