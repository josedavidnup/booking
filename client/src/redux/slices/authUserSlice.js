import { createSlice } from "@reduxjs/toolkit";
import { setLoading } from "./loadingSlice";

let initialState = {
  user: null,
  token: null,
};

if (window.localStorage.getItem("auth")) {
  initialState = JSON.parse(window.localStorage.getItem("auth"));
} else {
  initialState = {
    user: null,
    token: null,
  };
}

export const authUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInUser: (state, { payload }) => {
      const { user, token } = payload;
      user.stripe_seller = JSON.parse(user.stripe_seller);
      state.user = user;
      state.token = token;
    },
    logOutUser: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { logInUser, logOutUser } = authUserSlice.actions;
export default authUserSlice.reducer;
