import React from 'react'
// import Layout1 from '../components/Layout/Layout1';
import {} from '../components/KApaymentOption.css';

export const KApaymentOptions = ({subtotal}) => {
  return (
    <>
        <p style={{textAlign:'center'}}>Choose payment type</p>
        <ul className='ulc'>
            <li>
                <div>
                    <a href={`/KApaymentForm?subtotal=${subtotal}`} >
                    <button className='btnb'>Bank Transfer</button>
                    </a>
                </div>
            </li>
            <li>
                <div>
                    <a href={`/KAcardpayment?subtotal=${subtotal}`} >
                        <button className='btnb'>Card Payment</button>
                    </a>
                </div>
            </li>
            <li>
                <div>
                    <a href="/KApaymentForm" >
                        <button className='btnb'>PayHere</button>
                    </a>
                </div>
            </li>
            <li>
                <div>
                    <a href="/KApaymentForm" >
                        <button className='btnb'>Paypal</button>
                    </a>
                </div>
            </li>
        </ul>
    </>
  )
}
