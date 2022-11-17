import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Container, Group, Rect, Circle, Text, Line } from '../../api/svg';

const styles = <style>{`
  @keyframes anime {
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
  }
`}</style>

export const Canvas = () => {
  const svg = (
    <Container width={200} height={100}>
      {styles}
      <Rect width={200} height={100} rx={10} ry={10} className='rect' />
      <Text x={10} y={30} children='Hello World' className='hello' />
    </Container>
  );
  return (
    <>
      {svg}
      <div style={{ width: 500, height: 100, border: 'solid 1px black' }}>
        <p>{ReactDOMServer.renderToString(svg)}</p>
      </div>
    </>
  );
}