import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectAdminState = (state: RootState) => state.admin;

export const selectUserList = createSelector(
  [selectAdminState],
  (adminState) => adminState.users
);

export const selectUserById = (userId: string) =>
  createSelector([selectUserList], (users) =>
    users.find((user) => user.id === userId)
  );
