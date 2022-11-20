import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Data } from './data';
import { Container, Group, Rect, Circle, Text, Line } from './svg';
const defaultData: Data = { User :{ Name: 'Loading...' } };

export const Convert = (name : string, css: string, jsx: string) => {
  const [data, setData] = useState(defaultData);
  const url = `http://${location.hostname}:8080/?name=${name}`;
  const getData = async () => await axios.get<Data>(url).then((api) => {
    setData(api.data);
  });
  useEffect(() => { getData(); }, []);
  const style = <style>{css}</style>;

  jsx.split('\n').map((l) => {
    const pos = l.search(/\S/g);
    const isEnd = l[l.indexOf('<')+1] === '/';
    const isAlone = l[l.indexOf('>')-1] === '/';
    const isJsx = l[pos] === '<';
    if (isJsx) {
      const el = l.replace(/<|\/|>/g,'').split(' ').filter(e=>e!=='');
      if (isEnd) {
        console.log(el);
      } else if (isAlone) {
        const [tag, props] = [el[0], el.slice(1)];
        console.log(tag, propsObj(props));
      } else {
        const [tag, props] = [el[0], el.slice(1)];
        console.log(pos, tag, propsObj(props));
      }
    } else {
      const el = l.slice(pos);
      console.log(el);
    }
  });

  return <Text children='hello world'/>
}

// const recursive = (props: any): JSX.Element => {
// }

const propsObj = (l: string[]) => {
  const obj = {};
  l.map((s) => {
    const [prop, el] = s.split('=');
    const e = el.replace(/{|}|'|"/g, '');
    Object.assign(obj, { [prop]: Number(e) || String(e) });
  });
  return obj;
}

type element = {
  tag: string,
  props: any,
  children: Object[] | string,
}