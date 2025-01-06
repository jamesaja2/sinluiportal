import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  return (
    <GoogleOAuthProvider clientId="496229497503-e3jpd34e2p7lde03jl20tehsiu0aeosj.apps.googleusercontent.com">
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <MainContent />
            <Footer
                logoUrl="https://smakstlouis1sby.sch.id/storage/2020/03/buat-web-1.png"
                logoWidth="48px"
                logoHeight="48px"
            />
          </div>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;