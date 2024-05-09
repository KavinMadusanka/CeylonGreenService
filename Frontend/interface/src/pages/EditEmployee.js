import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";


const EditEmployee = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(true);
  const [gender, setGender] = useState("");
  const [nic, setNic] = useState("");
  const [nicValid, setNicValid] = useState(true);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [formValid, setFormValid] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/employee/get-employee/${id}`)
        .then((response) => {
          const { firstname, lastname, email, phone, address, gender, nic } = response.data.employee;
          setFirstName(firstname);
          setLastName(lastname);
          setEmail(email);
          setPhone(phone);
          setAddress(address);
          setGender(gender);
          setNic(nic);
        })
        .catch((error) => {
          console.error("Error fetching employee:", error);
          toast.error("An error occurred while fetching employee data.");
        });
    }
  }, [id]);

  useEffect(() => {
    const isPhoneValid = /^\d{10}$/.test(phone) && phone.startsWith("0");
    const isNicValid =
      (nic.startsWith("2") && /^\d{12}$/.test(nic)) ||
      (!nic.startsWith("2") && /^\d{9}V$/.test(nic));
    setPhoneValid(isPhoneValid);
    setNicValid(isNicValid);
    setFormValid(
      firstname.trim() !== "" &&
      lastname.trim() !== "" &&
      email.trim() !== "" &&
      isPhoneValid &&
      address.trim() !== "" &&
      gender.trim() !== "" &&
      isNicValid
    );
  }, [firstname, lastname, email, phone, address, gender, nic]);

  const handleChangePhone = (event) => {
    const input = event.target.value;
    if (/^\d{0,10}$/.test(input)) {
      setPhone(input);
      setPhoneValid(input.length === 10 && input.startsWith("0"));
    }
  };

  const handleChangeNIC = (event) => {
    const input = event.target.value;
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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8000/employee/update-employee/:id`,
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
        toast.success(res.data.message);
        window.location = "/smdashboard/employee";
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("An error occurred while updating employee data.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={onSubmit}>
          <div className="col-6">
            <label htmlFor="inputFirstName" className="form-label">
              First Name:
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputFirstName"
              placeholder="Enter First Name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
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
              placeholder="Enter Last Name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
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
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Enter Phone"
              value={phone}
              onChange={handleChangePhone}
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number starting with 0"
              required
            />
            {!phoneValid && (
              <p>Please enter a valid 10-digit phone number starting with 0</p>
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
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="col-6">
            <label htmlFor="inputGender" className="form-label">
              Gender:
            </label>
            <select
              id="inputGender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="form-control rounded-0"
            >
              <option value=""></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputNic" className="form-label">
              NIC:
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputNic"
              placeholder="Enter NIC"
              value={nic}
              onChange={handleChangeNIC}
            />
            {!nicValid && (
              <p>
                NIC should be either 10 or 12 characters long for NIC starting with '2', or 9 characters followed by 'V' for other NICs
              </p>
            )}
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ width: "70%", backgroundColor: "green" }}
              disabled={!formValid}
            >
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
