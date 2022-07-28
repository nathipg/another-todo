import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'login';

const initialState = {
  loggedUser: null,
};

const loginSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    login(state, action) {
      state.loggedUser = action.payload;
    },
    logout(state) {
      state.loggedUser = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;

export const selectLoggedUser = state => state.login.loggedUser;
