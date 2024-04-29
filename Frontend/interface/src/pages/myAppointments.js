import React, { useEffect, useState } from 'react';
import Layout1 from '../components/Layout/Layout1';
import '../components/Appointment.css';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from '../context/auth';


const MyAppointments = () => {
    const [appointments, setAppointments] = useState([])
    const [filteredAddresses, setFilteredAddresses] = useState([]);
    const [id,setId] = useState([])
    const [auth,setAuth] = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedServicePackage, setSelectedServicePackage] = useState(""); // Define selectedServicePackage state
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



  const downloadPDF = async (appointmentId) => {
    try {
        const response = await axios.get(`/api/v1/appointment/download-pdf/${appointmentId}`, {
            responseType: 'blob', // Important to specify the response type as blob
        });

        // Create a Blob from the response data
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

        // Retrieve the appointment details to get the file name
        const appointment = appointments.find(a => a._id === appointmentId);

        // Create a Blob URL for the PDF data
        const url = window.URL.createObjectURL(pdfBlob);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', appointment ? `${appointment.fullName}_appointment.pdf` : 'appointment.pdf');
        document.body.appendChild(link);

        // Trigger the download by clicking the link
        link.click();

        // Cleanup: Remove the link and revoke the Blob URL
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.log(error);
        toast.error('Error downloading PDF');
    }
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
                        <div className="dropdown mt-10">
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
                    {filteredAddresses.map(a => (
                        <div className="card m-2" style={{width: '100%'}} key={a._id}>
                        <div className="card-body">
                            {/* <h5 className="card-title">{a.fullName}</h5> */}
                                <p className="card-text"><b>Name:</b> {a.fullName} | <b>Address:</b> {a.address} | <b>Phone No:</b> {a.phoneNumber} | <b>E mail:</b> {a.email}</p>
                                <p className="card-text"><b>Service Package:</b> {a.servicePackage} | <b>Date:</b> {a.selectedDate} | <b>Time:</b> {a.selectedTime}</p>
                                <div className="buttonset">
                                    <button className="view-btn" onClick={() => downloadPDF(a._id)}><a href="">Download</a></button>
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
        </Layout1>
    );
};

export default MyAppointments;