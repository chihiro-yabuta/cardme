import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Data } from './data';
import { Container, Group, Rect, Circle, Text, Line } from './svg';

export const Convert = (name : string, css: string, jsx: string) => {
  const [data, setData] = useState({});
  const url = `http://${location.hostname}:8080/?name=${name}`;
  const getData = async () => await axios.get<Data>(url).then((api) => {
    setData(api.data);
  });
  useEffect(() => { getData(); }, []);

  const SVG: any = [];
  let target: any = SVG;

  jsx.split('\n').map((l) => {
    const pos = l.search(/\S/g);
    const isEnd = l[l.indexOf('<')+1] === '/';
    const isAlone = l[l.indexOf('>')-1] === '/';
    const isJsx = l[pos] === '<';
    if (isJsx) {
      const el = l.replace(/<|\/|>/g,'').split(' ').filter(e=>e!=='');
      if (isEnd) {
        target = SVG;
        [...Array(pos/2|0)].map(() => target = target[target.length-1].children);
      } else if (isAlone) {
        const [tag, props] = [el[0], propsObj(el.slice(1))];
        target.push({ tag: tag, props: props });
      } else {
        const [tag, props] = [el[0], propsObj(el.slice(1))];
        target.push({ tag: tag, props: props, children: [] });
        target = target[target.length-1].children;
      }
    } else {
      target.push(l.slice(pos));
    }
  });
  return recursive(SVG, css);
}

const recursive = (e, css?: string): JSX.Element => {
  return e.map((obj) => {
    const r = () => obj.children ? recursive(obj.children) : null;
    switch (obj.tag) {
      case 'Container':
        const style = <style>{css}</style>;
        return Container({ ...obj.props, children: r(), style });
      case 'Group':
        return Group({ ...obj.props, children: r() });
      case 'Rect':
        return Rect({ ...obj.props, children: r() });
      case 'Circle':
        return Circle({ ...obj.props, children: r() });
      case 'Text':
        return Text({ ...obj.props, children: obj.children.join() });
      case 'Line':
        return Line({ ...obj.props });
    }
  });
}

const propsObj = (l: string[]): Object => {
  const obj: any = {};
  l.map((s) => {
    if (s.indexOf('=') === -1) {
      obj.className = `${obj.className} ${s.replace(/'|"/g, '')}`;
    } else {
      const [prop, el] = s.split('=');
      const e = el.replace(/{|}|'|"/g, '');
      Object.assign(obj, { [prop]: Number(e) || String(e) });
    }
  });
  return obj;
}