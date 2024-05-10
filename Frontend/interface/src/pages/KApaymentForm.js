import React, { useState, useEffect } from "react";
import Layout2 from '../components/Layout/Layout2';
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
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

  const [cNumber,setCNumber] = useState("");
  const [province,setProvince] = useState("");
  const [district,setDistrict] = useState("");
  const [postalcode,setPostalcode] = useState("");

  const [deliveryCharge, setDeliveryCharge] = useState(500);
  const [Discription,setDiscription] = useState("");
  const [cart, setCart] = useState([]);
  const [tax, setTax] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const location = useLocation();


  

  //get all Address
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
// console.log(email)
  useEffect(() => {
    getAllAddress();
  }, [email]);


  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (cNumber.length !== 10) {
        toast.error("Contact number must be 10 characters long");
        return;
      }if (photo && photo.length > 0) {
        toast.error("photo is required");
        return;
      }
      const productData = new FormData();
      productData.append("photo", photo);
      productData.append("name", name);
      productData.append("postalcode", postalcode);
      productData.append("cNumber", cNumber);
      productData.append("Discription", Discription);
      productData.append("address", address);
      productData.append("email", email); 
      productData.append("price", price);
      const { data } = await axios.post(
        "/api/v1/payment/KApaymentForm",
        productData
      );
      // const data = await axios.post(
      //   "/api/v1/payment/KApaymentForm",
      //   {name,address,cNumber,postalcode,email,Discription,price}
      // );
      // console.log(email)
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error("Payment slip Uploded faild");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };


      //only gets alpherbatds
      const handleKeyPress = (event) => {
        const regex = /^[a-zA-Z\s]*$/;
        if(!regex.test(event.key)){
          event.preventDefault();
        }
      };
      //only gets numbers
      const handleKeyNumber = (event) => {
        const regex = /^[0-9\s]*$/;
        if(!regex.test(event.key)){
          event.preventDefault();
        }
      };

      const handleAddressChange = async (value) => {
        // setAddress(value);
        try {
          const { data } = await axios.get(`/api/v1/auth/get-single-Address/${value}`);
          if (data?.success) {
            setName(data.address.name);
            setAddress(data.address.address);
            setPostalcode(data.address.postalcode);
            setCNumber(data.address.cNumber);
            setProvince(data.address.province);
            setDistrict(data.address.district);
            
          }
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong in fetching address details');
        }
      };

        //calculation part 

  // useEffect(() => {
  //   // Calculate subtotal
  //   let total = 0;
  //   let totalQuantity = 0; 

  //   cart.forEach(item => {
  //     total += item.product.price * item.quantity;
  //     totalQuantity += item.quantity; 
  //   });

  //   // Add tax
  //   let tax= 50;

  //  // Add delivery charge
  //     let deliveryCharge = 500; // Default delivery charge
  //     if (totalQuantity >= 3) {
  //       deliveryCharge = 0; // Free delivery for 3 or more items
  //     }

  //   // Update subtotal and delivery charge states
  //   setSubtotal(total);
  //   setDeliveryCharge(deliveryCharge);
  //   Tax(tax);
  //   }, [cart]);

  //gettotal from cart page
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const subtotalParam = searchParams.get('subtotal');
    if (subtotalParam) {
      setSubtotal(parseFloat(subtotalParam));
    }
  }, [location.search]);

  useEffect(() => {
    const totalAmount = subtotal
    setPrice(totalAmount.toFixed(2));
  }, [subtotal]);

  return (
    <Layout2 title={"Dashboard - Upload payment slip"}>
      <div className="container-fluid m-3 p-3" style={{backgroundColor:'white'}}>
        <div className="row" style={{alignItems: 'center', justifyContent:'center'}}>
          {/* <div className="col-md-3">
            <AdminMenu />
          </div> */}
          <div className="col-md-7" style={{border: '1px solid black',borderRadius:'10px'}}>
            <h1 style={{textAlign:'center'}}>Upload Payment slip</h1>
            Deliver Address
            <div className="m-1 w-75" style={{ display:'contents'}}>
              <Select
                bordered={false}
                placeholder="Select a Address"
                size="large"
                // showSearch
                className="form-select mb-3"
                // onChange={(value) => {
                //     setAddress(value);
                // }}
                onChange={handleAddressChange}
              >
                {Addresses?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.address}
                  </Option>
                ))}
              </Select>
              <div>
                <table id="table1">
                  <tbody>
                  <tr>
                      <td>Name</td>
                      <td>Contact No:</td>
                      <td>Postalcode</td></tr>
                    <tr>
                      <td className="m-1 w-90" style={{paddingRight:'2%'}}>
                      <input
                        type="text"
                        value={name}
                        placeholder="Enter your name"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        required
                      />
                        </td>
                      <td className="m-1 w-90" style={{paddingRight:'2%'}}>
                      <input
                        type="text"
                        value={cNumber}
                        placeholder="Enter your name"
                        className="form-control"
                        onKeyPress={handleKeyNumber}
                        onChange={(e) => setCNumber(e.target.value)}
                        required
                      />
                        </td>
                      <td className="m-1 w-90">
                      <input
                        type="text"
                        value={postalcode}
                        placeholder="Enter your name"
                        className="form-control"
                        onKeyPress={handleKeyNumber}
                        required
                        // onChange={(e) => setPostalcode(e.target.value)}
                      />
                      </td></tr>
                      <tr><br/></tr>
                </tbody></table>
            </div>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Payment Slip Photo"}
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
              Price
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  readOnly
                  placeholder="write a Price"
                  className="form-control"
                  // onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              Discription
              <div className="mb-3">
                <textarea
                  value={Discription}
                  placeholder="Discription"
                  className="form-control"
                  onChange={(e) => setDiscription(e.target.value)}
                />
              </div>
              {/* <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div> */}
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
