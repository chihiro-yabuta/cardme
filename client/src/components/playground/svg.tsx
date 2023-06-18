import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { Buffer } from 'buffer';
import { slice } from '../../redux';
import { Data, userMap } from '../../api/data';
import { Convert } from '../../api/convert';

export const SVG = (props: { data: Data, css: string, jsx: string }) => {
  let Canvas = <p style={{ fontSize: 50, color: "red" }}>Bad Grammer</p>
  try {Canvas = Convert(props.css, props.jsx); } catch {;}

  const dispatch = useDispatch();
  const { sendBase64 } = slice.actions;
  let str = ReactDOMServer.renderToString(Canvas);
  dispatch(sendBase64(Buffer.from(str).toString('base64')));

  if (props.data.User) {
    userMap.map((s) => { str = str.replace(`{${s}}`, props.data.User[s]) });
  }

  return <div className='imgarea' dangerouslySetInnerHTML={{ __html: str}} />;
}
