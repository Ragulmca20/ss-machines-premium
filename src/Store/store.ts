// store.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./Auth/AuthSlice"
import adminReducer from "./Admin/AdminSlice"
import dashboardReducer from "./Dashboard/DashboardSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    dashboard: dashboardReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
