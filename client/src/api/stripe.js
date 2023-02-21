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

export const getAccountStatus = async (token) =>
  await axios.post(
    `/get-account-status`,
    {},
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
