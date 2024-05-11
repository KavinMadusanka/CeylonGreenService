import React, { useState, useEffect } from 'react';
import Layout1 from '../components/Layout/Layout1';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../components/Appointment.css';
import axios from "axios";
import toast from 'react-hot-toast';
import jsPDF from "jspdf";
import "jspdf-autotable";

const AppointmentDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [filteredAppointments, setFilteredAppointments] = useState([]);


    const statusOptions = ['Pending', 'Accepted', 'Rejected'];


    //useEffect(() => {
        const getAllAppointments = async () => {
            try {
                const { data } = await axios.get('/api/v1/appointment/get-admin-appointment');
                setAppointments(data.appointments);
                setFilteredAppointments(data.appointments);
            } catch (error) {
                console.log(error);
            }
        };
    
        useEffect(() => {
        getAllAppointments();
    }, []);


    const handleViewDetails = async (AID) => {
        try {
            const {data} = await axios.get(`/api/v1/appointment/single-appointment/${AID}`);
        } catch (error) {
            toast.error("Something went wrong")
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        console.log(`Updating appointment ${id} to status: ${newStatus}`);
        try {
            const response = await axios.put(`/api/v1/appointment/update-appointment/${id}`, { status: newStatus });
            if (response.data.success) {
                toast.success(`Appointment ${newStatus.toLowerCase()} successfully`);
                getAllAppointments(); // Refresh appointments after update
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(`Error ${newStatus.toLowerCase()}ing appointment:`, error);
            toast.error(`Error ${newStatus.toLowerCase()}ing appointment`);
        }
    };
    
    

    const handleFilter = (status) => {
        if (status === 'All') {
            setFilteredAppointments(appointments);
        } else {
            const filtered = appointments.filter(appointment => appointment.status === status);
            setFilteredAppointments(filtered);
        }
    };

   // Function to generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Appointment Details", 10, 10);
    doc.autoTable({
      head: [['Name', 'Address', 'Contact No', 'Email', 'Service Package', 'Date', 'Time']],
      body: filteredAppointments.map(c => [c.fullName, c.address, c.phoneNumber, c.email, c.servicePackage, c.selectedDate, c.selectedTime])
    });
    doc.save("appointment_details.pdf");
  };

    return (
        <Layout1 title={'Appointment Dashboard - Ceylon Green'}>
            <div className ="row flex-nowrap">
                {/* // add dash board part in there */}
                
                <div className ="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{backgroundColor:"#BFEA7C"}}>
            <div className ="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <span className ="fs-5 fw-bolder d-none d-sm-inline" style={{color:'#416D19'}}>
                        Appointment Manager
                    </span>
                <ul
                    className ="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                    id="Menu"
                    >
                    <li className ="w-100">
                        <Link 
                        to = "/smdashboard/employee"
                        className ="nav-link px-0 align-middle" style={{color:'#416D19'}}
                        >
                            <i className ="fs-4 bi-speedometer2 ms-2"></i>
                            <span className ="ms-2 d-none d-sm-inline">Payment Dashboard</span>
                        </Link>
                    </li>
                    <li className ="w-100">
                        <Link 
                            to = "/smdashboard/employee"
                            className ="nav-link px-0 align-middle "style={{color:'#416D19'}}
                        >
                            <i className ="fs-4 bi-speedometer2 ms-2"></i>
                            <span className ="ms-2 d-none d-sm-inline">
                                Manage Employee</span>
                        </Link>
                    </li>
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
                            to = "#"
                            className ="nav-link px-0 align-middle" style={{color:'#416D19'}}
                        >
                            <i className ="fs-4 bi-power ms-2"></i>
                            <span className ="ms-2 d-none d-sm-inline">Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>

                {/* // add dash board part in there */}

                <div className='apdashBody' style={{ width:'82.5%' }}>
            <div>
                <section className="dashboard-section">
                    
                    <div className="section-title">
                        <h2>Appointment Dashboard</h2>
                        <div className="underline"></div>
                    </div>
                    <div className="filter-section">
                        <label>Filter by Status:</label>
                        <select onChange={(e) => handleFilter(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <div className='exportBtn'>
                        <button onClick={generatePDF}>Export Report</button>
                        </div>
                    </div>
                    
                    
                    <div className='navitr' style={{marginTop:'20px'}}>
                    <div >
        <table style={{ borderCollapse: 'collapse', width: '100%',}}>
        <thead style={{backgroundcolor:'#BFEA7C'}}>
                    <tr style={{backgroundColor:'#f5f5f5'}}>
                        <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C' }}>Name</th>
                        <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C' }}>Address</th>
                        <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}}>Contact No:</th>
                        {/* <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>Email</th> */}
                        <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}}>servicePackage</th>
                        {/* <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>comments</th> */}
                        <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}}>Date</th>
                        <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}}>Time</th>
                        {/* <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>selectedTime</th> */}
                        <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}} colSpan={2}>Status</th>
                    </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((c) => (
                    <tr key={c._id} style={{backgroundColor:'#d6f6a3', cursor: 'pointer'}} 
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF67E'} 
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d6f6a3'}>
                        <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{c.fullName}</td>
                        <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{c.address}</td>
                        <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{c.phoneNumber}</td>
                        {/* <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{c.email}</td> */}
                        <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{c.servicePackage}</td>
                        {/* <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{c.comments}</td> */}
                        <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{c.selectedDate}</td>
                        <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{c.selectedTime}</td>
                        {/* <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{c.selectedTime}</td> */}
                        <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>
                            {c.status === 'Pending' ? (
                                <select
                                value={c.status}
                                onChange={(e) => handleStatusChange(c._id, e.target.value)}
                                onClick={() => console.log('Select clicked')} // Add this line
                            >
                                    {statusOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            ) : (
                                <span>{c.status}</span>
                            )}
                        </td>
                    </tr>
                  ))}
                </tbody>
        </table>
        </div>
        </div>
        
        </section>  
            </div>

            </div>
            </div>  
        </Layout1>
    );
};

export default AppointmentDashboard;
