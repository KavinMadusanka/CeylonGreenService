import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header1 from "../components/Layout/Header1";

const AddEmployee = () => {
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [phone, setphone] = useState("");
  const [valid, setValid] = useState(true);
  const [gender, setgender] = useState("");
  const [nic, setnic] = useState("");
  const [nicValid, setNicValid] = useState(true);
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    let inputPhone = event.target.value;
    // Trim any input longer than 10 digits
    inputPhone = inputPhone.slice(0, 10);
    const isValidPhone = /^\d{10}$/.test(inputPhone); // Validate 10-digit phone number
  
    setphone(inputPhone); // Update the phone state
  
    // Update the valid state based on phone number validity
    setValid(isValidPhone);
  };

  

  const handleChangeNIC = (event) => {
    const input = event.target.value;
    setnic(input);
    setNicValid(validateNIC(input));
  };

  const validateNIC = (nic) => {
    if (nic.startsWith("2")) {
      // NIC starts with 2, validate for 12 digits
      return /^\d{12}$/.test(nic);
    } else {
      // NIC starts with a number other than 2, validate for 9 digits followed by 'V'
      return /^\d{9}V$/.test(nic);
    }
  };

  const handleFirstNameChange = (event) => {
    const input = event.target.value.replace(/[^a-zA-Z]/g, ""); // Remove non-alphabetic characters
    setfirstName(input);
  };

  const handleLastNameChange = (event) => {
    const input = event.target.value.replace(/[^a-zA-Z]/g, ""); // Remove non-alphabetic characters
    setlastName(input);
  };

  const handleEmailChange = (event) => {
    const input = event.target.value.toLowerCase(); // Convert any uppercase letters to lowercase
    setemail(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/employees/addemployee",
        {
          firstname,
          lastname,
          email,
          phone,
          address,
          gender,
          nic,
        }
      );

      if (res && res.data.success) {
        toast.success("Employee Added successfully!");
        navigate("/smdashboard/employee");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding employee. Please try again later.");
    }
  };

  return (
    <>
    <Header1/>
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-6">
            <label htmlFor="inputFirstName" className="form-label">
              First Name :
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputFirstName"
              placeholder="Enter First Name"
              value={firstname}
              onChange={handleFirstNameChange} // Use custom handler for first name
            />
          </div>
          <div className="col-6">
            <label htmlFor="inputLastName" className="form-label">
              Last Name :
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputLastName"
              placeholder="Enter Last Name"
              value={lastname}
              onChange={handleLastNameChange} // Use custom handler for last name
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail" className="form-label">
              Email :
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail"
              placeholder="Enter Email"
              value={email}
              onChange={handleEmailChange} // Use custom handler for email
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPhone" className="form-label">
              Phone Number :
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputPhone"
              placeholder="Enter Phone"
              value={phone}
              onChange={handleChange}
            />
            {!valid && <p>Please enter a valid 10-digit phone number</p>}
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address :
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </div>
          <div className="col-6">
            <label htmlFor="inputGender" className="form-label">
              Gender :
            </label>
            <select
              value={gender}
              onChange={(e) => setgender(e.target.value)}
              className="form-control rounded-0"
            >
              <option></option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputnic" className="form-label">
              NIC :
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputnic"
              placeholder="Enter NIC"
              value={nic}
              onChange={handleChangeNIC}
            />
            {!nicValid && (
              <p>
                NIC should be either 10 or 12 characters long for NIC starting
                with '2', or 9 characters followed by 'V' for other NICs
              </p>
            )}
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ width: "70%", backgroundColor: "green" }}
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddEmployee;
