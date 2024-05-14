import '../../index.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoRocket } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { css as langCSS } from '@codemirror/lang-css';
import { slice } from '../../redux';
import { User } from '../../api/data';
import { defaultJSX, defaultCSS, options, userMap } from '../example';
import { SVG } from './svg';

export const Playground = () => {
  const [name, setName] = useState('Google');
  const [jsx, setJSX] = useState(defaultJSX);
  const [css, setCSS] = useState(defaultCSS);
  const [idx, setIdx] = useState(0);
  const [user, setUser]: [User, Function] = useState(null);

  const url =`${location.href}api` + (name && `?name=${name}`);
  const getData = async () => await axios.get<User>(url).then((api) => {
    setUser(api.data);
  });

  const dispatch = useDispatch();
  useEffect(() => { dispatch(slice.actions.sendName(name)); getData(); }, [idx]);
  const code = [
    <SVG user={user} css={css} jsx={jsx} />,
    <CodeMirror
      value={jsx} width='800' theme={vscodeDark} extensions={[javascript({ jsx: true })]}
      onChange={ (value) => setJSX(value) } />,
    <CodeMirror
      value={css} width='800' theme={vscodeDark} extensions={[langCSS()]}
      onChange={ (value) => setCSS(value) } />,
    <CodeMirror
      value={options} width='800' theme={vscodeDark}
      extensions={[javascript({ jsx: true })]} readOnly />,
    <CodeMirror
      value={userMap} width='800' theme={vscodeDark}
      extensions={[javascript()]} readOnly />,
  ];
  const btn = ['svg', 'jsx', 'css', 'opt', 'usr'].map((s, i) => (
    <button
      className='btnelement'
      style={{ backgroundColor: idx === i ? '#646567' : '#848587' }}
      children={s}
      onClick={ () => setIdx(i) }
    />
  ));

  return (
    <div className='center'>
      <div className='optarea'>
        <div className='btnarea'>
          {btn}
        </div>
        <div className='namearea'>
          <p><IoRocket /> Your GitHub Name↓</p>
          <input
            type={'text'}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
      </div>
      <div className='textarea'>
        {code[idx]}
      </div>
    </div>
  );
}