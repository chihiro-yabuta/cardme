import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { slice } from '../../redux';

export const TextArea = () => {
  const [name, setName] = useState('Google');
  const dispatch = useDispatch();
  const { sendName } = slice.actions;

  return (
    <>
      <input
        type={'text'}
        value={name}
        onChange={(e) => {
          dispatch(sendName(e.target.value));
          setName(e.target.value);
        }}
      />
    </>
  );
}