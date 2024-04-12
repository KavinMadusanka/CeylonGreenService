import React from 'react'
import Footer from './Footer';
import Header2 from './Header2';
import {Helmet} from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout2 = ({children, title, description, keywords, author }) => {
  return (
    <div>
        <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <title>{title}</title>
        </Helmet>
        <Header2/>
        <main style= {{minHeight:"65vh"}}>
          <ToastContainer />
          {children}
        </main>
        <Footer/>
    </div>
  );
};

Layout2.defaultProps = {
  title: "Ceylon Green",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Ceylonegreen",
};

export default Layout2;