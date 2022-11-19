import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  base64: '',
};

export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    sendName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    sendBase64(state, action: PayloadAction<string>) {
      state.base64 = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: slice.reducer
});