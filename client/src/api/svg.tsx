import React from 'react';

export const Container = (props: container) => {
  return <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox={`0 0 ${props.width} ${props.height}`}
    {...props}
  />
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

interface container {
	children?: JSX.Element | JSX.Element[];
	width: number;
	height: number;
}

interface base {
	x?: number;
	y?: number;
	className? :string;
}

interface outer extends container, base {
}

interface rect extends outer {
	rx?: number;
	ry?: number;
}

interface circle extends outer {
	r: number;
}

interface text extends base {
	children: string;
}

interface line extends base {
	x2: number;
	y2: number;
}