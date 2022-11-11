import React, { useState, useEffect } from 'react';
import { store } from '../../redux';
import axios from 'axios';
import { User } from '../../api/data';
const defaultUser: User = {
	Name: 'Loading...',
	Followers: -1,
	ReposNum: -1,
}

export const Result = () => {
  const target = (s: string) => `http://${location.hostname}:8080/?name=${s}`;
  const getData = async (s: string) => {
    setData(defaultUser);
    await axios.get<User>(target(s)).then((e) => {
      setData(e.data);
    });
  };

  const [v, setData] = useState(defaultUser);
  useEffect(() => { getData(store.getState().name) }, []);

  return (
    <>
      <p>{'name: ' + v.Name}</p>
      <p>{'followers: ' + v.Followers}</p>
      <p>{'repos num: ' + v.ReposNum}</p>
      <button
        children={'update data'}
        onClick={ () => { getData(store.getState().name) } }
      />
    </>
  );
}