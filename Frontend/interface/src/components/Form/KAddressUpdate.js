import React, {useEffect, useState} from 'react';
import Layout2 from '../Layout/Layout2';
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import {} from '../KAddcard.css';
import axios from "axios";
import {useNavigate,useParams} from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from '../../context/auth';

const KAddressUpdate = () => {
    const { id } = useParams();
    const [addressDetails, setAddressDetails] = useState(null);
    const [cNumber,setNumber] = useState("");
    const [name,setName] = useState("");
    const [address,setAddress] = useState("");
    const [province,setProvince] = useState("");
    const [district,setDistrict] = useState("");
    const [postalcode,setPostalcode] = useState("");
    const [clientToken, setClientToken] = useState("");
    const [email, setEmail] = useState("");
    const [auth,setAuth] = useAuth()
    const navigate = useNavigate();
    // console.log(id)

    //get single address
    const getSingleAddress = async ()=>{
      try {
        const { data }  = await axios.get(`/api/v1/auth/get-single-Address/${id}`);
        if(data && data.address){
        setName(data.address.name);
        setAddress(data.address.address);
        setNumber(data.address.cNumber);
        setProvince(data.address.province);
        setDistrict(data.address.district);
        setPostalcode(data.address.postalcode);
        setEmail(data.address.email);
        }else {
          console.error('Address data not found:', data);
        }
      } catch (error) {
        console.error('Error fetching address details:', error);
      }
    };
    useEffect(() => {
      getSingleAddress();
    }, []);

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

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (cNumber.length !== 10) {
        toast.error("Contact number must be 10 characters long");
        return;
      }
      const res = await axios.put(`/api/v1/auth/update-Address/${id}`,
        {name,address,cNumber,province,district,postalcode,email}
      );
      if(res && res.data.success){
        toast.success(res.data.message);
        navigate('/payment');
      }else{
        toast.error(res.data.message );
      }
    } catch (error) {
      console.log(error);
      toast.error('Somthing went wrong!');
    }
  };

  return (
    <Layout2 title={'Add Adreess - Ceylon Green'}>
      <div className='grid-container'>
      <form onSubmit={handleSubmit}>
        <div className='KAboarder'>
            <div className='item1'>
              <h1 className='text-center'>Provide further information</h1>
              <div className='KApayment'><IoShieldCheckmark/> Your personal information is safe with us</div>
            </div>
            <div className='item2'>
              <div className='KAbar'>
                    <ul className="KAbarInn">
                      <li className="KAbarIn">
                        <FaMapMarkerAlt/>
                      </li>
                      <li className="KAbarIn">
                        Add a New Delivery Address
                      </li>
                    </ul>
              </div>
            </div>
            <div className="item3">
                <table id="table">
                  <tbody>
                  <tr><td className='texting'>Contact Name :</td>
                  <td className='texting'>Contact Number :</td></tr>
                      <tr></tr>
                    <tr><td>
                      <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='perera p.l.'
                      onKeyPress={handleKeyPress}
                      required 
                      /></td>
                      <td>
                        <input 
                        type="text" 
                        value={cNumber}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder='07x xxxxxxx'
                        onKeyPress={handleKeyNumber}
                        required 
                        /></td></tr>
                      <tr></tr>
                </tbody></table>
            </div>
            <div id="item4">
                <table id="table">
                  <tbody>
                  <tr><td className='texting'>Address :</td></tr>
                      <tr></tr>
                    <tr><td>
                      <input 
                      type="text"
                      value={address}
                      required  
                      /></td></tr>
                      <tr><br/></tr>
                </tbody></table>
            </div>
            <div className="item5">
                <table id="table">
                  <tbody>
                  <tr>
                      <td className='texting'>Province</td>
                      <td className='texting'>District</td>
                      <td className='texting'>Postal Code</td></tr>
                    <tr>
                      <td>
                        <input 
                        type="text" 
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        onKeyPress={handleKeyPress}
                        required 
                        /></td>
                      <td>
                        <input 
                        type="text" 
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        onKeyPress={handleKeyPress}
                        required 
                        /></td>
                      <td>
                        <input 
                        type="text" 
                        value={postalcode}
                        onChange={(e) => setPostalcode(e.target.value)}
                        onKeyPress={handleKeyNumber}
                        required 
                        /></td></tr>
                      <tr><br/></tr>
                </tbody></table>
            </div>
            <div className='item9'>
              <button className='btnsub'>Save personal Details</button>
            </div>
        </div>
        </form>
      </div>
    </Layout2>
  )
}

export default KAddressUpdate;
