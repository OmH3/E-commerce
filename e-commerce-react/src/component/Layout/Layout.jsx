import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Helmet} from 'react-helmet'


function Layout({ children, description, keywords, author, title }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "100vh" }}>
        {children}</main>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title:'E-Commerce App',
  description:"MERN Stack Project",
  keywords:"mongodb express react node",
  author:'Om'
}

export default Layout;
