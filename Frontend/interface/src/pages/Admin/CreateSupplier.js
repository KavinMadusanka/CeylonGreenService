import React, { useState, useEffect } from "react";
import PrAdminMenu from "../../components/Layout/PrAdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../components/CreateSupplier.css";


const CreateSupplier = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
//validation
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (contactNo.length !== 10) {
        toast.error("Contact number must be 10 characters long");
        return;
      }
      const response = await axios.post("http://localhost:8000/api/v1/supplier/dashboard/admin/create-supplier", {
        name,
        address,
        contactNo,
        email,
      });
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        navigate("/dashboard/admin/suppliers");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error creating supplier:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <PrAdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Create Supplier</h1>
          <form onSubmit={handleCreate}>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={address}
                placeholder="Address"
                className="form-control"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={contactNo}
                placeholder="Contact No"
                className="form-control"
                onChange={(e) => setContactNo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                placeholder="Email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Supplier
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSupplier;