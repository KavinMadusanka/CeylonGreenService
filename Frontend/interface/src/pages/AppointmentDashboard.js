import React, { useState, useEffect } from 'react';
import Layout1 from '../components/Layout/Layout1';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import jsPDF from "jspdf";
import "jspdf-autotable";

const AppointmentDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [showCurrentMonth, setShowCurrentMonth] = useState(false); // Added state for filtering by current month

    const navigate = useNavigate();

    const statusOptions = ['Pending', 'Accepted', 'Rejected'];

    function LogOut() {
        localStorage.removeItem('auth');
        navigate('/userLogin')
        window.location.reload()
      }function LogOut() {
        localStorage.removeItem('auth');
        navigate('/userLogin')
        window.location.reload()
      }

    // Function to fetch all appointments
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

    // Function to update appointment status
    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await axios.put(`/api/v1/appointment/update-appointment-status/${id}`, { status: newStatus });
            if (response.data.success) {
                toast.success(`Appointment status updated to ${newStatus}`);
                const updatedAppointments = appointments.map(appointment => {
                    if (appointment._id === id) {
                        return { ...appointment, status: newStatus };
                    } else {
                        return appointment;
                    }
                });
                setAppointments(updatedAppointments);
                setFilteredAppointments(updatedAppointments);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(`Error updating appointment status:`, error);
            toast.error('Error updating appointment status');
        }
    };

    // // Function to generate PDF report
    // const generatePDF = () => {
    //     const doc = new jsPDF();
    //     doc.text("Appointment Details", 10, 10);
    //     doc.autoTable({
    //         head: [['Name', 'Address', 'Contact No', 'Email', 'Service Package', 'Date', 'Time']],
    //         body: filteredAppointments.map(c => [c.fullName, c.address, c.phoneNumber, c.email, c.servicePackage, c.selectedDate, c.selectedTime])
    //     });
    //     doc.save("appointment_details.pdf");
    // };

    // Function to generate PDF report with header and footer
    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Header
        doc.setFontSize(20);
        doc.text("CEYLON GREEN CLEANING SERVICE", pageWidth / 2, 15, { align: 'center' });

        doc.setFontSize(16);
        doc.text("Appointment Details", pageWidth / 2, 25, { align: 'center' });

        // Footer
        const footerText = "Page " + doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });

        // Table
        doc.autoTable({
            startY: 30, // Start after the header
            head: [['Name', 'Address', 'Contact No', 'Email', 'Service Package', 'Date', 'Time']],
            body: filteredAppointments.map(c => [c.fullName, c.address, c.phoneNumber, c.email, c.servicePackage, c.selectedDate, c.selectedTime]),
            didDrawPage: function (data) {
                // Footer on each page
                const footerText = "Page " + doc.internal.getNumberOfPages();
                doc.setFontSize(10);
                doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });
            }
        });

        doc.save("appointment_details.pdf");
    };

    // Function to filter appointments by status
    const handleFilter = (status) => {
        if (status === 'All') {
            setFilteredAppointments(appointments);
        } else {
            const filtered = appointments.filter(appointment => appointment.status === status);
            setFilteredAppointments(filtered);
        }
    };

    // Function to toggle filter by current month
    const filterByCurrentMonth = () => {
        if (showCurrentMonth) {
            setFilteredAppointments(appointments);
        } else {
            // Filter appointments by current month
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1; // January is 0
            const currentYear = currentDate.getFullYear();
            const currentMonthAppointments = appointments.filter(appointment => {
                const appointmentDate = new Date(appointment.selectedDate);
                return appointmentDate.getMonth() + 1 === currentMonth && appointmentDate.getFullYear() === currentYear;
            });
            setFilteredAppointments(currentMonthAppointments);
        }
        setShowCurrentMonth(!showCurrentMonth); // Toggle the state
    };

    // Function to get button text for filter by current month
const getCurrentMonthButtonText = () => {
    if (showCurrentMonth) {
        return 'All Appointments';
    } else {
        const currentDate = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames[currentDate.getMonth()];
    }
};

