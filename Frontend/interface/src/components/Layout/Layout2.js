import React from 'react'
import Footer from './Footer';
import Header2 from './Header2';


const Layout2 = ({children}) => {
  return (
    <div>
        <Header2/>
        <main style= {{minHeight:"74vh"}}>
          {children}
        </main>
        <Footer/>
    </div>
  )
}

export default Layout2;