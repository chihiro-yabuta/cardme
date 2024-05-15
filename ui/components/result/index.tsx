import '../../index.css';
import React, { useState } from 'react';
import axios from 'axios';
import { GiFallingStar } from 'react-icons/gi';
import { VscDebugStart } from 'react-icons/vsc';
import { store } from '../../redux';

export const Result = () => {
  const [apiURL, setApiURL] = useState('waiting...');
  const [title, setTitle] = useState('click below!');

  const getData = async () => {
    const url = `${location.href}post`;
    const base = store.getState().base64;
    await axios.post<{ key: string }>(url, { svg: base }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then((src) => {
      setApiURL(`${location.href}get/?key=${src.data.key}`);
    });
  };
  const el = `<a href="${location.href}" target="_blank"><img src="${apiURL}" /></a>`;

  return (
    <div className='center'>
      <div className='optarea'>
        <button
          className='showbtn'
          onClick={ () => getData() }
        >show result <VscDebugStart /></button>
        <a
          className='repolink'
          href={'https://github.com/chihiro-yabuta/cardme'}
          target='_blank'
        >stargazing <GiFallingStar /></a>
      </div>
      <div className='resultarea'>
        <div className='imgarea'>
          {apiURL == 'waiting...' ? <p className='wait'>waiting...</p> : <img src={apiURL} />}
        </div>
        <div className='urlarea'>
          <p className='clicktitle'>{title}</p>
          <p
            className='url'
            onClick={() => {
              setTitle('copied!');
              navigator.clipboard.writeText(el);
              setTimeout(() => {
                setTitle('click below!');
              }, 5 * 1000);
            }}
            children={el}
          />
        </div>
      </div>
    </div>
  );
}