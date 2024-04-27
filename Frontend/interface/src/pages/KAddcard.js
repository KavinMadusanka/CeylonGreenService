import React, {useEffect, useState} from 'react';
// import Layout2 from '../components/Layout/Layout2';
import { FaCreditCard } from "react-icons/fa6";
import { IoShieldCheckmark } from "react-icons/io5";
import {} from '../components/KAddcard.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from '../context/auth';

const KAddcard = () => {
  const [cardNumber,setNumber] = useState("");
  const [name,setName] = useState("");
  const [cvv,setCvv] = useState("");
  const [month,setMonth] = useState("");
  const [year,setYear] = useState("");
  const [email, setEmail] = useState("");
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate()

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (cardNumber.length !== 16) {
        toast.error("Card number must be 16 characters long");
        return;
      }
      if (cvv.length !== 3) {
        toast.error("CVV number is 3 digit number");
        return;
      }
      // Validate month
      // const currentMonth = new Date().getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
      const currentYear = new Date().getFullYear();
      // const enteredMonth = parseInt(month, 10);
      let enteredYearFull = parseInt(year, 10);
      if (year.length === 2) {
        enteredYearFull += currentYear - (currentYear % 100);
      }

      if (
        enteredYearFull < currentYear ||
        (enteredYearFull === currentYear && parseInt(month, 10) < new Date().getMonth() + 1) || (parseInt(month, 10) > 12)
      ) {
        toast.error("Please enter a valid expiration date");
        return;
      }
      
      const res = await axios.post('/api/v1/auth/KAddcard',
        {name,cardNumber,cvv,month,year,email}
      );
      if(res && res.data.success){
        toast.success(res.data.message);
        navigate('/payment');
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Somthing went wrong!');
    }
  };

  useEffect(() => {
    if (auth && auth.user) {
      setEmail(auth.user.email);
     
    }
  }, [auth]);
  
  return (
    // <Layout2 title={'Add Card - Ceylon Green'}>
      
      <div className='grid-container'>
      <form onSubmit={handleSubmit}>
        <div className='KAboarder'>
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
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder='Card Number'
                      required
                      />
                      </td>
                      <td>
                      <input 
                      type="text"
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
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
                        onChange={(e) => setMonth(e.target.value)}
                        required
                        />
                        </td>
                      /
                      <td>
                        <input 
                        type="text" 
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                        />
                        </td>
                      <td>
                      <input 
                      type="text" 
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
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
    // </Layout2>
  )
}

export default KAddcard;
