import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux';
import { Header } from './components/header';
import { Playground } from './components/playground';
import { Result } from './components/result';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Header />
    <Playground />
    <Result />
  </Provider>
);