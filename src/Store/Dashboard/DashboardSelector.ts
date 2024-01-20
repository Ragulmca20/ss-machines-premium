import { createSelector } from 'reselect';
import { RootState } from '../store'; // Assuming you have a RootState type

// Select the dashboard state from the root state
const selectDashboardState = (state: RootState) => state.dashboard;

// Select the dashboard array
export const selectDashboard = createSelector(
  [selectDashboardState],
  (dashboardState) => dashboardState.dashboard
);

// Select the loading state
export const selectLoadingState = createSelector(
  [selectDashboardState],
  (dashboardState) => dashboardState.isLoading
);
