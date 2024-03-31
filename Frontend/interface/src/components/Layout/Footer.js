import React from 'react'
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='footer'>
        <div className='text-center' id='copy'>
          All Right Reserved &copy; CeylonGreenService 
        </div>
        <p className='text-center mt-3'>
          <Link to="/about">About</Link>
          |
          <Link to="/contact">Contact Us</Link>
          |
          <Link to="/policy">Privacy policy</Link>
        </p>
    </div>
  );
}

export default Footer;