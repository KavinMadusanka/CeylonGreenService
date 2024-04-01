import React from 'react'
import Layout2 from '../components/Layout/Layout2';
import { FaCreditCard } from "react-icons/fa6";
import { IoShieldCheckmark } from "react-icons/io5";

const KAddcard = () => {
  return (
    <Layout2>
        <div className='KAboarder'>
            <h1 className='text-center'>Provide further information</h1>
            <div className='KApayment'><IoShieldCheckmark/> Your payment information is safe with us</div>
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
            <div>     
            </div>
        </div>
    </Layout2>
  )
}

export default KAddcard;