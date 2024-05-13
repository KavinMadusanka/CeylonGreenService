import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import Layout1 from '../../components/Layout/Layout1';

const KApaymentdashboard = () => {
    const navigate = useNavigate()
    const [payment, setPayment] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    axios.defaults.withCredentials = true

    const [appointments, setAppointments] = useState([]);
    const [appointmentsPrice, setAppointmentsPrice] = useState([]);
    const [AppointSubtotal, setAppointSubtotal] = useState(0);

    function LogOut() {
        localStorage.removeItem('auth');
        navigate('/userLogin')
        window.location.reload()
      }

    //getall payment details
    const getAllPayments = async () => {
        try {
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const { data } = await axios.get('/api/v1/payment/get-paymentdetails');
            const filteredPayments = data.payments.filter(payment => {
                const createdAtDate = new Date(payment.createdAt);
                return createdAtDate >= firstDayOfMonth && createdAtDate <= today;
            });
            setPayment(filteredPayments);
            getAllPayments();
        } catch (error) {
            console.log(error);
            // Handle error
        }
    };

      useEffect(()=> {
        getAllPayments();
      },[])


    useEffect(() => {
        if(payment.length > 0){
            // Calculate subtotal
            let total = 0;
        
            payment.forEach(item => {
                total += item.price || 0 ;
            });
        
            // Update subtotal and delivery charge states
            setSubtotal(total);
        }
      }, [payment]);

      
    // Function to get all appointments with a selected date up to today
    // const getAppointmentsByDate = async () => {
    //     try {
    //         const today = new Date();
    //         today.setHours(0, 0, 0, 0); // Set hours to start of the day
    //         const { data } = await axios.get('/api/v1/appointment/get-admin-appointment');
    //         const filteredAppointments = data.appointments.filter(appointment => {
    //             const appointmentDate = new Date(appointment.selectedDate);
    //             return appointmentDate <= today;
    //         });
    //         setAppointmentsPrice(filteredAppointments);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     getAppointmentsByDate();
    // }, []);

       // Function to get all appointments with a selected date range (this month) and status 'Accepted'
    const getAppointmentsByDateRange = async () => {
        try {
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const { data } = await axios.get('/api/v1/appointment/get-admin-appointment');
            const filteredAppointments = data.appointments.filter(appointment => {
                const appointmentDate = new Date(appointment.selectedDate);
                return appointmentDate >= firstDayOfMonth && appointmentDate <= today && appointment.status === 'Accepted';
            });
            setAppointmentsPrice(filteredAppointments);
            getAppointmentsByDateRange()
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAppointmentsByDateRange();
    }, []);

        //   //useEffect(() => {
        //     const getAllAppointments = async () => {
        //         try {
        //             const { data } = await axios.get('/api/v1/appointment/get-admin-appointment');
        //             // setAppointments(data.appointments);                    
        //             setAppointmentsPrice(data.appointments);
        //             getAllAppointments();
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     };
        
        //     useEffect(() => {
        //     getAllAppointments();
        // }, []);

        useEffect(() => {
            if(appointmentsPrice.length > 0){
                // Calculate subtotal
                let total = 0;
            
                appointmentsPrice.forEach(item => {
                    total += item.Pprice || 0 ;
                });
            
                // Update subtotal and delivery charge states
                setAppointSubtotal(total);
            }
          }, [appointmentsPrice]);




  return (
    <Layout1>

    
    <div className ="">
      <div className ="row flex-nowrap">
        <div className ="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{backgroundColor:"#BFEA7C"}}>
            <div className ="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                {/* <Link 
                    to = "/smdashboard"
                    className ="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-decoration-none" style={{color:'#416D19'}}
                > */}
                    <span style={{color:'#416D19'}} className ="fs-6 fw-bolder d-none d-sm-inline">
                        Payment Manager
                    </span>
                    
                {/* </Link> */}
                <ul
                    className ="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                    id="Menu"
                    >
                    <li className ="w-100">
                        <Link 
                        to = "/KApaymentdashboard"
                        className ="nav-link px-0 align-middle" style={{color:'#416D19'}}
                        >
                            <i className ="fs-4 bi-speedometer2 ms-2"></i>
                            <span className ="ms-2 d-none d-sm-inline">Payment Dashboard</span>
                        </Link>
                    </li>
                    {/* <li className ="w-100">
                        <Link 
                            to = "/smdashboard/employee"
                            className ="nav-link px-0 align-middle "style={{color:'#416D19'}}
                        >
                            <i className ="fs-4 bi-speedometer2 ms-2"></i>
                            <span className ="ms-2 d-none d-sm-inline">
                                Manage Employee</span>
                        </Link>
                    </li> */}
                    <li className="w-100">
                        <Link 
                            to = "/smdashboard/category"
                            className ="nav-link px-0 align-middle" style={{color:'#416D19'}}
                        >
                            <i className ="fs-4 bi-columns ms-2"></i>
                            <span className ="ms-2 d-none d-sm-inline">Category</span>
                        </Link>
                    </li>
                    <li className="w-100">
                        <Link 
                            to = "/smdashboard/profile"
                            className ="nav-link px-0 align-middle" style={{color:'#416D19'}}
                        >
                            <i className ="fs-4 bi-person ms-2"></i>
                            <span className ="ms-2 d-none d-sm-inline">Profile</span>
                        </Link>
                    </li>
                    <li className="w-100">
                        <Link 
                            to = "/" onClick={LogOut}
                            className ="nav-link px-0 align-middle" style={{color:'#416D19'}}
                        >
                            <i className ="fs-4 bi-power ms-2"></i>
                            <span className ="ms-2 d-none d-sm-inline">Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        <div className="col p-0 m-0">
        <div className="p-2 d-flex" style={{marginLeft:'2%'}}>

            <h1>Payment Manager</h1>
        </div>
        <div>
            <table style={{ marginLeft:'2%', width:'95%'}}>
                <thead><tr style={{backgroundColor:'#BFEA7C'}}>
                    <th style={{ border: '1px solid #BFEA7C', padding: '10px',textAlign:'center',justifyItems:'center' }}></th>
                    <th style={{ border: '1px solid #BFEA7C', padding: '10px' }}>Description</th>
                    <th style={{ border: '1px solid #BFEA7C', padding: '10px' }}>Income(Rs.)</th>
                    <th style={{ border: '1px solid #BFEA7C', padding: '10px' }}>Expenses(Rs.)</th>
                    </tr></thead>
                    <tbody>
                        <tr>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px'}}></td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px'}}>Product Sales Revenue</td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px',textAlign:'right'}}>
                        <span>{subtotal.toFixed(2)}</span>
                        </td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px'}}></td>
                        </tr>
                        <tr>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px'}}></td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px'}}>Service Booking Revenue</td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px',textAlign:'right'}}>
                        <span>{AppointSubtotal.toFixed(2)}</span>
                        </td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px',textAlign:'right'}}>
                        </td>
                        </tr>
                        <tr>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px'}}></td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px'}}>Staff Salary Expenditure</td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px',textAlign:'right'}}>
                        </td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px',textAlign:'right'}}>
                        <span>{subtotal.toFixed(2)}</span>
                        </td>
                        </tr>
                        <tr>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px'}}></td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px'}}>Training Program Revenue</td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px',textAlign:'right'}}>
                        <span>{subtotal.toFixed(2)}</span>
                        </td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px',textAlign:'right'}}>
                        </td>
                        </tr>
                        <tr>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px'}}></td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px'}}><b>Total Revenue</b></td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px',textAlign:'right'}}>
                        <b><span>{(subtotal+subtotal+subtotal).toFixed(2)}</span></b>
                        </td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px',textAlign:'right'}}>
                        </td>
                        </tr>
                        <tr>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px'}}></td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px'}}><b>Total Expenses</b></td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px',textAlign:'right'}}>
                        </td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px',textAlign:'right'}}>
                        <b><span>{(subtotal).toFixed(2)}</span></b>
                        </td>
                        </tr>
                        <tr>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px'}}></td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px'}}><b>Net. Income</b></td>
                        <td style={{border: '1px solid #BFEA7C',padding: '10px',textAlign:'right'}} colSpan={2}>
                        <b><span>{((subtotal+subtotal+subtotal)-(subtotal)).toFixed(2)}</span></b>
                        </td>
                        </tr>

                    </tbody>
                </table>
        </div>
            <Outlet />
        </div>
      </div>
    </div>
    </Layout1>
  );
};

export default KApaymentdashboard
