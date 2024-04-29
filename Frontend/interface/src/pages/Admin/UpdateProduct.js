import React, { useState, useEffect } from "react";
import PrAdminMenu from "../../components/Layout/PrAdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "../../components/UpdateProduct.css";


const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");
    const [suppliers, setSuppliers] = useState([]);
    const [supplier, setSupplier] = useState("");
    

    // Function to get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setCategory(data.product.category._id);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setPhoto(data.product.photo);

        } catch (error) {
            console.log(error);
        }
    };

    // Function to get all categories
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

    // Function to get all suppliers
    const getAllSuppliers = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/supplier/get-supplier");
            if (data?.success) {
                setSuppliers(data?.suppliers);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong when getting suppliers");
        }
    };

    useEffect(() => {
        getSingleProduct();
        getAllCategory();
        getAllSuppliers();
    }, []);

    // Function to handle product update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category);
            productData.append("supplier", supplier);
            const { data } = axios.put(`/api/v1/product/update-product/${id}`, productData);
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Product Updated successfully");
                navigate("/dashboard/admin/products");
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

    };

    // Function to handle product deletion
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are you sure want to delete this product?");
            if (!answer) return;
            const { data } = await axios.delete(
                `/api/v1/product/delete-product/${id}`
            );
            toast.success("Product deleted successfully");
            navigate("/dashboard/admin/product");

        } catch (error) {
            console.log(error);
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
                    <h1>Update Product</h1>
                    <div className="m-1 w-75">
                        <Select
                            bordered={false}
                            placeholder="Select a category"
                            size="large"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setCategory(value);
                            }}
                            value={category}
                        >
                            {categories.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>

                        <Select
                            bordered={false}
                            placeholder="Select Supplier"
                            size="large"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setSupplier(value);
                            }}
                            value={supplier}
                        >
                            {suppliers.map((supplier) => (
                                <Option key={supplier._id} value={supplier._id}>
                                    {supplier.name}
                                </Option>
                            ))}
                        </Select>


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
                        <div className="mb-3">
                            {photo ? (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"} className="img img-responsive" />
                                </div>
                            ) : (
                                <div className="text-center">
                                    <img src={`/api/v1/product/product-photo/${id}`} alt="product_photo" height={"200px"} className="img img-responsive" />
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <input type="text" value={name} placeholder="write a name" className="form-control" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <textarea type="text" value={description} placeholder="write a description" className="form-control" onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="number" value={price} placeholder="write a Price" className="form-control" onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="number" value={quantity} placeholder="write a quantity" className="form-control" onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <Select
                                bordered={false}
                                placeholder="Select Shipping"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setShipping(value);
                                }}
                            >
                                <Option value="0">Out of Stock</Option>
                                <Option value="1">Available</Option>
                            </Select>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary me-2" onClick={handleUpdate}>UPDATE PRODUCT</button>
                            <button className="btn btn-danger" onClick={handleDelete}>DELETE PRODUCT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
