import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Don't show header/footer on login/signup pages (optional)
  const hideNavPages = ['/login', '/signup'];
  const shouldHideNav = hideNavPages.includes(location.pathname);
  
  return (
    <>
      {!shouldHideNav && <Header />}
      <main>{children}</main>
      {!shouldHideNav && <Footer />}
    </>
  );
};

export default Layout;