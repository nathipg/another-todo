import { configureStore } from '@reduxjs/toolkit';

import { errorSlice, loginSlice, toDosSlice, usersSlice } from './slices';

export const store = configureStore({
  reducer: {
    error: errorSlice,
    login: loginSlice,
    toDos: toDosSlice,
    users: usersSlice,
  },
});
