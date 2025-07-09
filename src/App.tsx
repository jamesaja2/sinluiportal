import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import MainContent from './components/MainContent';
import AdminPanel from './components/admin/AdminPanel';
import AdminRoute from './components/admin/AdminRoute';
import CreditsPage from './components/CreditsPage';
import StatusPage from './components/StatusPage';
import Footer from './components/Footer';
import OAuthRedirectHandler from './components/OAuthRedirectHandler';

function App() {
  return (
    <GoogleOAuthProvider clientId="955771670888-44ojt33njuvk3bqev0md2ja626n7nq7v.apps.googleusercontent.com">
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route 
                path="/admin" 
                element={
                  <AdminRoute>
                    <AdminPanel />
                  </AdminRoute>
                } 
              />
              <Route path="/credits" element={<CreditsPage />} />
              <Route path="/status" element={<StatusPage />} />
              <Route path="/auth/authorize-redirect" element={<OAuthRedirectHandler />} />
            </Routes>
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