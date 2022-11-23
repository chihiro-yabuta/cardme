import '../../index.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Data } from '../../api/data';
import { store } from '../../redux';

export const Result = () => {
  const url = (query: string) => `http://${location.hostname}:8080/?${query}`;
  const [apiURL, setApiURL] = useState('push button');
  const [comp, setComp] = useState(<p>push button</p>);

  const getData = async () => {
    const base = store.getState().base64;
    setApiURL('Loading...');
    setComp(<p>Loading...</p>);
    await axios.get<Data>(url(`name=${store.getState().name}&raw=${base}`)).then((src) => {
      setApiURL(url(`mode=html&src=${src.data.Svg.EncSvg}`));
      setComp(<img src={url(`mode=html&src=${src.data.Svg.EncSvg}`)} />);
    });
  };

  return (
    <div className='center'>
      <div className='showbtnarea'>
        <button
          className='showbtn'
          children={'show result'}
          onClick={ () => getData() }
        />
      </div>
      <div>
        <div className='imgarea'>
          {comp}
        </div>
        <div className='urlarea'>
          <a href={apiURL} target='_blank' className='url'>{apiURL}</a>
        </div>
      </div>
    </div>
  );
}