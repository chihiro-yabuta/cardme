import React from 'react';
import { TextArea } from './components/textarea';
import { Result } from './components/result';
import { Canvas } from './components/svg-canvas';

export const App = () => {
  return (
    <>
      <TextArea />
      <Result />
      <div>
        <Canvas />
      </div>
    </>
  );
}