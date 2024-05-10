import React, { useState, useEffect } from "react";
import PrAdminMenu from "../../components/Layout/PrAdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../components/UpdateSupplier.css";
import Layout1 from "../../components/Layout/Layout1";

const UpdateSupplier = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [email, setEmail] = useState("");
  
    const getSingleSupplier = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/supplier/get-supplier/${params.id}`);
        console.log("Response:", response);
        const { data } = response;
        setName(data?.supplier?.name || "");
        setAddress(data?.supplier?.address || "");
        setContactNo(data?.supplier?.contactNo || "");
        setEmail(data?.supplier?.email || "");
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getSingleSupplier();
    }, []);
  
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(`http://localhost:8000/api/v1/supplier/update-supplier/${params.id}`, {
          name,
          address,
          contactNo,
          email,
        });
        const { data } = response;
        if (data?.success) {
          toast.success(data.message || "Supplier updated successfully");
          navigate("/dashboard/admin/suppliers");
        } else {
          toast.success(data.message );
        }
      } catch (error) {
        console.error("Error updating supplier:", error);
        toast.error("Something went wrong");
      }
    };
  
    return (
      <Layout1 >
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <PrAdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Supplier</h1>
            <form onSubmit={handleUpdate}>
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
                Update Supplier
              </button>
            </form>
          </div>
        </div>
      </div>
      </Layout1>
    );
  };

export default UpdateSupplier;
