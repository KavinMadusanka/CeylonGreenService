import React, { useEffect, useState } from 'react';
import Layout1 from '../components/Layout/Layout1';
import '../components/Appointment.css';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from '../context/auth';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Modal } from "antd";
import Appointment1 from './Appointment1';


const MyAppointments = () => {
    const [appointments, setAppointments] = useState([])
    const [filteredAddresses, setFilteredAddresses] = useState([]);
    const [id,setId] = useState([])
    const [auth,setAuth] = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedServicePackage, setSelectedServicePackage] = useState(""); // Define selectedServicePackage state
    const [modalContent, setModalContent] = useState(null);
    const [visible, setVisible] = useState(false);
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
                // toast.error('awaaaaa')
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
    try {
      const { data } = await axios.delete(
        `/api/v1/appointment/delete-appointment/${userId}`
      );
      if (data.success) {
        toast.success('Appointment deleted successfully');

        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
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
    doc.text("Appointment Details", 10, 10);
    // Add appointment details to the PDF
    doc.text(`Name: ${appointment.fullName}`, 10, 20);
    doc.text(`Address: ${appointment.address}`, 10, 30);
    doc.text(`Phone No: ${appointment.phoneNumber}`, 10, 40);
    doc.text(`Email: ${appointment.email}`, 10, 50);
    doc.text(`Service Package: ${appointment.servicePackage}`, 10, 60);
    doc.text(`Date: ${appointment.selectedDate}`, 10, 70);
    doc.text(`Time: ${appointment.selectedTime}`, 10, 80);
    // Save the PDF with a unique name (e.g., based on appointment ID)
    doc.save(`appointment_${appointment._id}.pdf`);
  };


  // Function to handle modal visibility and content
  const handleModal = (content) => {
    setVisible(true);
    setModalContent(content);
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
                    {/* <Link to="/appointment1"> */}
                    <button className="book-appointment-btn" onClick={() => { handleModal(<Appointment1 />);}}>Book Appointment</button>
                    {/* </Link> */}
                </div>
                    {filteredAddresses.map(a => (
                        <div className="card m-2" style={{width: '100%'}} key={a._id}>
                        <div className="card-body">
                            {/* <h5 className="card-title">{a.fullName}</h5> */}
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
                    ))}
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}>
                {modalContent}
              </Modal> 
        </Layout1>
    );
};

export default MyAppointments;