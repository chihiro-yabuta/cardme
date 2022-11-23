import '../../index.css';
import React, { useState } from 'react';
import axios from 'axios';
import { GiFallingStar } from 'react-icons/gi';
import { VscDebugStart } from "react-icons/vsc";
import { Data } from '../../api/data';
import { store } from '../../redux';

export const Result = () => {
  const [apiURL, setApiURL] = useState('waiting...');
  const [comp, setComp] = useState(<p className='wait'>waiting...</p>);

  const getData = async () => {
    const name = `?name=${store.getState().name}&`;
    const url = (query: string) => `http://${location.hostname}:8080/${name+query}`;
    const base = store.getState().base64;
    setComp(<p className='wait'>Loading...</p>);
    await axios.get<Data>(url(`raw=${base}`)).then((src) => {
      setApiURL(url(`mode=html&src=${src.data.Svg.EncSvg}`));
      setComp(<img src={url(`mode=html&src=${src.data.Svg.EncSvg}`)} />);
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
          <p className='url'>{`<img src="${apiURL}" />`}</p>
        </div>
      </div>
    </div>
  );
}