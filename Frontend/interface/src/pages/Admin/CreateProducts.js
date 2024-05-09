import React, { useState, useEffect } from "react";
import PrAdminMenu from "../../components/Layout/PrAdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import "../../components/CreateProducts.css";

const { Option } = Select;

const CreateProducts = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [supplier, setSupplier] = useState("");
  const [reorderLevel, setReorderLevel] = useState("");

  useEffect(() => {
    // Fetch categories and suppliers when component mounts
    getAllCategory();
    getAllSuppliers();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong when getting category");
    }
  };

  const getAllSuppliers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/supplier/get-supplier");
      setSuppliers(data.suppliers);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Create FormData object to send product data
      const productData = new FormData();
      productData.append("name", name);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("supplier", supplier);
      productData.append("reorderLevel", reorderLevel);

      // Send POST request to create product
      const { data } = await axios.post("http://localhost:8000/api/v1/product/dashboard/admin/create-product", productData);

      // Handle response
      if (data?.success) {
        toast.success("Product created successfully");
        // Redirect to an appropriate page
        navigate("/dashboard/admin/create-product");
      } else {
        toast.error(data?.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
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
          <h1>Create Product</h1>
          <div className="m-1 w-75">
            {/* Category Select */}
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            {/* Supplier Select */}
            <Select
            bordered={false}
            placeholder="Select a supplier"
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => {
            setSupplier(value);
            }}
>
           {suppliers.map((s) => (
           <Option key={s._id} value={s._id}>
           {s.name}
           </Option>
            ))}
           </Select>

            {/* Photo Upload */}
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            {/* Display Uploaded Photo */}
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"} className="img img-responsive" />
                </div>
              )}
            </div>

            {/* Other Product Details */}
            <div className="mb-3">
              <input type="text" value={name} placeholder="Product Name" className="form-control" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="number" value={price} placeholder="Price" className="form-control" onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="number" value={quantity} placeholder="Quantity" className="form-control" onChange={(e) => setQuantity(e.target.value)} />
            </div>

            {/* Reorder Level Input */}
            <div className="mb-3">
              <input type="number" value={reorderLevel} placeholder="Reorder Level" className="form-control" onChange={(e) => setReorderLevel(e.target.value)} />
            </div>

            {/* Submit Button */}
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleCreate}>CREATE PRODUCT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProducts;
