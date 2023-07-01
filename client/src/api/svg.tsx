import React, { useState } from 'react';
import { Buffer } from 'buffer';
import axios from 'axios';

export const Container = (props: container) => {
  return <svg
    xmlns='http://www.w3.org/2000/svg'
		xmlnsXlink='http://www.w3.org/1999/xlink'
    viewBox={`0 0 ${props.width} ${props.height}`}
    width={props.width}
		height={props.height}
  >{props.style}{props.children}</svg>
}

export const Group = (props: group) => {
  return <g {...props} />
}

export const Rect = (props: rect) => {
  return <rect {...props} />
}

export const Circle = (props: circle) => {
  return <circle {...props} />
}

const getData = async (url: string, setEnc: Function, setIsSvg: Function) => {
	await axios.get(url, { 'responseType': 'arraybuffer' }).then((api) => {
    setEnc(Buffer.from(api.data).toString('base64'));
    setIsSvg(url.slice(url.lastIndexOf('.')+1) == 'svg');
  });
};

const svg = (props: { w: number, h: number, enc: string }) => {
  const { w, h, enc } = props;
  return <image width={w} height={h} xlinkHref={'data:image/svg+xml;base64,'+enc} />
}

const pg = (props: { w: number, h: number, enc: string }) => {
  const { w, h, enc } = props;
  return <image width={w} height={h} xlinkHref={'data:image/jpg;base64,'+enc} />
}

export const Img = (props: image) => {
  const [enc, setEnc] = useState('');
  const [isSvg, setIsSvg] = useState(false);
  getData(props.href, setEnc, setIsSvg);
	const param = { w: props.width, h: props.height, enc: enc };
	return (
    <svg x={props.x} y={props.y} className={props.className}>
      {isSvg ? svg(param) : pg(param)}
    </svg>
  )
}

export const Text = (props: text) => {
  return <text {...props} />
}

export const Line = (props: line) => {
  return <line {...props} />
}

interface parent {
	width?: number;
	height?: number;
}

interface child {
	x?: number;
	y?: number;
	className? :string;
}

interface container extends parent {
	children: JSX.Element | JSX.Element[];
	style: JSX.Element;
}

interface outer extends parent, child {
}

interface group extends outer {
	children: JSX.Element | JSX.Element[];
}

interface rect extends outer {
	rx?: number;
	ry?: number;
}

interface circle extends outer {
	r: number;
}

interface image extends child {
	href: string;
	width?: number;
	height?: number;
}

interface text extends child {
	children: string;
}

interface line extends child {
	x2: number;
	y2: number;
}