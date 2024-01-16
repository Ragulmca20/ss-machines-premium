// authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthState {
  isAuthenticated: boolean;
  user: User,
  isLoading:boolean;
}
export enum Role {
  admin = "Admin",
  user = "User"
}
export interface User {
  id: string,
  email: string,
  role: Role;
  isReadonly: boolean;
}
const initialState: AuthState = {
  isAuthenticated: false,
  user: { id: "", email: "", role: Role.user, isReadonly: false },
  isLoading:false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    saveUserData: (state, action) => {
      state.user = action.payload
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const authActions = authSlice.actions;
export default authSlice.reducer;