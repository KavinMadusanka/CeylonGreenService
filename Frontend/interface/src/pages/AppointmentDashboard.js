import React, { useState, useEffect } from 'react';
import Layout1 from '../components/Layout/Layout1';
import '../components/Appointment.css';

const AppointmentDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    useEffect(() => {
        // Fetch mock data for pending appointments
        fetch('/api/pending-appointments')
            .then(response => response.json())
            .then(data => {
                setAppointments(data);
                setFilteredAppointments(data);
            })
            .catch(error => console.error('Error fetching pending appointments:', error));
    }, []);

    const handleViewDetails = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const handleAccept = (id) => {
        updateStatus(id, 'Accepted');
    };

    const handleReject = (id) => {
        updateStatus(id, 'Rejected');
    };

    const updateStatus = (id, status) => {
        const updatedAppointments = appointments.map(appointment =>
            appointment.id === id ? { ...appointment, status: status } : appointment
        );
        setAppointments(updatedAppointments);
        setSelectedAppointment(null);
        // Implement notification system here
    };

    const handleBack = () => {
        setSelectedAppointment(null);
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
        const headers = ['ID', 'Name', 'Date', 'Time', 'Status'];
        const csv = [
            headers.join(','),
            ...data.map(appointment => [appointment.id, appointment.name, appointment.date, appointment.time, appointment.status].join(','))
        ].join('\n');
        return csv;
    };

    return (
        <Layout1 title={'Appointment Dashboard - Ceylon Green'}>
            <div className="home-container">
                <section className="dashboard-section">
                    <div className="section-title">
                        <h2>Pending Appointment Requests</h2>
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
                    {selectedAppointment ? (
                        <div className="appointment-details">
                            <h3>Appointment Details</h3>
                            <p>ID: {selectedAppointment.id}</p>
                            <p>Name: {selectedAppointment.name}</p>
                            <p>Date: {selectedAppointment.date}</p>
                            <p>Time: {selectedAppointment.time}</p>
                            <p>Status: {selectedAppointment.status}</p>
                            <button onClick={() => handleAccept(selectedAppointment.id)}>Accept</button>
                            <button onClick={() => handleReject(selectedAppointment.id)}>Reject</button>
                            <button onClick={handleBack}>Back</button>
                        </div>
                    ) : (
                        <div className="appointment-list">
                            {filteredAppointments.map(appointment => (
                                <div key={appointment.id} className="appointment-item">
                                    <h3>{appointment.name}</h3>
                                    <p>Date: {appointment.date}</p>
                                    <p>Time: {appointment.time}</p>
                                    <button onClick={() => handleViewDetails(appointment)}>View Details</button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </Layout1>
    );
};

export default AppointmentDashboard;
