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

  return <Text children='hello world'/>
}