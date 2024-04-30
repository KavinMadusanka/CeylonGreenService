import React from 'react';
import Layout1 from './../components/Layout/Layout1';
import { NavLink } from 'react-router-dom';
import bkImage from '../Images/image1.jpg';
import bkImage2 from '../Images/image2.jpg';
import bkImage3 from '../Images/image3.jpg';

const Service = () => {
  return (
    <Layout1 title={'Service - Ceylon Green'}>

        <div style={{marginTop:'3%',display: 'flex', justifyContent: 'center'}}>
          <NavLink to={"/myappointments"} className="nav-link">
          <div className="row contactus " style={{border: '2px solid black', borderRadius:'10px',padding:'1px', Width: '80%'}}>
            <div className="col-md-3 d-flex justify-content-center align-items-center" >
            <img src={bkImage} alt="Person cleaning kitchen counter with eco-friendly products" 
          style={{ height: 'auto', width: '100%',}}
                  />
            </div>
            <div className="col-md-1">
              {/* Vertical line in here */}
            <div style={{ width: '2px', height: '100%', background: 'black' }}></div>
            </div>
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <p className="text-justify mt-2 " style={{fontSize:'30px'}}>
                Book Appointments
              </p>
            </div>
          </div>
          </NavLink>
        </div>
        

        <div style={{marginTop:'3%',display: 'flex', justifyContent: 'center'}}>
          <NavLink to={"/payment"} className="nav-link">
          <div className="row contactus " style={{border: '2px solid black', borderRadius:'10px',padding:'1px', Width: '80%'}}>
            <div className="col-md-3 d-flex justify-content-center align-items-center" >
            <img src={bkImage} alt="Person cleaning kitchen counter with eco-friendly products" 
          style={{ height: 'auto', width: '100%',}}
                  />
            </div>
            <div className="col-md-1">
              {/* Vertical line in here */}
            <div style={{ width: '2px', height: '100%', background: 'black' }}></div>
            </div>
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <p className="text-justify mt-2 " style={{fontSize:'30px'}}>
                Product and Tools
              </p>
            </div>
          </div>
          </NavLink>
        </div>

        <div style={{marginTop:'3%',marginBottom:'3%',display: 'flex', justifyContent: 'center'}}>
          <NavLink to={"/payment"} className="nav-link">
          <div className="row contactus " style={{border: '2px solid black', borderRadius:'10px',padding:'1px', Width: '80%'}}>
            <div className="col-md-3 d-flex justify-content-center align-items-center" >
            <img src={bkImage} alt="Person cleaning kitchen counter with eco-friendly products" 
          style={{ height: 'auto', width: '100%',}}
                  />
            </div>
            <div className="col-md-1">
              {/* Vertical line in here */}
            <div style={{ width: '2px', height: '100%', background: 'black' }}></div>
            </div>
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <p className="text-justify mt-2 " style={{fontSize:'30px'}}>
                Hired Employees          
              </p>
            </div>
          </div>
          </NavLink>
        </div>
        
    </Layout1>
  )
}

export default Service;