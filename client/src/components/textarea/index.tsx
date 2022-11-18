import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { css as langCSS } from '@codemirror/lang-css';
import { slice } from '../../redux';
const defaultJsx =
`<Container width={200} height={100}>
  <Rect width={200} height={100} rx={10} ry={10} className='rect' />
  <Text x={10} y={30} children='Hello World' className='hello' />
</Container>`
const defaultCss =
`@keyframes anime {
  from {
    transform: translate(0%, 0%);
  } to {
    transform: translate(50%, 100%);
  }
}
.rect {
  fill: white;
  stroke: black;
  stroke-width: 3;
}
.hello {
  fill: red;
  animation: anime 3s both 1s infinite;
}`

export const TextArea = () => {
  const [name, setName] = useState('Google');
  const [jsx, setJSX] = useState(defaultJsx);
  const [css, setCSS] = useState(defaultCss);
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
        width="1000px"
        theme={vscodeDark}
        extensions={[javascript({ jsx: true })]}
        onChange={(value) => {
          dispatch(sendJSX(value));
          setJSX(value);
        }}
      />
      <CodeMirror
        value={css}
        width="1000px"
        theme={vscodeDark}
        extensions={[langCSS()]}
        onChange={(value) => {
          dispatch(sendCSS(value));
          setCSS(value);
        }}
      />
    </>
  );
}