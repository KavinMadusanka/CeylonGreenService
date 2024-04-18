import React from 'react';
import { NavLink, Link } from 'react-router-dom';


const Header = () => {
  return (
    <>
      <div className='header'>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <Link to="/" className="navbar-brand">
                Ceylon Green Cleaning Service
              </Link >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink >
                </li>
                <li className="nav-item">
                  <NavLink to="/userLogin" className="nav-link" href="#">
                    Login
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

export default Header;