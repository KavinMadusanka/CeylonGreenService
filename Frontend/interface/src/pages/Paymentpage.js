import React from 'react'
import Layout2 from './../components/Layout/Layout2';
import { useAuth } from '../context/auth';

const Paymentpage = () => {
  const [auth,setAuth] = useAuth()
  return (
    <Layout2 title={'Home - Ceylon Green'}>
        <h1>Payment page</h1>
        {/* <pre>{JSON.stringify(auth,null,4)}</pre> */}
        
    </Layout2>
  )
}

export default Paymentpage