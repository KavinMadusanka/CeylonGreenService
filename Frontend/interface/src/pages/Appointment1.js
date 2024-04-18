import React, { useState } from 'react';
import Layout1 from '../components/Layout/Layout1';
import '../components/Appointment.css';
import {toast} from 'react-toastify';

const Appointment1 = () => {
  const [fullName,setFullName] = useState("");
  const [address,setAddress] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("");
  const [email,setEmail] = useState("");
  const [,] = useState("");
  const [comments,setComments] = useState("");

  // form function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fullName,address,phoneNumber,email,comments);
    toast.success('Sent Appointment Successfully');
  };

  return (
    <Layout1 title={'Ceylon Green - Appointment'}>
      <div className='border'>
        <form className="appointment-form">
      <h2>Appointment Form</h2>
      <div className="form-group">
        <label htmlFor="fullName">Full Name:</label>
        <input 
        type="text" 
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Enter your full name"
        required />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <textarea 
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your address"
        required></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input 
        type="tel" 
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter your phone number"
        required />
      </div>
      <div className="form-group">
        <label htmlFor="email">E-mail Address:</label>
        <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address" 
        required />
      </div>
      <div className="form-group">
        <label htmlFor="servicePackage">Service Package:</label>
        <select id="servicePackage" name="servicePackage">
          <option value="basic">Basic Package</option>
          {/* Add more options for other service packages here */}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="comments">Additional Comments:</label>
        <textarea 
        value={comments} 
        onChange={(e) => setComments(e.target.value)}
        placeholder="Enter any additional comments"></textarea>
      </div>
      <div className="form-buttons">
        <button type="button">Cancel</button>
        <button type="submit">Next</button>
      </div>
    </form>
    </div>
    </Layout1>
  )
}

export default Appointment1;