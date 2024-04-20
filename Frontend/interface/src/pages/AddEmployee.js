import axios from "axios";
import React, { useEffect, useState } from "react";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    pronouns: "",
    salary: "",
    leaves: 0,
    status: "",
    address: "",
    email: "",
    profileImageUrl: "",
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/smdashboard/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/smdashboard/employee/addemployee", employee)
      .then((result) => console.log(result.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-6">
            <label htmlFor="inputFirstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputFirstName"
              placeholder="Enter First Name"
              onChange={(e) =>
                setEmployee({ ...employee, firstName: e.target.value })
              }
            />
          </div>
          <div className="col-6">
            <label htmlFor="inputLastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputLastName"
              placeholder="Enter Last Name"
              onChange={(e) =>
                setEmployee({ ...employee, lastName: e.target.value })
              }
            />
          </div>
          <div className="col-6">
            <label htmlFor="inputPhone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputPhone"
              placeholder="Enter Phone"
              onChange={(e) =>
                setEmployee({ ...employee, phone: e.target.value })
              }
            />
          </div>
          <div className="col-6">
            <label htmlFor="inputGender" className="form-label">
              Gender
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputGender"
              placeholder="Enter Gender"
              onChange={(e) =>
                setEmployee({ ...employee, gender: e.target.value })
              }
            />
          </div>
          <div className="col-6">
            <label htmlFor="inputPronouns" className="form-label">
              Pronouns
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputPronouns"
              placeholder="Enter Pronouns"
              onChange={(e) =>
                setEmployee({ ...employee, pronouns: e.target.value })
              }
            />
          </div>
          <div className="col-6">
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-6">
            <label htmlFor="inputLeaves" className="form-label">
              Leaves
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputLeaves"
              placeholder="Enter Leaves"
              onChange={(e) =>
                setEmployee({ ...employee, leaves: e.target.value })
              }
            />
          </div>
          <div className="col-6">
            <label htmlFor="inputStatus" className="form-label">
              Status
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputStatus"
              placeholder="Enter Status"
              onChange={(e) =>
                setEmployee({ ...employee, status: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Enter Address"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail"
              placeholder="Enter Email"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12 mb-3">
            <label for="inputGroupFile01" className="form-label">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              onChange={(e) =>
                setEmployee({ ...employee, image: e.target.files[0] })
              }
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100"
            style={{ width: "70%", backgroundColor: "green" }}>
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
