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
  useEffect(() => { dispatch(sendBase64(base)); }, [Canvas]);

  return Canvas;
}

export const defaultJSX =
`<Container width={720} height={100}>
  <Group className='group'>
    <Text x={10} y={85} className='text c'>
      C
    </Text>
    <Text x={90} y={85} className='text a'>
      A
    </Text>
    <Text x={180} y={85} className='text r'>
      R
    </Text>
    <Text x={260} y={85} className='text d'>
      D
    </Text>
    <Text x={360} y={85} className='text m'>
      M
    </Text>
    <Text x={460} y={85} className='text e'>
      E
    </Text>
    <Text x={530} y={85} className='text exc'>
      !
    </Text>
  </Group>
</Container>`;

export const defaultCSS =
`@keyframes topin {
  from {
    transform: translate(0%, -50%);
    opacity: 0;
  } to {
    transform: translate(0%, 0%);
    opacity: 1;
  }
}
@keyframes buttomin {
  0% {
    transform: translate(0%, 50%);
    opacity: 0;
  }  {
    transform: translate(0%, 0%);
    opacity: 1;
  }
}
@keyframes rightin {
  from {
    transform: translate(20%, 0%);
    opacity: 0;
  } to {
    transform: translate(0%, 0%);
    opacity: 1;
  }
}
@keyframes hovering {
  from {
    transform: scale(98%);
  } to {
    transform: scale(102%);
  }
}

.group {
  transform-origin: 50% 50%;
  animation: hovering 1.5s both 4.5s infinite;
  animation-direction: alternate;
}

.text {
  font-family: "Comic Sans MS", sans-serif;
  font-size: 100px;
}

.c {
  animation: topin 1.2s both 0.2s;
}
.a {
  animation: buttomin 1.2s both 0.5s;
}
.r {
  animation: topin 1.2s both 1s;
}
.d {
  animation: buttomin 1.2s both 1.5s;
}
.m {
  animation: topin 1.2s both 2s;
}
.e {
  animation: buttomin 1.2s both 2.5s;
}
.exc {
  animation: rightin 1.5s both 3s;
}`;

export const options =
`const Container = (props: container) => {
  return <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox={\`0 0 \${props.width} \${props.height}\`}
    width={props.width}
		height={props.height}
  >{props.style}{props.children}</svg>
}

const Group = (props: outer) => {
  return <g {...props} />
}

const Rect = (props: rect) => {
    return <rect {...props} />
}

const Circle = (props: circle) => {
    return <circle {...props} />
}

const Text = (props: text) => {
    return <text {...props} />
}

const Line = (props: line) => {
    return <line {...props} />
}

interface parent {
	children?: JSX.Element | JSX.Element[];
	width: number;
	height: number;
}

interface child {
	x?: number;
	y?: number;
	className? :string;
}

interface container extends parent {
	style: JSX.Element;
}

interface outer extends parent, child {
}

interface rect extends outer {
	rx?: number;
	ry?: number;
}

interface circle extends outer {
	r: number;
}

interface text extends child {
	children: string;
}

interface line extends child {
	x2: number;
	y2: number;
}`;