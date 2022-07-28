import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as toDosService from '../../services/todos';

import { REQUEST_STATUS } from '../../shared/constants';

const SLICE_NAME = 'toDos';

const initialState = {
  toDos: [],
  status: REQUEST_STATUS.IDLE,
  error: null,
};

export const fetchToDos = createAsyncThunk(`${SLICE_NAME}/fetchToDos`, async userId => await toDosService.fetchToDos(userId));

const toDosSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    toggleToDo(state, action) {
      const { id, completed } = action.payload;
      const existingToDo = state.toDos.find(toDo => toDo.id === id);
      existingToDo.completed = !completed;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchToDos.pending, (state) => {
        state.status = REQUEST_STATUS.LOADING;
      })
      .addCase(fetchToDos.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.toDos = action.payload;
      })
      .addCase(fetchToDos.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.error.message;
      });
  }
});

export const { toggleToDo } = toDosSlice.actions;

export default toDosSlice.reducer;

export const selectAllToDos = state => state.toDos.toDos;
export const selectToDoStatus = state => state.toDos.status;
export const selectToDosError = state => state.toDos.error;
export const selectToDoById = toDoId => state => state.toDos.toDos.find(toDo => toDo.id === toDoId);
