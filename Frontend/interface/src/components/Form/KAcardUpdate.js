import React, {useEffect, useState} from 'react';
import Layout2 from '../Layout/Layout2';
import { FaCreditCard } from "react-icons/fa6";
import { IoShieldCheckmark } from "react-icons/io5";
import {}  from '../KAddcard.css';
import axios from "axios";
import {useNavigate,useParams} from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from '../../context/auth';

const KAcardUpdate = () => {
    const { id } = useParams();
    const [addressDetails, setAddressDetails] = useState(null);
    const [cardDetails, setCardDetails] = useState(null);
    const [cNumber,setNumber] = useState("");
    const [name,setName] = useState("");
    const [cardNumber,setCardNumber] = useState("");
    const [month,setMonth] = useState("");
    const [year,setYear] = useState("");
    const [cvv,setCvv] = useState("");
    const [email, setEmail] = useState("");
    const [auth,setAuth] = useAuth()
    const navigate = useNavigate();
    // console.log(id)

    //get single address
    const getSingleCard = async ()=>{
      try {
        const { data }  = await axios.get(`/api/v1/auth/get-single-card/${id}`);
        if(data && data.cards){
        setName(data.cards.name);
        setCardNumber(data.cards.cardNumber);
        setMonth(data.cards.month);
        setYear(data.cards.year);
        setCvv(data.cards.cvv);
        setEmail(data.cards.email);
        }else {
          console.error('Address data not found:', data);
        }
      } catch (error) {
        console.error('Error fetching address details:', error);
      }
    };
    useEffect(() => {
        getSingleCard();
    }, []);

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/v1/auth/update-card/${id}`,
        {name,cardNumber,month,year,cvv,email}
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

    //only gets alpherbatds
    const handleKeyPress = (event) => {
      const regex = /^[a-zA-Z\s]*$/;
      if(!regex.test(event.key)){
        event.preventDefault();
      }
    };

  return (
    <Layout2 title={'Add Adreess - Ceylon Green'}>
      <div className='grid-container'>
      <form onSubmit={handleSubmit}>
        <div className='KAboarder' style={{marginLeft:'10%',marginRight:'10%', marginBottom:'2%'}}>
            <div className='item1'>
              <h1 className='text-center'>Provide further information</h1>
              <div className='KApayment'><IoShieldCheckmark/> Your payment information is safe with us</div>
            </div>
            <div className='item2'>
              <div className='KAbar'>
                    <ul className="KAbarInn">
                      <li className="KAbarIn">
                        <FaCreditCard/>
                      </li>
                      <li className="KAbarIn">
                        Add a New Card
                      </li>
                    </ul>
              </div>
            </div>
            <div className="item3">
                <table id="table">
                  <tbody>
                  <tr><td className='texting'>Card Number :</td>
                      <td className='texting'>Card Holder's Name :</td></tr>
                      <tr></tr>
                    <tr><td>
                      <input 
                      type="text" 
                      value={cardNumber}
                      placeholder='Card Number'
                      required
                      />
                      </td>
                      <td>
                      <input 
                      type="text"
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Card Holder's Name"
                      required
                      />
                      </td></tr>
                      <tr><br/></tr>
                </tbody></table>
            </div>
            <div className="item5">
                <table id="table">
                  <tbody>
                  <tr>
                      <td className='texting'>Month</td>
                      <td></td>
                      <td className='texting'>Year</td>
                      <td className='texting'>CVV Number</td></tr>
                    <tr>
                      <td>
                        <input 
                        type="text" 
                        value={month}
                        required
                        />
                        </td>
                      /
                      <td>
                        <input 
                        type="text" 
                        value={year}
                        required
                        />
                        </td>
                      <td>
                      <input 
                      type="text" 
                      value={cvv}
                      placeholder='CVV'
                      required
                      />
                      </td></tr>
                      <tr><br/></tr>
                </tbody></table>
            </div>
            <div className='item9'>
              <button className='btnsub'>Save card Details</button>
            </div>
        </div>
        </form>
      </div>
    </Layout2>
  )
}

export default KAcardUpdate;