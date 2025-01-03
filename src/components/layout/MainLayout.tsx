import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import footerLogo from '../../assets/sinlui-logo.svg';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {children}
      <Footer logoUrl={footerLogo} />
    </div>
  );
};

export default MainLayout;