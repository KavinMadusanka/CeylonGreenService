import React from 'react'
import Header1 from './Header1';
import Footer from './Footer';

const Layout1 = ({children}) => {
  return (
    <div>
        <Header1/>
        <main style= {{minHeight:"73.5vh"}}>
          {children}
        </main>
        <Footer/>
    </div>
  )
}

export default Layout1;