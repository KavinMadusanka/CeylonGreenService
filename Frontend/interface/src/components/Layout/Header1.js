import React from 'react';
import { NavLink, Link } from 'react-router-dom';


const Header1 = () => {
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
                  <NavLink to="/service" className="nav-link">
                    Service
                  </NavLink >
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className="nav-link" href="#">
                    About Us
                  </NavLink >
                </li>
                <li className="nav-item">
                  <NavLink to="/contactUs" className="nav-link" href="#">
                    Contact Us
                  </NavLink >
                </li>
                <li className="nav-item">
                  <NavLink to="/userManagement" className="nav-link" href="#">
                    User Management
                  </NavLink >
                </li>
                <li className="nav-item">
                  <NavLink to="/profile" className="nav-link" href="#">
                    Profile
                  </NavLink >
                </li>
                <li className="nav-item">
                  <NavLink to="/userLogin" className="nav-link" href="#">
                    Logout
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

export default Header1;
