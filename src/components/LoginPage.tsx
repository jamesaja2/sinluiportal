import React, { useEffect } from 'react';
import { useAuth } from '../contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import SinluiLogo from '../assets/sinlui-logo.svg';

const LoginPage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <div className="bg-[#2a2a2a] p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex flex-col items-center space-y-6">
          <img src={SinluiLogo} alt="Sinlui Portal" className="h-16 mb-4" />
          <h1 className="text-2xl font-semibold text-white">Welcome to Sinlui Portal</h1>
          <button
            onClick={() => login()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;