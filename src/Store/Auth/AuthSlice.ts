// authSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  isAuthenticated: boolean;
  user: User;
  isLoading: boolean;
}
export enum Role {
  admin = "Admin",
  user = "User",
}
export interface User {
  id: string;
  email: string;
  role: Role;
  isReadOnly: boolean;
}
const initialState: AuthState = {
  isAuthenticated: false,
  user: { id: "", email: "", role: Role.user, isReadOnly: false },
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    saveUserData: (state, action) => {
      state.user = action.payload;
    },
    resetAuthState: (state) => {
      return initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const authActions = authSlice.actions;
export default authSlice.reducer;
