import React from 'react';
import { container, outer, rect, circle, text, line } from './data';

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