import React from 'react';
import { Header } from './components/header';
import { Playground } from './components/playground';
import { Result } from './components/result';

export const App = () => {
  return (
    <>
      <Header />
      <Playground />
      <Result />
    </>
  );
}