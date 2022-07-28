import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'error';

const initialState = {
  code: null,
  message: null,
};

const errorSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setError(state, action) {
      const { code, message } = action.payload;
      state.code = code;
      state.message = message;
    },
  },
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;

export const selectError = state => state.error;
