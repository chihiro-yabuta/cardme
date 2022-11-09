import React from 'react';
import satori from 'satori';
import { fontData } from './data';

export const setSvg = async (f: fontData, el: React.ReactNode, w: number, h: number, set: Function) => {
	const fontData = await fetch(f.url).then(res => res.arrayBuffer());
  await satori(el,{
      width: w, height: h, fonts: [
        {
          name: f.name,
          data: fontData,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  ).then(res => set(<div dangerouslySetInnerHTML={{__html:res}} />));
}