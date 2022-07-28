import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as usersService from '../../services/users';

import { REQUEST_STATUS } from '../../shared/constants';

const SLICE_NAME = 'users';

const initialState = {
  users: [],
  status: REQUEST_STATUS.IDLE,
  error: null,
};

export const fetchUsers = createAsyncThunk(`${SLICE_NAME}/fetchUsers`, async () => await usersService.fetchUsers());

const usersSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = REQUEST_STATUS.LOADING;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;

export const selectAllUsers = state => state.users.users;
export const selectUsersStatus = state => state.users.status;
export const selectUsersError = state => state.users.error;
