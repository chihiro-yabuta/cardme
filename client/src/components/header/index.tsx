import '../../index.css';
import React from 'react';

export const Header = () => {
  const hostname = location.hostname === 'localhost'
    ? `http://localhost:8080`
    : `http://${location.hostname}`
  ;
  return (
  <div className='center header'>
    <img src={`${hostname}/get/?key=49664e374f8fae7afbe31f745ce06bdd24f9823a5b198168858fa46314a2cc91`} />
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