import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reduxStore/users/usersSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
  },
});
