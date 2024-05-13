import React, { useState } from 'react';
import {NavLink,Link,useNavigate} from 'react-router-dom';
import { useAuth } from "../../context/auth";

const Header2 = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  function LogOut() {
    localStorage.removeItem('auth');
    navigate('/userLogin')
    window.location.reload()
  }
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
                <NavLink to="/productDisplay" className="nav-link">
                  Product
                </NavLink >
              </li>
              <li className="nav-item">
                <NavLink to="/shoppingcart" className="nav-link" href="#">
                  Shopping cart
                </NavLink >
              </li>
              <li className="nav-item">
                <NavLink to="/payment" className="nav-link" href="#">
                  Payment Details
                </NavLink >
              </li>
              {/* <li className="nav-item">
                <NavLink to="/shippingaddress" className="nav-link" href="#">
                  Shipping Address
                </NavLink >
              </li> */}
              <li className="nav-item">
                <NavLink to="/profile" className="nav-link" href="#">
                  Profile
                </NavLink >
              </li>
              <li className="nav-item">
                      <NavLink to="/" className="nav-link" href="#" onClick={LogOut}>
                        Log Out
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