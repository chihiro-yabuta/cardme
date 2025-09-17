import '../../index.css';
import React from 'react';

export const Header = () => {
  return (
  <div className='center header'>
    <img src={`${location.href}get/?name=Google&key=148d624ed505ff01a77c07b5064dd7441df6656562e92989a8e282e332b35cf7`} />
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