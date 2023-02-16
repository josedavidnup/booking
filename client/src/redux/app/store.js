import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "../slices/authUserSlice";
import loadingReducer from "../slices/loadingSlice";
import errorReducer from "../slices/errorSlice";

export default configureStore({
  reducer: {
    user: authUserReducer,
    loading: loadingReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
