import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import Layout1 from "../components/Layout/Layout1";

const SMDashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3000/userLogin").then((result) => {
      if (result.data.Status) {
        navigate("/userLogin");
      }
    });
  };
  return (
    <Layout1>
    <div className="">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{backgroundColor:"#BFEA7C"}}>
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/smdashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-decoration-none" style={{color:'#416D19'}}
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Staff Manager
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="Menu"
            >
              <li className="w-100">
                <Link
                  to="/smdashboard/SMHome"
                  className="nav-link px-0 align-middle" style={{color:'#416D19'}}
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">SMDashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/smdashboard/Employee"
                  className="nav-link px-0 align-middle" style={{color:'#416D19'}}
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Manage Employee
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/smdashboard/EmployeeSalary"
                  className="nav-link px-0 align-middle" style={{color:'#416D19'}}
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Generate Salary</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/smdashboard/EmployeeProfile"
                  className="nav-link px-0 align-middle" style={{color:'#416D19'}}
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link
                  to="http://localhost:3000/userLogin"
                  className="nav-link px-0 align-middle" style={{color:'#416D19'}}
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center">
            <h4>Employee Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
      -
    </div>
    </Layout1>
  );
};

export default SMDashboard;
