import { authActions } from './Auth/AuthSlice';
// store.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./Auth/AuthSlice"
import adminReducer, { adminActions } from "./Admin/AdminSlice"
import dashboardReducer, { dashboardActions } from "./Dashboard/DashboardSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    dashboard: dashboardReducer
  },
});
export const resetRootState = () => {
  return (dispatch:any) => {
    dispatch(authActions.resetAuthState());
    dispatch(adminActions.resetAdminState());
    dispatch(dashboardActions.resetDashboardState());
  };
};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
