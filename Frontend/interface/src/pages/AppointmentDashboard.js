import React, { useState, useEffect } from 'react';
import Layout1 from '../components/Layout/Layout1';
import '../components/Appointment.css';
import axios from "axios";
import toast from 'react-hot-toast';

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

    const handleExport = () => {
        const csvData = convertToCSV(filteredAppointments);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'appointments_report.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const convertToCSV = (data) => {
        const headers = ['Name', 'Address', 'Contact No', 'Email', 'Service Package', 'Date', 'Time', 'Status'];
        const csv = [
            headers.join(','),
            ...data.map(appointment => [
                appointment.fullName,
                appointment.address,
                appointment.phoneNumber,
                appointment.email,
                appointment.servicePackage,
                appointment.selectedDate,
                appointment.selectedTime,
                appointment.status
            ].join(','))
        ].join('\n');
        return csv;
    };

    return (
        <Layout1 title={'Appointment Dashboard - Ceylon Green'}>
            <div className="home-container">
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
                        <button onClick={handleExport}>Export Report</button>
                    </div>
                    
                    
                    <div className="table-container">
                    <div >
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
                    <tr>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>Name</th>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>Address</th>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>Contact No:</th>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>Email</th>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>servicePackage</th>
                        {/* <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>comments</th> */}
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>selectedDate</th>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>selectedTime</th>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px', textAlign: 'center' }} colSpan={2}>Status</th>
                    </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((c) => (
                    <tr key={c._id}>
                        <td >{c.fullName}</td>
                        <td >{c.address}</td>
                        <td >{c.phoneNumber}</td>
                        <td >{c.email}</td>
                        <td >{c.servicePackage}</td>
                        {/* <td >{c.comments}</td> */}
                        <td >{c.selectedDate}</td>
                        <td >{c.selectedTime}</td>
                        <td>
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


            
        </Layout1>
    );
};

export default AppointmentDashboard;
