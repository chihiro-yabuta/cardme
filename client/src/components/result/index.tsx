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
      setComp(<iframe width={200} height={100} frameBorder='0'
      src={url(`mode=html&src=${src.data.Svg.EncSvg}`)} />);
    });
  };

  return (
    <>
      <button
        children={'update data'}
        onClick={ () => { getData() } }
      />
      {comp}
      <a href={apiURL} target='_blank'>{apiURL}</a>
    </>
  );
}