import React, {useState} from 'react';
import Layout2 from '../components/Layout/Layout2';
import { FaCreditCard } from "react-icons/fa6";
import { IoShieldCheckmark } from "react-icons/io5";
import {} from '../components/KAddcard.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const KAddcard = () => {
  const [cardNumber,setNumber] = useState("");
  const [name,setName] = useState("");
  const [cvv,setCvv] = useState("");
  const [month,setMonth] = useState("");
  const [year,setYear] = useState("");
  const navigate = useNavigate()

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/KAddcard',
        {name,cardNumber,cvv,month,year}
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
  
  return (
    <Layout2 title={'Add Card - Ceylon Green'}>
      
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
            <br/>
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
    </Layout2>
  )
}

export default KAddcard;
