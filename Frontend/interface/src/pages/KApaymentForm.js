import React, { useState, useEffect } from "react";
import Layout2 from '../components/Layout/Layout2';
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/auth';
import {} from '../components/KApaymentForm.css';

const { Option } = Select;

const KApaymentForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [Addresses, setAddresses] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [auth,setAuth] = useAuth();
  

  //get all category
  const getAllAddress = async() =>{
    try {
      const {data} = await axios.get(`api/v1/auth/get-Address/${email}`);
      if(data?.success){
        setAddresses(data?.address);
        getAllAddress();
      }
    } catch (error) {
      console.log(error);
      // toast.error('Somthing went wrong in getting Address');
    }
  };

  useEffect(() => {
    if (auth && auth.user) {
      setEmail(auth.user.email);
    }  
  },[auth])

  useEffect(() => {
    getAllAddress();
  }, [email]);


  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("orderId", orderId);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("address", address);
      productData.append("photo", photo);
      const { data } = await axios.post(
        "/api/v1/payment/KApaymentForm",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Payment slip Uploded Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout2 title={"Dashboard - Upload payment slip"}>
      <div className="container-fluid m-3 p-3" style={{backgroundColor:'white'}}>
        <div className="row" style={{alignItems: 'center', justifyContent:'center'}}>
          {/* <div className="col-md-3">
            <AdminMenu />
          </div> */}
          <div className="col-md-7" style={{border: '1px solid black',borderRadius:'10px'}}>
            <h1 style={{textAlign:'center'}}>Upload Payment slip</h1>
            <div className="m-1 w-75" style={{ display:'contents'}}>
              <Select
                bordered={false}
                placeholder="Select a Address"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                    setAddress(value);
                }}
              >
                {Addresses?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.address}
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
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter your name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={orderId}
                  placeholder="write a orderId"
                  className="form-control"
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              {/* <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div> */}
              <div className="mb-3" style={{ textAlign: "center" }}>
                <button className="btn btn-primary" id="btnedit" onClick={handleCreate}>
                  CREATE PAYMENT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout2>
  );
};

export default KApaymentForm;
