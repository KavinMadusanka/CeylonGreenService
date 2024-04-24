import React from 'react'
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='footer'>
        <div className='text-center' id='copy'>
          &copy; 2024 Ceylon Green Cleaning Service. All rights reserved.
        </div>

        <div className='text-center'>
          <br></br>
        Ceylon Green Cleaning Service is revolutionizing the cleaning industry with innovative technology and unwavering dedication to customer satisfaction. Our comprehensive cleaning management system simplifies operations, enhances communication, and boosts efficiency for cleaning companies of all sizes.
          <br></br><br></br>
        Email : ceylongreenservice@gmail.com
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