import React, { useState } from 'react';
import axios from 'axios';
import { Data } from '../../api/data';
import { store } from '../../redux';

export const Result = () => {
  const locate = (query: string) => `http://${location.hostname}:8080/?${query}`;
  const [url, setURL] = useState('push button');
  const [comp, setComp] = useState(<p>push button</p>);
  const base = store.getState().base64;

  const getData = async () => {
    setURL('push button');
    setComp(<p>push button</p>);
    await axios.get<Data>(locate(`raw=${base}`)).then((src) => {
      setURL(locate(`mode=html&src=${src.data.Svg.EncSvg}`));
      setComp(<iframe width={200} height={100} frameBorder="0"
      src={locate(`mode=html&src=${src.data.Svg.EncSvg}`)} />);
    });
  };

  return (
    <>
      <button
        children={'update data'}
        onClick={ () => { getData() } }
      />
      {comp}
      <a href={url} target="_blank">{url}</a>
    </>
  );
}