import React from 'react'
import Layout2 from '../components/Layout/Layout2';
import { FaCreditCard } from "react-icons/fa6";
import { IoShieldCheckmark } from "react-icons/io5";
import {}  from '../components/KAddcard.css'

const KAddcard = () => {
  return (
    <Layout2>
      <div className='grid-container'>
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
                      <td className='texting'>card Holder's Name :</td></tr>
                      <tr></tr>
                    <tr><td><input type="text" /></td>
                      <td><input type="text" /></td></tr>
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
                      <td><input type="text" /></td>
                      /
                      <td><input type="text" /></td>
                      <td><input type="text" /></td></tr>
                      <tr><br/></tr>
                </tbody></table>
            </div>
            <div className='item9'>
              <button className='btnsub'>Save car Details</button>
            </div>

        </div>
      </div>
    </Layout2>
  )
}

export default KAddcard;
