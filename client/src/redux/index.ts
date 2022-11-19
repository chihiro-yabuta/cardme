import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  jsx: '',
  css: '',
  base64: '',
};

export const slice = createSlice({
  name: 'slice',
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
    sendBase64(state, action: PayloadAction<string>) {
      state.base64 = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: slice.reducer
});