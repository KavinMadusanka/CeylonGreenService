import React from 'react';
import Layout1 from '../components/Layout/Layout1';
import '../components/Appointment.css'

const Appointment1 = () => {
  return (
    <Layout1>
      <div className='border'>
        <form className="appointment-form">
      <h2>Appointment Form</h2>
      <div className="form-group">
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <textarea id="address" name="address" placeholder="Enter your address"></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" />
      </div>
      <div className="form-group">
        <label htmlFor="email">E-mail Address:</label>
        <input type="email" id="email" name="email" placeholder="Enter your email address" />
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
        <textarea id="comments" name="comments" placeholder="Enter any additional comments"></textarea>
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