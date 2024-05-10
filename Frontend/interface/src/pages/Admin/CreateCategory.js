import React, { useEffect, useState } from "react";
import PrAdminMenu from "../../components/Layout/PrAdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import "../../components/CreateCategory.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Layout1 from "../../components/Layout/Layout1";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/category/create-category",
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
        setFilteredCategories(data?.category); // Initialize filteredCategories with all categories
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong when getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somthing went wrong");
    }
  };

  // Delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somthing went wrong");
    }
  };

  // Filter categories based on search term
  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  // Function to generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Categories Report", 10, 10);
    doc.autoTable({ html: '#category-table' });
    doc.save("categories_report.pdf");
  };

  return (
    <Layout1 >
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <PrAdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Manage Category</h1>

          <div className="p-3 w-50">
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
          </div>
          <div className="w-75">
            {/* Search input */}
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control mb-3"
            />
            <button className="btn btn-primary mb-3" onClick={generatePDF}>Generate PDF Report</button>
            <table id="category-table" className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>
                      <button
                        className="btn btn-primary ms-2"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}
                      >
                        Edit
                      </button>
                      <button className="btn btn-danger ms-2" onClick={() => handleDelete(c._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
          </Modal>
        </div>
      </div>
    </div>
    </Layout1>
  );
};

export default CreateCategory;
