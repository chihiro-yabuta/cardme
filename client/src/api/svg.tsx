import React, { useState } from 'react';
import axios from 'axios';

export const Container = (props: container) => {
  return <svg
    xmlns='http://www.w3.org/2000/svg'
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

const getData = async (url: string, setState: Function) => {
	await axios.get(url).then(api => setState(api.data));
};

export const Img = (props: image) => {
	const [raw, setRaw] = useState('');
  getData(props.href, setRaw);
	return <svg x={props.x} y={props.y} className={props.className}>
		<g transform={props.scale && `scale(${props.scale} ${props.scale})`}
			dangerouslySetInnerHTML={
				{ __html: raw.slice(raw.slice(1).indexOf('<')+1, raw.lastIndexOf('<')) }
			}
		/>
	</svg>
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
	scale?: number;
}

interface text extends child {
	children: string;
}

interface line extends child {
	x2: number;
	y2: number;
}