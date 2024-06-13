import React, { useEffect, useState } from 'react';
import Layout1 from '../components/Layout/Layout1';
import '../components/Appointment.css';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from '../context/auth';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Appointment1 from './Appointment1';


const MyAppointments = () => {
    const [appointments, setAppointments] = useState([])
    const [filteredAddresses, setFilteredAddresses] = useState([]);
    const [id,setId] = useState([])
    const [auth,setAuth] = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedServicePackage, setSelectedServicePackage] = useState(""); // Define selectedServicePackage state
    const [visible, setVisible] = useState(false);
    const [packages, setPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    //const [servicePackageOptions, setServicePackageOptions] = useState([]); // Define servicePackageOptions state

        // Handler to update selected service package
    const handleServicePackageChange = (e) => {
        const value = e.target.value;
        setSelectedServicePackage(value === "all" ? "" : value);
    };

    //get all appointments
    const getAllAppointments = async () => {
        try {
            if (auth && auth.user && auth.user._id) {
                const {data} = await axios.get(`/api/v1/appointment/get-appointment/${id}`);
                
                setAppointments(data.appointments);
                getAllAppointments();
            } else {
                toast.error('User not authenticated');
            }
        } catch (error) {
            console.log(error);
            // toast.error('Something went wrong')
        }
    
    
    }


    useEffect(() => {
        if(auth && auth.user){
            setId(auth.user._id);
        }
    }, [auth])
    console.log(id)

    //lifecycle method
    useEffect(() => {
        getAllAppointments();
    }, [id])

     //handel delete address
  const handleDelete = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this appointment?");
  if (confirmed) {
    try {
      const { data } = await axios.delete(`/api/v1/appointment/delete-appointment/${userId}`);
      if (data.success) {
        toast.success('Appointment deleted successfully');
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  };

  // Filter Address based on search term using addresses and names
  useEffect(() => {
    const filtered = appointments.filter((appointment) =>
        appointment.address.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedServicePackage === "" || appointment.servicePackage === selectedServicePackage)
    );
    setFilteredAddresses(filtered);
}, [searchTerm, selectedServicePackage, appointments]);













const generateAppointmentPDF = (appointment) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20; // Adjust the margin as needed

    // Add border around content
    doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

    // Add main title
    doc.setFontSize(20);
    doc.text("CEYLON GREEN CLEANING SERVICE", pageWidth / 2, margin + 10, { align: 'center' });

    // Add title
    doc.setFontSize(18);
    const titleText = "Appointment Details";
    doc.text(titleText, pageWidth / 2, margin + 20, { align: 'center' });

    // Add appointment details
    doc.setFontSize(12);
    doc.text(`Name: ${appointment.fullName}`, margin + 10, margin + 40);
    doc.text(`Address: ${appointment.address}`, margin + 10, margin + 50);
    doc.text(`Phone No: ${appointment.phoneNumber}`, margin + 10, margin + 60);
    doc.text(`Email: ${appointment.email}`, margin + 10, margin + 70);
    doc.text(`Date: ${appointment.selectedDate}`, margin + 10, margin + 80);
    doc.text(`Time: ${appointment.selectedTime}`, margin + 10, margin + 90);
    doc.text(`Service Package: ${appointment.servicePackage}`, margin + 10, margin + 100);
    doc.text(`Service Charge: ${appointment.Pprice}.00`, margin + 10, margin + 110);

    // Add separator line
    doc.line(margin, margin + 120, pageWidth - margin, margin + 120);

    // Add footer
    doc.setFontSize(10);
    const footerText = "Thank you for choosing our service! - CEYLON GREEN SOLUTIONS";
    const footerWidth = doc.getStringUnitWidth(footerText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const footerX = (pageWidth - footerWidth) / 2;
    const footerY = pageHeight - margin - 10; // Adjust the Y position as needed
    doc.text(footerText, footerX, footerY);

    // Save the PDF with a unique name (e.g., based on appointment ID)
    doc.save(`appointment_${appointment._id}.pdf`);
};



 




  // Handler to generate PDF for a specific appointment
const handleDownloadPDF = (appointment) => {
    generateAppointmentPDF(appointment);
  };


    return (
        <Layout1 title={'My Appointments - Ceylon Green'}>
            <div className="my-appointments-container">
                <div className="my-appointments-header">
                    <h2>My Appointments</h2>
                    <div className='searchbar w-25'>
                        {/* Search input */}
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-control mb-10"
                            // style={{border:'solid 1px'}}
                            />
                        </div>
                        <div className="dropdown">
                    <select value={selectedServicePackage} onChange={handleServicePackageChange}>
                        <option value="">All Service Packages</option>
                        {/* Replace servicePackageOptions with a list of unique service packages from appointments */}
                        {[...new Set(appointments.map(appointment => appointment.servicePackage))].map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                    <Link to="/appointment1">
                    <button className="book-appointment-btn">Book Appointment</button>
                    </Link>
                </div>



                <table style={{ borderCollapse: 'collapse', width: '100%',}}>
                                <thead style={{backgroundcolor:'#BFEA7C'}}>
                                            <tr style={{backgroundColor:'#f5f5f5'}}>
                                                <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C' }}>Name</th>
                                                <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C' }}>Adress</th>
                                                <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}}>Phone No.</th>
                                                {/* <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}}>E mail</th> */}
                                                <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}}>Date</th>
                                                <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}}>Time</th>
                                                <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}}>Service Package</th>
                                                <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}}>Charge(Rs.)</th>
                                                <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}}></th>
            
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {filteredAddresses.map((p) => (
                                            <tr key={p._id} style={{backgroundColor:'#d6f6a3', cursor: 'pointer'}} 
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF67E'} 
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d6f6a3'}>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{p.fullName}</td>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{p.address}</td>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{p.phoneNumber}</td>
                                                {/* <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{p.email}</td> */}
                                                <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{p.selectedDate}</td>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{p.selectedTime}</td>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{p.servicePackage}</td>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'right'}}>{p.Pprice}.00</td>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>
                                                <div className="buttonset">
                                                <button className="view-btn"  onClick={() => handleDownloadPDF(p)}><a href="">Download</a></button>
                                    <button className="edit-btn"><a href={`/updateAppointment/${p._id}`}>Edit</a></button>
                                                        <button className="delete-btn"
                                                        onClick={() => {
                                                            handleDelete(p._id);
                                                            }}> Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                </table>
                    

                    {/* card view */}
                    {/* {filteredAddresses.map(a => (
                        <div className="card m-2" style={{width: '100%'}} key={a._id}>
                        <div className="card-body">
                                <p className="card-text"><b>Name:</b> {a.fullName} | <b>Address:</b> {a.address} | <b>Phone No:</b> {a.phoneNumber} | <b>E mail:</b> {a.email}</p>
                                <p className="card-text"><b>Service Package:</b> {a.servicePackage} | <b>Date:</b> {a.selectedDate} | <b>Time:</b> {a.selectedTime}</p>
                                <div className="buttonset">
                                    <button className="view-btn"  onClick={() => handleDownloadPDF(a)}><a href="">Download</a></button>
                                    <button className="edit-btn"><a href={`/updateAppointment/${a._id}`}>Edit</a></button>
                                    <button className="delete-btn"
                                    onClick={() => {
                                        handleDelete(a._id);
                                        }}> Delete</button>
                                </div>
                        </div>
                        </div>
                    ))} */}
            </div>
        </Layout1>
    );
};

export default MyAppointments;