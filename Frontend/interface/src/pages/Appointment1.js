import React, { useEffect, useState } from 'react';
import '../components/Appointment.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Select } from "antd";
import { toast } from "react-toastify";
import Layout1 from '../components/Layout/Layout1';
import { useAuth } from '../context/auth';

const { Option } = Select;

// Function to get today's date in the format YYYY-MM-DD
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Appointment1 = () => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [servicePackage, setServicePackage] = useState("homeBasic");
  const [comments, setComments] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [Pname, setPname] = useState("");
  const [Pprice, setPprice] = useState(0);
  const [userId, setUserId] = useState("");
  const [auth,setAuth] = useAuth()
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (phoneNumber.length !== 10) {
        toast.error("Contact number must be 10 characters long");
        return;
      }
      const res = await axios.post("/api/v1/appointment/appointment1", {
        fullName,
        address,
        phoneNumber,
        email,
        servicePackage,
        comments,
        selectedDate,
        selectedTime,
        userId,
        Pprice
      });
      console.log(res.data);  // Log the response
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate('/myappointments');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.response.data);  // Log the error
      toast.error('Something went wrong');
    }
  };



  const handlePkgChange = async (value) => {
    // setAddress(value);
    try {
      const { data } = await axios.get(`/api/v1/appointment/getsingle-sp/${value}`);
      if (data?.success) {
        setServicePackage(data.spackage.Pname);
        setPname(data.spackage.Pname);
        setPprice(parseFloat(data.spackage.price));
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in fetching address details');
    }
  };



  const handleFullNameChange = (e) => {
    const input = e.target.value;
    // Regular expression to allow only letters (both uppercase and lowercase), spaces, and a full stop
    const regex = /^[A-Za-z.\s]*$/;
    if (regex.test(input)) {
        setFullName(input);
    }
};

  //////////////////////////
  useEffect(() => {
    if (auth && auth.user) {
      setUserId(auth.user._id);
     
    }
  }, [auth]);
  ///////////////////////////////


  const getAllPackages = async () => {
    try {
        const { data } = await axios.get('/api/v1/appointment/read-sp');
        setPackages(data.spackages);
        setFilteredPackages(data.spackages);
        getAllPackages();
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    getAllPackages();
}, []);



  return (
    <Layout1 title={'Make Appointment - Ceylon Green'}>


      {/* Kavin - Start */}
      <section className="h-100 gradient-custom">
      <form onSubmit={handleSubmit}>
      <div className="container py-0">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Fill Appointment details</h5>
              </div>
              <div className="card-body">
              <div >
            
            <div>
            <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={handleFullNameChange}
              placeholder="Enter your full name"
              required
            />
          </div>
            </div>


            <div className="item3">
            <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
            type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
            ></input>
          </div>
            </div>


            <div className="item5">
            <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => {
                // Remove non-numeric characters from the input value
                const newValue = e.target.value.replace(/[^\d]/g, '');
                setPhoneNumber(newValue);
            }}
              placeholder="Enter your phone number"
              required
            />
          </div>
            </div>
            
        </div>
               
                
                <div>
                <div>
            <div className="item3">
            <div className="form-group">
            <label htmlFor="email">E-mail Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>
            </div>
            <div className="item5">
            

          <table style={{width:'100%'}}>
            <tr>
              <td style={{paddingRight:'2%'}}>
              <div className="form-group">
            <label htmlFor="selectedDate">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value.split('T')[0])} // Extracting only date part
              min={getTodayDate()}
              required
            />
          </div>
              </td>
              <td>
              <div className="form-group">
            <label htmlFor="selectedTime">Select Time:</label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
            />
          </div>
              </td>
            </tr>
          </table>
            </div>
        </div>
                </div>
              </div>
            </div>
          </div>


   


          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3" >
                <h5 className="mb-0">Select Service Package</h5>
              </div>
              <div className="card-body">
              <div className="form-group">
            <label htmlFor="servicePackage">Service Package:</label>
            <Select
                bordered={false}
                placeholder="Select a Address"
                size="large"
                // showSearch
                className="form-select mb-3"
                // onChange={(value) => {
                //     setAddress(value);
                // }}
                onChange={handlePkgChange}
              >
                {packages?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.Pname}
                  </Option>
                ))}
              </Select>
          </div>


          <div className="form-group">
            <label htmlFor="comments">Additional Comments:</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Enter any additional comments"
            ></textarea>
          </div>

                
            <hr className="my-2" />

            <table style={{width:'100%'}}>
            <tr>
              <td style={{width:'60%'}}>
              Appointment Charge(Rs.) : 
              </td>
              <td>
              <div className="form-group">
            <input
            type="Number"
            value={Pprice}
            readOnly/>
          </div>
              </td>
            </tr>
          </table>


            


            {/* Appointment Charge(Rs.) : <span>{Pprice.toFixed(2)}</span> */}

            
               
          </div>{/* body - end */}
            </div>
            <br></br>
            <div className="form-buttons">
                                <button type="submit">Send Appointment</button>
                            </div>
            
            </div>
          
        </div>
        
      </div>
    </form>
    </section>

      {/* Kavin - end */}


      
    </Layout1>
  );
};

export default Appointment1;
