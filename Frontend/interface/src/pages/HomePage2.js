import React from 'react';
import Layout1 from './../components/Layout/Layout1';
import { useAuth } from '../context/auth';

const HomePage2 = () => {
  const [auth,setAuth] = useAuth()

return (
      <Layout1 title={'Home - Ceylon Green'}>
        <h1>Home Page After Login display this home page</h1>
        <pre>{JSON.stringify(auth,null,4)}</pre>
      
  
    </Layout1>
  );
};

export default HomePage2;