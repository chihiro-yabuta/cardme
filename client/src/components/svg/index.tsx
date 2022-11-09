import React, { useState } from 'react';
import { setSvg } from '../../api/svg';
import { fonts } from '../../api/data';

export const Svg = () => {
  const [raw, setState] = useState(<p>Loading...</p>);
  const jsx = (
    <>
      <div style={{ color: 'black' }}>hello, world</div>
    </>
  );
  setSvg(fonts.roboto, jsx, 600, 400, setState);

  return raw;
}