import '../../index.css';
import React from 'react';

export const Header = () => {
  return (
  <div className='center header'>
    <img src={`http://${location.hostname}/server/?mode=html&src=rJTRbps8FMfveYrzWcqnTmrAkGZNCVjbul32Zn0ClxiwBnZmO4FsyrtPxqHJKFly0QukA/6dv/8cH59Ebwto60roFJXGrOMgaJrGb2a+VEUQYYwDvS0QbDlrvsg2RRgw3EcYQowRNHxlyhTdRxhByXhRmhTZBZJos6sY+fSD7XJFa6bByDUX8NsDyJWsuwDAKCp0LlUdu7Ciht3gyS1M53jyYdkxck0zbnYxYPu+ByMvJb9NDbtUb++dGHrZGCPrgyc8uSR63tD72FG2eldWKBqXfecClXLLFBfFPyzpjFbs5mHh9Ma3dkyIowPk7T3PL5TcrDv2lZxKxQsuYltp+1iYCl5Tw6WIj25Cf67hRZoS7mzERc4FN+wvfLriimUukVaGKUEtYXc2rDXuj6Qw05zWvNrF8P/PjTTLR1nzDJ6p0PD07D7dgqZCTzVTPF/2WZr/YrG9AevWiWad4olb1+2hHx2sYj/SFvXpkHxtw1N47mB1STZ03OoK0bAXrS+JHpyyK0SjXpS1b0rQN/TxvGaWTQI3GpICsopqnaKuFxBJupNp7QBBsEvRYo56olvJEHlMAhse0YdxlCLyeYiGi3FWIfJ9yEYfx9kVIl+H7OwMWyPyNGTvzrAMkW9Ddj47w7YZIv/1dFCQxA5o8icAAP//`} />
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