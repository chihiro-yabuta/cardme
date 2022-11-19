import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { Buffer } from 'buffer';
import { slice } from '../../redux';
import { Convert } from '../../api/convert';

export const SVG = (props: { name: string, css: string, jsx: string }) => {
  const Canvas = Convert(props.name, props.css, props.jsx);

  const dispatch = useDispatch();
  const { sendBase64 } = slice.actions;
  const base = Buffer.from(ReactDOMServer.renderToString(Canvas)).toString('base64');
  useEffect(() => { dispatch(sendBase64(base)); }, []);

  return Canvas;
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