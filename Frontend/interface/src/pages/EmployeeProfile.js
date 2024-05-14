import React, { useEffect, useState } from "react";
import "../components/EmployeeProfile.css";
import { useAuth } from "../context/auth";
import axios from "axios";

import { toast } from "react-toastify";

const EmployeeProfile = () => {
  const [auth, setAuth] = useAuth();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [salary, setSalary] = useState("");
  const [leaves, setLeaves] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNIC] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  // useEffect(() => {
  //   if (auth && auth.user) {
  //     setEmail(auth.user.email);
  //   }
  // }, [auth]);
  // const fetchEmployeeByEmail = async () => {
  //   try {
  //     const employee = await axios.get(
  //       `http://localhost:8000/api/v1/employees/get-employee/${email}`
  //     );
  //     if (employee?.success) {
  //       setFirstName(employee.employee.firstname);
  //       setLastName(employee.employee.lastname);
  //       setEmail(employee.employee.email);
  //       setPhone(employee.employee.phone);
  //       setAddress(employee.employee.address);
  //       setGender(employee.employee.gender);
  //       setNIC(employee.employee.nic);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching cart details:", error);
  //   }
  // };

  const employeeData = {
    firstName: "Imal",
    lastName: "Menuka",
    phone: "0750404611",
    gender: "Male",
    pronouns: "He/Him",
    salary: "Rs.65000.00",
    leaves: 2,
    status: "Active",
    address: "Nattandiya, Sri Lanka",
    email: "imal@gmail.com",
    profileImageUrl: "https://img.icons8.com/?size=128&id=118243&format=png",
  };

  return (
    <>
      <div
        className=""
        style={{
          padding: "20px",
        }}
      >
        <h1>Employee Profile</h1>
        <hr style={{ width: "100%" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: "30px",
            width: "100%",
            height: "600px",
          }}
        >
          <div className="left-section" style={{ width: "50%" }}>
            <div className="personal-info">
              <div className="profile-section" class="box">
                <img
                  src={employeeData.profileImageUrl}
                  alt="User Profile"
                  style={{
                    width: "150px",
                    height: "150px",
                    alignItems: "center",
                  }}
                />
              </div>
              <div className="details">
                <h2>
                  {employeeData.firstName} {employeeData.lastName} ⁠
                </h2>
                <div className="info-row">
                  <span className="label">Status:</span>
                  <span className="value"> {employeeData.status}</span>
                </div>
                <div className="info-row">
                  <span className="label">Address:</span>
                  <span className="value"> {employeeData.address}</span>
                </div>
                <div className="info-row">
                  <span className="label">Email:</span>
                  <span className="value"> {employeeData.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="right-section" style={{ width: "100%" }}>
            <div className="profile-section" class="box">
              <h2>Basic Information</h2>
              <div className="info-row">
                <span className="label">First Name:</span>
                <span className="value"> {employeeData.firstName}</span>
              </div>
              <div className="info-row">
                <span className="label">Last Name:</span>
                <span className="value"> {employeeData.lastName}</span>
              </div>
              <div className="info-row">
                <span className="label">Phone(Work):</span>
                <span className="value"> {employeeData.phone}</span>
              </div>
              <div className="info-row">
                <span className="label">Gender:</span>
                <span className="value"> {employeeData.gender}</span>
              </div>
              <div className="info-row">
                <span className="label">Pronouns:</span>
                <span className="value"> {employeeData.pronouns}</span>
              </div>
              <div className="info-row">
                <span className="label">Salary:</span>
                <span className="value"> {employeeData.salary}</span>
              </div>
              <div className="info-row">
                <span className="label">Leaves:</span>
                <span className="value"> {employeeData.leaves}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className=""
        style={{
          width: "100%",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "70%", backgroundColor: "green" }}
        >
          Edit Employee
        </button>
      </div>
    </>
  );
};

export default EmployeeProfile;

