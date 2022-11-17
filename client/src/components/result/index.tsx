import React, { useState, useEffect } from 'react';
import { store } from '../../redux';
import axios from 'axios';
import { Data } from '../../api/data';
const defaultData: Data = {
  User : {
    Name: 'Loading...',
    Followers: -1,
    PublicRepos: -1,
    StarredURL: 'Loading...',
  }
}

export const Result = () => {
  const target = (s: string) => `http://${location.hostname}:8080/?name=${s}`;
  const getData = async (s: string) => {
    setData(defaultData);
    await axios.get<Data>(target(s)).then((e) => {
      setData(e.data);
    });
  };

  const [v, setData] = useState(defaultData);
  useEffect(() => { getData(store.getState().name) }, []);

  return (
    <>
      <p>{'name: ' + v.User.Name}</p>
      <p>{'followers: ' + v.User.Followers}</p>
      <p>{'repos num: ' + v.User.PublicRepos}</p>
      <p>{'repos url: ' + v.User.ReposURL}</p>
      <p>{'starred url: ' + v.User.StarredURL}</p>
      <button
        children={'update data'}
        onClick={ () => { getData(store.getState().name) } }
      />
    </>
  );
}