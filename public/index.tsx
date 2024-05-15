import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../ui/redux';
import { App } from '../ui';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);