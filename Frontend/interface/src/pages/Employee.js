import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/Employee.css";
import Header1 from "../components/Layout/Header1";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [editEmployeeData, setEditEmployeeData] = useState({});
  console.log("object::> ", editEmployeeData);
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();
  const [nicValid, setNicValid] = useState(true);
  const [nic, setNic] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(true);
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [selectedGender, setSelectedGender] = useState(""); // New state for selected gender filter

  const handleChangeNIC = (e) => {
    const { name, value } = e.target;

    setEditEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const input = e.target.value;
    setNic(input);
    setNicValid(validateNIC(input));
  };

  const validateNIC = (nic) => {
    if (nic.startsWith("2")) {
      return /^\d{12}$/.test(nic);
    } else {
      return /^\d{9}V$/.test(nic);
    }
  };

  const handleChangePhone = (e) => {
    const { name, value } = e.target;
    setEditEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const input = e.target.value;
    if (/^\d{0,10}$/.test(input)) {
      setPhone(input);
      setPhoneValid(input.length === 10 && input.startsWith("0"));
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/employees/get-employees")
      .then((response) => {
        const data = response.data;
        if (data && data.success) {
          setEmployees(data.employees);
        } else {
          toast.error(
            data && data.message
              ? data.message
              : "Unexpected response from server"
          );
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/v1/employees/employees/${id}`)
      .then((result) => {
        if (result.data.success) {
          setEmployees(employees.filter((employee) => employee._id !== id));
          toast.success("Employee deleted successfully!");
        } else {
          toast.error(
            result.data.message ||
              "An error occurred while deleting the employee."
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        toast.error("Failed to delete employee. Please try again later.");
      });
  };

  const handleEdit = (id) => {
    axios
      .get(`http://localhost:8000/api/v1/employees/get-employee/${id}`)
      .then((response) => {
        const data = response.data.employee[0];
        console.log("data::> ", data);
        if (data) {
          setEditEmployeeData(data);
          setShowEditForm(true);
        } else {
          toast.error(
            data && data.message
              ? data.message
              : "Failed to fetch employee data for editing"
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching employee for editing:", error);
        toast.error(
          "Failed to fetch employee data for editing. Please try again later."
        );
      });
  };
  const handleFormEmail = (e) => {
    const { name, value } = e.target;
    setEditEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditEmployeeData((prevData) => ({
      ...prevData,
      [name]: value.replace(/[^A-Za-z]/gi, ""), // Replace non-alphabetic characters
    }));
  };

  const handleFormSubmit = () => {
    axios
      .put(
        `http://localhost:8000/api/v1/employees/update-employee/${editEmployeeData._id}`,
        editEmployeeData
      )
      .then((response) => {
        const data = response.data;
        if (data && data.success) {
          toast.success("Employee updated successfully!");
          setShowEditForm(false);
          setEditEmployeeData({});
          window.location.reload(); // Reload the page after successful edit
        } else {
          toast.error(
            data && data.message
              ? data.message
              : "Failed to update employee data"
          );
        }
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        toast.error("Failed to update employee data. Please try again later.");
      });
  };

  const handleCancel = () => {
    setShowEditForm(false);
    setEditEmployeeData({});
  };

  // Function to filter employees based on search input
  const filteredEmployees = employees.filter((employee) => {
    const firstNameMatch = employee.firstname
      .toLowerCase()
      .includes(searchFirstName.toLowerCase());
    const lastNameMatch = employee.lastname
      .toLowerCase()
      .includes(searchLastName.toLowerCase());
    const genderMatch =
      selectedGender === "" ||
      employee.gender.toLowerCase() === selectedGender.toLowerCase(); // Check if gender matches the selected gender filter or if no filter is applied
    return firstNameMatch && lastNameMatch && genderMatch;
  });

  return (
    <>
      <Header1 />
      <div className="px-12 mt-3">
        <div className="d-flex justify-content-center">
          <h3>Employee List</h3>
        </div>
        <div className="mt-3">
          <div className="row">
            <div className="col-md-4 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by First Name"
                value={searchFirstName}
                onChange={(e) => setSearchFirstName(e.target.value)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Last Name"
                value={searchLastName}
                onChange={(e) => setSearchLastName(e.target.value)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <select
                className="form-control"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>
        <Link to="/smdashboard/addemployee" className="btn btn-success">
          Add Employee
        </Link>
        <div className="mt-6">
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Gender</th>
                <th>NIC</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.firstname}</td>
                  <td>{employee.lastname}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.address}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.nic}</td>

                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleEdit(employee._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showEditForm && (
            <div className="d-flex justify-content-center align-items-center mt-3">
              <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Edit Employee</h3>
                <form className="row g-1">
                  <div className="col-6">
                    <label htmlFor="inputFirstName" className="form-label">
                      First Name:
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="inputFirstName"
                      name="firstname"
                      placeholder="Enter First Name"
                      value={editEmployeeData.firstname}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="inputLastName" className="form-label">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="inputLastName"
                      name="lastname"
                      placeholder="Enter Last Name"
                      value={editEmployeeData.lastname}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputEmail" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-0"
                      id="inputEmail"
                      name="email"
                      placeholder="Enter Email"
                      value={editEmployeeData.email}
                      onChange={handleFormEmail}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputPhone" className="form-label">
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      className="form-control rounded-0"
                      id="inputPhone"
                      name="phone"
                      placeholder="Enter Phone"
                      value={editEmployeeData.phone}
                      onChange={handleChangePhone}
                      maxLength="10"
                      minLength="10"
                      pattern="[0-9]{10}"
                      title="Please enter a valid 10-digit phone number starting with 0"
                      required
                    />
                    {!phoneValid && (
                      <p>
                        Please enter a valid 10-digit phone number starting with
                        0
                      </p>
                    )}
                  </div>

                  <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">
                      Address:
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="inputAddress"
                      name="address"
                      placeholder="Enter Address"
                      value={editEmployeeData.address}
                      onChange={handleFormChange}
                    />
                  </div>
                  {showEditForm ? (
                    <div className="col-6">
                      <label htmlFor="inputGender" className="form-label">
                        Gender:
                      </label>
                      {/* <select
                        id="inputGender"
                        value={editEmployeeData.gender}
                        name="gender"
                        onChange={handleFormChange}
                        className="form-control rounded-0"
                      >
                        <option></option>
                        <option>Male</option>
                        <option>Female</option>
                      </select> */}
                      <input
                        type="text"
                        className="form-control rounded-0"
                        id="inputGender"
                        name="gender"
                        placeholder="Enter Gender"
                        value={editEmployeeData.gender}
                        readOnly="true"
                      />
                    </div>
                  ) : null}
                  <div className="col-12">
                    <label htmlFor="inputNic" className="form-label">
                      NIC:
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="inputNic"
                      name="nic"
                      placeholder="Enter NIC"
                      value={editEmployeeData.nic}
                      onChange={handleChangeNIC}
                    />
                    {!nicValid && (
                      <p>
                        NIC should be either 10 or 12 characters long for NIC
                        starting with '2', or 9 characters followed by 'V' for
                        other NICs
                      </p>
                    )}
                  </div>

                  <div className="col-12">
                    <button
                      className="btn btn-success"
                      onClick={handleFormSubmit}
                    >
                      Submit
                    </button>
                    <button className="btn btn-success" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Employee;
