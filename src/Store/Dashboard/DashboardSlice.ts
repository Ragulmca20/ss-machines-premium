// authSlice.ts

import { createSlice } from "@reduxjs/toolkit";

export interface Machine {
  machineValue1: string;
  machineValue2: string;
  filePath: string;
  id: string;
  userId: string;
}
interface DashboardState {
  dashboard: Machine[];
  isLoading: boolean;
}

const initialState: DashboardState = {
  dashboard: [],
  isLoading: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardDetails: (state, action) => {
      state.dashboard = action.payload;
    },
    setLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    resetDashboardState: (state) => {
      return initialState;
    },
  },
});

export const { setDashboardDetails } = dashboardSlice.actions;
export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice.reducer;