const getText = () => {
    if (showCurrentMonth) {
        const currentDate = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames[currentDate.getMonth()];
    } else {
        return 'All Appointments';
    }
}

    // Function to get the count of appointments by status
    const getCountsByStatus = (appointments) => {
        let counts = {
            'Pending': 0,
            'Accepted': 0,
            'Rejected': 0,
            'Total': appointments.length
        };
        appointments.forEach(appointment => {
            counts[appointment.status]++;
        });
        return counts;
    };

    // Get counts by status for the filtered appointments
    const countsByStatus = getCountsByStatus(filteredAppointments);

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
                            to = "/appointmentdashboard"
                            className ="nav-link px-0 align-middle "style={{color:'#416D19'}}
                        >
                            <i className ="fs-4 bi-speedometer2 ms-2"></i>
                            <span className ="ms-2 d-none d-sm-inline">
                                Manage Appointments</span>
                        </Link>
                    </li>
                    <li className="w-100">
                        <Link 
                            to = "/servicepackages"
                            className ="nav-link px-0 align-middle" style={{color:'#416D19'}}
                        >
                            <i className ="fs-4 bi-columns ms-2"></i>
                            <span className ="ms-2 d-none d-sm-inline">Service Packages</span>
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

                {/* // add dash board part in there */}
                <div className='apdashBody' style={{ width:'82.5%' }}>
                    <section className="dashboard-section">
                        <div className="section-title">
                            <h2>Appointment Dashboard</h2>
                            <div className="underline"></div>
                        </div>
                        <div className="filter-section">
                            <table style={{width:'100%'}}><tr>
                                <td style={{width:'60%'}}><div className='exportBtn'>
                                <label>Filter by Current Month:</label>
                                <button onClick={filterByCurrentMonth}>{getCurrentMonthButtonText()}</button>
                            </div></td>

                                <td><label>Filter by Status:</label>
                            <select onChange={(e) => handleFilter(e.target.value)}>
                                <option value="All">All</option>
                                <option value="Pending">Pending</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                            </select></td>

                                <td><div className='exportBtn'>
                                <button onClick={generatePDF}>Export Report</button>
                            </div></td>
                                </tr></table>
                            </div>
                        {/* Current Month Appointments Summary */}
                        <div className="current-month-summary">
                            <h4 style={{color:'#416D19'}}>{getText()}</h4>
                            <table style={{width:'45%'}}>
                                <tbody>
                                    <tr>
                                        <td><b>Pending: </b>{countsByStatus['Pending']}</td>
                                        <td><b>Accepted: </b>{countsByStatus['Accepted']}</td>
                                        <td><b>Rejected: </b>{countsByStatus['Rejected']}</td>
                                        <td><b>Total: </b>{countsByStatus['Total']}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Table of Appointments */}
                        <div className='navitr' style={{marginTop:'20px'}}>
                            <div>
                                <table style={{ borderCollapse: 'collapse', width: '100%',}}>
                                    <thead style={{backgroundcolor:'#BFEA7C'}}>
                                        <tr style={{backgroundColor:'#f5f5f5'}}>
                                            <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C' }}>Name</th>
                                            <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C' }}>Address</th>
                                            <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}}>Contact No:</th>
                                            <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}}>Service Package</th>
                                            <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}}>Date</th>
                                            <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}}>Time</th>
                                            <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}} colSpan={2}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAppointments.map((c) => (
                                            <tr key={c._id} style={{backgroundColor: c.status === 'Accepted' ? '#ADD8E6' : c.status === 'Rejected' ? '#FFA07A' : '#d6f6a3', cursor: 'pointer'}} 
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF67E'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = c.status === 'Accepted' ? '#ADD8E6' : c.status === 'Rejected' ? '#FFA07A' : '#d6f6a3'}>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{c.fullName}</td>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{c.address}</td>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{c.phoneNumber}</td>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{c.servicePackage}</td>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{c.selectedDate}</td>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{c.selectedTime}</td>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>
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
                                                        <span
                                                            style={{
                                                                color: c.status === 'Accepted' ? '#0F9D58' : c.status === 'Rejected' ? '#DB4437' : '#000000',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => {
                                                                // Check if appointment is not passed
                                                                const appointmentDate = new Date(c.selectedDate);
                                                                const currentDate = new Date();
                                                                if (appointmentDate >= currentDate) {
                                                                    const newStatus = c.status === 'Accepted' ? 'Rejected' : 'Accepted';
                                                                    handleStatusChange(c._id, newStatus);
                                                                } else {
                                                                    toast.error('Cannot change status for passed date appointments');
                                                                }
                                                            }}
                                                        >
                                                            {c.status}
                                                        </span>
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
        </Layout1>
    );
};

export default AppointmentDashboard;
