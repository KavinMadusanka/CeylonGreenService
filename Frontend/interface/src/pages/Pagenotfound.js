import React from 'react';
import { Link } from 'react-router-dom';
import Layout1 from './../components/Layout/Layout1';

const Pagenotfound = () => {
  return (
    <Layout1 title={'go back - page not found'}>
        <div className='pnf'>
            <h1 className='pnf-title'>404</h1>
            <h2 className='pnf-heading'>Oops ! Page Not Found</h2>
            <Link to="/" className="pnf-btn">
                Go Back
            </Link>
            <br/>

        </div>
    </Layout1>
  )
}

export default Pagenotfound;