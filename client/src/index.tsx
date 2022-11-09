import React from 'react';
import { TextArea } from './components/textarea';
import { Result } from './components/result';
import { Svg } from './components/svg';

export const App = () => {
  return (
    <>
      <TextArea />
      <Result />
      <Svg />
    </>
  );
}