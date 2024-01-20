import { createSelector } from 'reselect';
import { RootState } from '../store';
import { Role } from './AuthSlice';

export const selectAuthState = (state: RootState) => state.auth;

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);

export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

export const selectUserRole = createSelector(
  [selectUser],
  (user) => user.role
);

export const selectIsAdmin = createSelector(
  [selectUserRole],
  (role) => role === Role.admin
);

export const selectIsUserReadOnly = createSelector(
  [selectUser],
  (user) => user.isReadOnly
);
