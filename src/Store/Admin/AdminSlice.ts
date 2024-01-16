// authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '@firebase/auth';

interface AdminState {
  users:User[];
  isLoading?:boolean;
}


const initialState: AdminState = {
  users: [],
  isLoading:false
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUserlist: (state, action) => {
      state.users = action.payload;
    },
    setLoadingState: (state,action) =>{
      state.isLoading= action.payload;
    }
  },
});

export const { setUserlist } = adminSlice.actions;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const adminActions = adminSlice.actions;
export default adminSlice.reducer;
