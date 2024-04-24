import React from 'react';
import Layout1 from '../components/Layout/Layout1';
import '../components/Appointment.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Appointment4 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const appointmentDetails = location.state;

  const handleCancel = () => {
    navigate('/');
  };

  const handleEdit = () => {
    navigate('/appointment1', { state: appointmentDetails });
  };

  const handleBook = () => {
    // Implement the booking logic
  };

  return (
    <Layout1 title={'Appointment Details - Ceylon Green'}>
      <div className="home-container">
        <section className="appointment-details-section">
          <div className="section-title">
            <h2>Appointment Details</h2>
            <div className="underline"></div>
          </div>
          <div className="appointment-details">
            <p><strong>Full Name:</strong> {appointmentDetails.fullName}</p>
            <p><strong>Address:</strong> {appointmentDetails.address}</p>
            <p><strong>Phone Number:</strong> {appointmentDetails.phoneNumber}</p>
            <p><strong>Email:</strong> {appointmentDetails.email}</p>
            <p><strong>Service Package:</strong> {appointmentDetails.servicePackage}</p>
            <p><strong>Date:</strong> {appointmentDetails.selectedDate}</p>
            <p><strong>Time:</strong> {appointmentDetails.selectedTime}</p>
            <p><strong>Comments:</strong> {appointmentDetails.comments}</p>
          </div>
          <div className="form-buttons">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleBook}>Book Appointment</button>
          </div>
        </section>
      </div>
    </Layout1>
  );
};

export default Appointment4;
