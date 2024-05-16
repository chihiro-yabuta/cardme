import '../../index.css';
import React from 'react';

export const Header = () => {
  return (
  <div className='center header'>
    <img src={`${location.href}get/?name=Google&key=af741ca0c7f4daeac0f2df147a305fc8585282ef389d362cd961529360d6f30e`} />
    <div>
      <p className='title'>Write Code. Express Yourself.</p>
      <p className='sentence'>
        <span>readme</span> is enable to create <span>SVG</span>.<br/>
        I give you installed components for easy coding.<br/>
        you can show this card everywhere that can uses html.<br/>
        try this app, and if you like it, plz <span>star</span> my repo!
      </p>
    </div>
  </div>
);
}