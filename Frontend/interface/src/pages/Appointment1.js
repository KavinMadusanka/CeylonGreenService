import React, { useState } from 'react';
import Layout1 from '../components/Layout/Layout1';
import '../components/Appointment.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Appointment1 = () => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [servicePackage, setServicePackage] = useState("homeBasic");
  const [comments, setComments] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/appointment/appointment1', {
        fullName,
        address,
        phoneNumber,
        email,
        servicePackage,
        comments,
        selectedDate,
        selectedTime
      });
      console.log(res.data);  // Log the response
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/appointment2');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.response.data);  // Log the error
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout1 title={'Make Appointment - Ceylon Green'}>
      <div className='border'>
        <form onSubmit={handleSubmit} className="appointment-form">
          <h2>Appointment Form</h2>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="servicePackage">Service Package:</label>
            <select
              id="servicePackage"
              name="servicePackage"
              value={servicePackage}
              onChange={(e) => setServicePackage(e.target.value)}
            >
              <optgroup label="Home Services">
                <option value="homeBasic">Home Basic - Includes vacuuming and dusting</option>
                <option value="homeStandard">Home Standard - Basic + kitchen and bathroom cleaning</option>
                <option value="homePremium">Home Premium - Standard + deep cleaning and sanitization</option>
              </optgroup>
              <optgroup label="Company Services">
                <option value="companyBasic">Company Basic - Includes vacuuming and trash removal</option>
                <option value="companyStandard">Company Standard - Basic + office area cleaning</option>
                <option value="companyPremium">Company Premium - Standard + meeting room cleaning</option>
              </optgroup>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="selectedDate">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="selectedTime">Select Time:</label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="comments">Additional Comments:</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Enter any additional comments"
            ></textarea>
          </div>

          <div className="form-buttons">
            <button type="button">Cancel</button>
            <button type="submit">Next</button>
          </div>
        </form>
      </div>
    </Layout1>
  );
};

export default Appointment1;
