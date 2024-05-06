import React, { useEffect, useState } from 'react';
import Layout1 from '../components/Layout/Layout1';
import '../components/Appointment.css';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from '../context/auth';

// Function to get today's date in the format YYYY-MM-DD
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const UpdateAppointment = () => {
  const {id} = useParams();
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [servicePackage, setServicePackage] = useState("homeBasic");
    const [comments, setComments] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [userId, setUserId] = useState("");
    const [auth,setAuth] = useAuth()
    const navigate = useNavigate();
    

  //get single appointment
  const getSingleAppointment = async () => {
    try {
          const { data } = await axios.get(`/api/v1/appointment/single-appointment/${id}`);
          setFullName(data.appointment.fullName);
          setAddress(data.appointment.address);
          setPhoneNumber(data.appointment.phoneNumber);
          setEmail(data.appointment.email);
          setServicePackage(data.appointment.servicePackage);
          setComments(data.appointment.comments);
          setSelectedDate(data.appointment.selectedDate);
          setSelectedTime(data.appointment.selectedTime);
          setUserId(data.appointment.userId);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(id)

  useEffect(() => {
    getSingleAppointment();
    //eslint-disable-next-Line
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (phoneNumber.length !== 10) {
        toast.error("Contact number must be 10 characters long");
        return;
      }
      const res = await axios.put(`/api/v1/appointment/update-appointment/${id}`, {
        fullName,
        address,
        phoneNumber,
        email,
        servicePackage,
        comments,
        selectedDate,
        selectedTime,
        userId
      });
      console.log(res.data);  // Log the response
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate('/myappointments');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.response.data);  // Log the error
      toast.error('Something went wrong');
    }
  };

  const handleFullNameChange = (e) => {
    const input = e.target.value;
    // Regular expression to allow only letters (both uppercase and lowercase) and spaces
    const regex = /^[A-Za-z\s]+$/;
    if (regex.test(input)) {
      setFullName(input);
    }
  };


//////////////////////////
useEffect(() => {
    if (auth && auth.user) {
      setUserId(auth.user._id);
     
    }
  }, [auth]);
  ///////////////////////////////

  return (
    <Layout1 title={'Edit Appointment - Ceylon Green'}>
      <div className='border'>
        <form onSubmit={handleUpdate} className="appointment-form">
          <h2>Update Appointment</h2>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={handleFullNameChange}
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
              min={getTodayDate()}
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
            {/* <button type="button">Cancel</button> */}
            <button>Save Changes</button>
          </div>
        </form>
      </div>
    </Layout1>
  )
}

export default UpdateAppointment;