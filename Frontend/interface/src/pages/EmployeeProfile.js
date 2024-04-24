import React from "react";
import "./EmployeeProfile.css";

const EmployeeProfile = () => {
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
    profileImageUrl:
      "",
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

