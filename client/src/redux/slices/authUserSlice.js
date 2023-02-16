import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoading } from "./loadingSlice";

const initialState = {};

export const logInUser = createAsyncThunk(
  "user/getCurrentUser",
  async (token, { dispatch }) => {
    dispatch(setLoading(true));
    const user = await currentUser(token);
    const data = {
      _id: user.data._id,
      name: user.data.name,
      email: user.data.email,
      role: user.data.role,
      token,
    };
    dispatch(getUser(data));
  }
);

export const authUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
    },
    logOutUser: (state, action) => {
      state._id = null;
      state.name = null;
    },
  },
});

export const { signInUser, logOutUser } = authUserSlice.actions;
export default authUserSlice.reducer;
