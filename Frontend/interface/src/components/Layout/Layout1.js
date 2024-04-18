import React from 'react'
import Header1 from './Header1';
import Footer from './Footer';
import {Helmet} from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout1 = ({children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <title>{title}</title>
        </Helmet>
        <Header1/>
        <main style= {{minHeight:"65vh"}}>
          <Toaster />
          {children}
        </main>
        <Footer/>
    </div>
  );
};

Layout1.defaultProps = {
  title: "Ceylon Green",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Ceylonegreen",
};

export default Layout1;