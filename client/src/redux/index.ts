import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  name: 'Google'
};

export const slice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    sendName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    }
  },
});

export const store = configureStore({
  reducer: slice.reducer
});