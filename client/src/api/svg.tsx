import React from 'react';

export const Container = (props: container) => {
  return <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox={`0 0 ${props.width} ${props.height}`}
    width={props.width}
		height={props.height}
  >{props.style}{props.children}</svg>
}

export const Group = (props: outer) => {
  return <g {...props} />
}

export const Rect = (props: rect) => {
    return <rect {...props} />
}

export const Circle = (props: circle) => {
    return <circle {...props} />
}

export const Text = (props: text) => {
    return <text {...props} />
}

export const Line = (props: line) => {
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
}