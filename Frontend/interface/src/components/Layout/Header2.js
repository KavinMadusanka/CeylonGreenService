import React from 'react';
import {NavLink,Link} from 'react-router-dom';


const Header2 = () => {
  return (
    <>
    <div className='header'>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" >
              Ceylon Green Cleaning Service
              </Link >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/homepage2" className="nav-link">
                  Home
                </NavLink >
              </li>
              <li className="nav-item">
                <NavLink to="/product" className="nav-link">
                  Product
                </NavLink >
              </li>
              <li className="nav-item">
                <NavLink to="/shoppingcart" className="nav-link" href="#">
                  Shopping cart
                </NavLink >
              </li>
              <li className="nav-item">
                <NavLink to="/kaddcard" className="nav-link" href="#">
                  Payment
                </NavLink >
              </li>
              <li className="nav-item">
                <NavLink to="/shippingaddress" className="nav-link" href="#">
                  Shipping Address
                </NavLink >
              </li>
              <li className="nav-item">
                <NavLink to="/profile" className="nav-link" href="#">
                  Profile
                </NavLink >
              </li>
              
            </ul>
            
          </div>
        </div>
      </nav>
    </div>
      


    </>
  )
}

export default Header2;