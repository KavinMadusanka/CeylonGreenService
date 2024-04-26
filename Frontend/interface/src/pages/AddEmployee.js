import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddEmployee = () => {
  const [employee, setEmployee] = useState("");
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [phone, setphone] = useState("");
  const [gender, setgender] = useState("");
  const [pronouns, setpronouns] = useState("");
  const [salary, setsalary] = useState("");
  const [leaves, setleaves] = useState("");
  const [status, setstatus] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const [profileImageUrl, setprofileImageUrl] = useState("");
  const navigate = useNavigate();

  // const [category, setCategory] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/smdashboard/category")
  //     .then((result) => {
  //       if (result.data.Status) {
  //         setCategory(result.data.Result);
  //       } else {
  //         alert(result.data.Error);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/v1/employee/smdashboard/addemployee", {
        firstname,
        lastname,
        phone,
        gender,
        pronouns,
        salary,
        leaves,
        status,
        address,
        email,
        profileImageUrl,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/smdashboard/addemployee");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {}
    // axios
    //   .post("http://localhost:3000/smdashboard/addemployee", employee)
    //   .then((result) => console.log(result.data))
    //   .catch((err) => console.log(err));
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
              value={firstname}
              onChange={(e) => setfirstName(e.target.value)}
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
              value={lastname}
              onChange={(e) => setlastName(e.target.value)}
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
              value={phone}
              onChange={(e) => setphone(e.target.value)}
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
              value={gender}
              onChange={(e) => setgender(e.target.value)}
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
              value={pronouns}
              onChange={(e) => setpronouns(e.target.value)}
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
              value={salary}
              onChange={(e) => setsalary(e.target.value)}
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
              value={leaves}
              onChange={(e) => setleaves(e.target.value)}
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
              value={status}
              onChange={(e) => setstatus(e.target.value)}
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
              value={address}
              onChange={(e) => setaddress(e.target.value)}
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
              value={email}
              onChange={(e) => setemail(e.target.value)}
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
              value={profileImageUrl}
              onChange={(e) => setprofileImageUrl(e.target.files[1])}
            />
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
  );
};

export default AddEmployee;
