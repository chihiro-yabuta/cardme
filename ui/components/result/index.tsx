import '../../index.css';
import React, { useState } from 'react';
import axios from 'axios';
import { GiFallingStar } from 'react-icons/gi';
import { VscDebugStart } from "react-icons/vsc";
import { store } from '../../redux';

export const Result = () => {
  const [apiURL, setApiURL] = useState('waiting...');
  const [comp, setComp] = useState(<p className='wait'>waiting...</p>);

  const getData = async () => {
    const url = `${location.href}post`;
    const base = store.getState().base64;
    setComp(<p className='wait'>Loading...</p>);
    await axios.post<{ key: string }>(url, { svg: base }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then((src) => {
      setApiURL(`${location.href}get/?key=${src.data.key}`);
      setComp(<img src={`${location.href}get/?key=${src.data.key}`} />);
    });
  };

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
          {comp}
        </div>
        <div className='urlarea'>
          <p className='url'>{`<a href="${location.href}" target="_blank"><img src="${apiURL}" /></a>`}</p>
        </div>
      </div>
    </div>
  );
}