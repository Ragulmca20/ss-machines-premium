// authSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../Auth/AuthSlice";

interface AdminState {
  users: User[];
}

const initialState: AdminState = {
  users: []
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUserlist: (state, action) => {
      state.users = action.payload;
    },
    updateUserlist: (state, action) => {
      state.users = state.users.map((user: User) =>
        user.id === action.payload.id
          ? { ...user, ...action.payload.data }
          : user
      );
    },
    resetAdminState: (state) => {
      return initialState
    }
  },
});

export const { setUserlist } = adminSlice.actions;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const adminActions = adminSlice.actions;
export default adminSlice.reducer;
