import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { Buffer } from 'buffer';
import { slice } from '../../redux';
import { Data, userMap } from '../../api/data';
import { Convert } from '../../api/convert';

export const SVG = (props: { name: string, css: string, jsx: string }) => {
  const [data, setData]: [any, Function] = useState({});
  const url = props.name !== ''
  ? `http://${location.hostname}:8080/?name=${props.name}`
  : `http://${location.hostname}:8080`;
  const getData = async () => await axios.get<Data>(url).then((api) => {
    setData(api.data);
  });
  useEffect(() => { getData(); }, [props.name]);

  let Canvas = <p style={{ fontSize: 50, color: "red" }}>Bad Grammer</p>
  try {Canvas = Convert(props.css, props.jsx); } catch {;}

  const dispatch = useDispatch();
  const { sendBase64 } = slice.actions;
  let str = ReactDOMServer.renderToString(Canvas);
  const base = Buffer.from(str).toString('base64');
  useEffect(() => { dispatch(sendBase64(base)); }, [props.css, props.jsx]);

  if (data.User) {
    userMap.map((s) => { str = str.replace(`{${s}}`, data.User[s]) });
  }

  return <div className='imgarea' dangerouslySetInnerHTML={{ __html: str}} />;
}