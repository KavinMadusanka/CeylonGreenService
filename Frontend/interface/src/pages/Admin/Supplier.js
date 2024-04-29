import React, { useState, useEffect } from "react";
import PrAdminMenu from "../../components/Layout/PrAdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllSuppliers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/supplier/get-supplier");
      setSuppliers(data.suppliers);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllSuppliers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/supplier/delete-supplier/${id}`);
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        getAllSuppliers(); // Refresh the suppliers list after deletion
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error deleting supplier:", error);
      toast.error("Something went wrong when deleting supplier");
    }
  };

  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Suppliers Report", 10, 10);
    doc.autoTable({
      head: [['Name', 'Address', 'Contact No', 'Email']],
      body: filteredSuppliers.map(supplier => [supplier.name, supplier.address, supplier.contactNo, supplier.email])
    });
    doc.save("suppliers_report.pdf");
  };

  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <PrAdminMenu />
        </div>
        <div className="col-md-9">
          <h1>All Suppliers List</h1>
          {/* Search input */}
          <input
            type="text"
            placeholder="Search suppliers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control mb-3"
          />
          <button onClick={generatePDF} className="btn btn-primary mb-3">
            Generate PDF
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Contact No</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier._id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.contactNo}</td>
                  <td>{supplier.email}</td>
                  <td>
                    <Link to={`/dashboard/admin/update-supplier/${supplier._id}`} className="btn btn-primary me-2">Edit</Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(supplier._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
