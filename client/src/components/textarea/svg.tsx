import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import HtmlReactParser from 'html-react-parser';
import { Buffer } from 'buffer';
import { Container, Group, Rect, Circle, Text, Line } from '../../api/svg';
import { slice, store } from '../../redux';

export const SVG = () => {
  const css = `<style>${store.getState().css}</style>`;
  const jsx = store.getState().jsx;

  const dispatch = useDispatch();
  const { sendBase64 } = slice.actions;
  const base = Buffer.from(ReactDOMServer.renderToString(<p>hello</p>)).toString('base64');
  useEffect(() => { dispatch(sendBase64(base)); }, []);

  return <p>hello</p>;
}

export const defaultJSX =
`<Container width={200} height={100}>
  <Rect width={200} height={100} rx={10} ry={10} className='rect' />
  <Text x={10} y={30} children='Hello World' className='hello' />
</Container>`;

export const defaultCSS =
`@keyframes anime {
  from {
    transform: translate(0%, 0%);
  } to {
    transform: translate(50%, 100%);
  }
}
.rect {
  fill: white;
  stroke: black;
  stroke-width: 3;
}
.hello {
  fill: red;
  animation: anime 3s both 1s infinite;
}`;