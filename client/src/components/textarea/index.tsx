import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { css as langCSS } from '@codemirror/lang-css';
import { slice } from '../../redux';
import { SVG, defaultJSX, defaultCSS } from './svg';

export const TextArea = () => {
  const [name, setName] = useState('Google');
  const [jsx, setJSX] = useState(defaultJSX);
  const [css, setCSS] = useState(defaultCSS);
  const dispatch = useDispatch();
  const { sendName, sendJSX, sendCSS } = slice.actions;
  useEffect(()=>{dispatch(sendName(name));dispatch(sendJSX(jsx));dispatch(sendCSS(css));},[]);

  return (
    <>
      <input
        type={'text'}
        value={name}
        onChange={(e) => {
          dispatch(sendName(e.target.value));
          setName(e.target.value);
        }}
      />
      <CodeMirror
        value={jsx}
        width="75%"
        theme={vscodeDark}
        extensions={[javascript({ jsx: true })]}
        onChange={(value) => {
          dispatch(sendJSX(value));
          setJSX(value);
        }}
      />
      <CodeMirror
        value={css}
        width="75%"
        theme={vscodeDark}
        extensions={[langCSS()]}
        onChange={(value) => {
          dispatch(sendCSS(value));
          setCSS(value);
        }}
      />
      <SVG />
    </>
  );
}