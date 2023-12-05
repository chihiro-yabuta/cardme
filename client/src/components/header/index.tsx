import '../../index.css';
import React from 'react';

export const Header = () => {
  const hostname = location.hostname === 'localhost'
    ? `http://localhost:8080`
    : `http://${location.hostname}`
  ;
  return (
  <div className='center header'>
    <img src={`${hostname}/get/?key=31b6d3344709358c22531733429114ab7952e89cf0b4987d35280265dd8b2613`} />
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