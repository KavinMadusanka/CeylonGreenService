import React from 'react'
import Layout2 from '../components/Layout/Layout2';
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import {}  from '../components/KAddcard.css'

const KAddaddress = () => {
  return (
    <Layout2 title={'Add Adreess - Ceylon Green'}>
      
      <div className='grid-container'>
      <form>
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
            <br/>
            <div className="item3">
                <table id="table">
                  <tbody>
                  <tr><td className='texting'>Contact Name :</td>
                  <td className='texting'>Contact Number :</td></tr>
                      <tr></tr>
                    <tr><td><input type="text" /></td>
                      <td><input type="text" /></td></tr>
                      <tr><br/></tr>
                </tbody></table>
            </div>
            <div id="item4">
                <table id="table">
                  <tbody>
                  <tr><td className='texting'>Address :</td></tr>
                      <tr></tr>
                    <tr><td><input type="text" /></td></tr>
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
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td></tr>
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

export default KAddaddress;
