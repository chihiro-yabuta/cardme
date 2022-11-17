import React, { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import { Buffer } from 'buffer';
import { Data } from '../../api/data';
import { Container, Group, Rect, Circle, Text, Line } from '../../api/svg';
const defaultData: Data = {
  Svg : {
    EncSvg: 'Loading...',
    DecSvg: 'Loading...',
  }
}

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
    <Container width={200} height={100} style={styles}>
      <Rect width={200} height={100} rx={10} ry={10} className='rect' />
      <Text x={10} y={30} children='Hello World' className='hello' />
    </Container>
  );
  const base = Buffer.from(ReactDOMServer.renderToString(svg)).toString('base64');

  const getData = async () => {
    setData(defaultData);
    const getSrc = async (r: string, s :string) => await axios.get<Data>(src(r, s)).then((src) => {
      setData(src.data);
    });
    await axios.get<Data>(raw(base)).then((raw) => {
      getSrc(base, raw.data.Svg.EncSvg);
    });
  };

  const [v, setData] = useState(defaultData);
  useEffect(() => { getData() }, []);
  const raw = (s: string) => `http://${location.hostname}:8080/?raw=${s}`;
  const src = (r: string, s: string) => `http://${location.hostname}:8080/?raw=${r}&src=${s}`;
  const url = `http://${location.hostname}:8080/?mode=html&src=${v.Svg.EncSvg}`;
  return (
    <>
      {svg}
      <p>{ReactDOMServer.renderToString(svg)}</p>
      <p>{'encode: ' + v.Svg.EncSvg}</p>
      <p>{'decode: ' + v.Svg.DecSvg}</p>
      <a href={url} target="_blank">{url}</a>
      <iframe width={200} height={100} frameBorder="0" src={url} />
    </>
  );
}