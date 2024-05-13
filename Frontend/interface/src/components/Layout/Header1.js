import React, { useState } from "react";
import { NavLink, Link ,useNavigate} from "react-router-dom";
import { useAuth } from "../../context/auth";

const Header1 = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  function LogOut() {
    localStorage.removeItem('auth');
    navigate('/userLogin')
    window.location.reload()
  }
  return (
    <>
      <div className="header">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <Link to="/" className="navbar-brand">
                Ceylon Green Cleaning Service
              </Link>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {!auth.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/" className="nav-link">
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/userLogin" className="nav-link" href="#">
                        Login
                      </NavLink>
                    </li>
                  </>
                ) : auth.user.role === 1 ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/homepage2" className="nav-link">
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        style={{ border: "none" }}
                      >
                        {auth?.user?.name}
                      </NavLink>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        style={{ textAlign: "left" }}
                      >
                        <li>
                          <NavLink
                            to="/AppointmentDashboard"
                            activeClassName="active"
                            // to={`/AppointmentDashboard${
                            //   auth?.user?.role === 1 ? "admin" : "user"
                            // }`}
                            className="dropdown-item"
                          >
                            Appointment
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/PrAdminDashboard"
                            activeClassName="active"
                            className="dropdown-item"
                          >
                            Inventory
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/KApaymentdashboard"
                            activeClassName="active"
                            className="dropdown-item"
                          >
                            Payment Managemenr
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/userManagement"
                            activeClassName="active"
                            className="dropdown-item"
                          >
                            User Management
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/rating"
                            activeClassName="active"
                            className="dropdown-item"
                          >
                            Rating management
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/smdashboard"
                            activeClassName="active"
                            className="dropdown-item"
                          >
                            Employee Management
                          </NavLink>
                        </li>
                        <li>
                        <NavLink to="/dashboard" activeClassName="active" className='dropdown-item'
                        >
                          Training Management
                        </NavLink>
                      </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/" className="nav-link" href="#" onClick={LogOut}>
                        Log Out
                      </NavLink >
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink to="/homepage2" className="nav-link">
                        Home
                      </NavLink>
                    </li>
                    {/* <li className="nav-item"> */}
                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        style={{ border: "none" }}
                      >
                        Service
                      </NavLink>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        style={{ textAlign: "left" }}
                      >
                        <li>
                          <NavLink
                            to="/myappointments"
                            // to={`/AppointmentDashboard${
                            //   auth?.user?.role === 1 ? "admin" : "user"
                            // }`}
                            className="dropdown-item"
                          >
                            View your Appointment
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/productDisplay"
                            className="dropdown-item"
                          >
                            Buy Product and tools
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/shoppingcart" className="dropdown-item">
                            Shpopping Cart
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/payment" className="dropdown-item">
                            Payment details
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/" className="dropdown-item">
                            Hired Employees
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    {/* </li> */}
                    <li className="nav-item">
                      <NavLink to="/about" className="nav-link" href="#">
                        About Us
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/profile" className="nav-link" href="#">
                        Profile
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/" className="nav-link" href="#" onClick={LogOut}>
                        Log Out
                      </NavLink >
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header1;
