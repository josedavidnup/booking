import axios from "axios";

export const createConnectAccount = async (token) =>
  await axios.post(
    `/create-connect-account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getAccountStatus = async (token) =>
  await axios.post(
    `/get-account-status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getAccountBalance = async (token) =>
  await axios.post(
    `/get-account-balance`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const currencyFormatter = (data) => {
  return (data.amount / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};

export const payoutSetting = async (token) =>
  await axios.post(
    `/payout-setting`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getSessionId = async (token, roomId) =>
  await axios.post(
    `/stripe-session-id`,
    { roomId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const stripeSuccessRequest = async (token, roomId) =>
  await axios.post(
    `/stripe-success`,
    { roomId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
