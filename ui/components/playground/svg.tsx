import React from 'react';
import { useDispatch } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { Buffer } from 'buffer';
import { slice } from '../../redux';
import { User, userMap } from '../../api/data';
import { Convert } from '../../api/convert';

export const SVG = (props: { user: User, css: string, jsx: string }) => {
  const dispatch = useDispatch();
  const { sendBase64 } = slice.actions;

  let Canvas = <p style={{ fontSize: 50, color: 'red' }}>Bad Grammer</p>
  try {Canvas = Convert(props.css, props.jsx); } catch {;}
  let str = ReactDOMServer.renderToString(Canvas);

  userMap.map((s) => { str = str.replace(`{${s}}`, props.user && props.user[s]) });
  dispatch(sendBase64(Buffer.from(str).toString('base64')));

  return <div className='imgarea' dangerouslySetInnerHTML={{ __html: str}} />;
}
