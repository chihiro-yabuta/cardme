import React from 'react';
import { Container, Group, Rect, Circle, Text, Line } from '../../api/svg';

export const Canvas = () => {
  return (
    <Container width={200} height={100}>
      <Rect width={200} height={100} rx={10} ry={10} className='rect' />
      <Text x={10} y={30} children='Hello World' className='hello' />
    </Container>
  );
}