import axios from "axios";

export const createConnectAccount = async (token) =>
  await axios.post(
    `/create-connect-account`,
    {},
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
