import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  jsx: '',
  css: '',
};

export const slice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    sendName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    sendJSX(state, action: PayloadAction<string>) {
      state.jsx = action.payload;
    },
    sendCSS(state, action: PayloadAction<string>) {
      state.css = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: slice.reducer
});