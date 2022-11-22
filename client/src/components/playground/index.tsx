import '../../index.css';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { css as langCSS } from '@codemirror/lang-css';
import { slice } from '../../redux';
import { SVG, defaultJSX, defaultCSS } from './svg';

export const Playground = () => {
  const [name, setName] = useState('Google');
  const [jsx, setJSX] = useState(defaultJSX);
  const [css, setCSS] = useState(defaultCSS);
  const [idx, setIdx] = useState(0);
  const dispatch = useDispatch();
  const { sendName } = slice.actions;
  useEffect(() => { dispatch(sendName(name)); }, []);
  const code = [
    <SVG name={name} css={css} jsx={jsx} />,
    <CodeMirror
      value={jsx}
      width='800px'
      theme={vscodeDark}
      extensions={[javascript({ jsx: true })]}
      onChange={(value) => {
        setJSX(value);
      }}
    />,
    <CodeMirror
      value={css}
      width='800px'
      theme={vscodeDark}
      extensions={[langCSS()]}
      onChange={(value) => {
        setCSS(value);
      }}
    />
  ];

  return (
    <div className='center'>
      <div className='namearea'>
        <input
          type={'text'}
          value={name}
          onChange={(e) => {
            dispatch(sendName(e.target.value));
            setName(e.target.value);
          }}
        />
      </div>
      <div className='btnarea'>
        <button
          children='svg'
          onClick={ () => setIdx(0) }
        />
        <button
          children='jsx'
          onClick={ () => setIdx(1) }
        />
        <button
          children='css'
          onClick={ () => setIdx(2) }
        />
      </div>
      <div className='textarea'>
        {code[idx]}
      </div>
    </div>
  );
}