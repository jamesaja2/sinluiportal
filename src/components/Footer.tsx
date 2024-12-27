import React from 'react';

interface FooterProps {
  logoUrl?: string;
}

const Footer = ({ logoUrl }: FooterProps) => {
  return (
    <footer className="bg-[#2a2a2a] p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-sm text-gray-400">
          © SINLUI IT DEPARTMENT 2025 | All Rights Reserved
        </div>
        {logoUrl && (
          <div className="w-24 h-24">
            <img src={logoUrl} alt="Footer Logo" className="w-full h-full object-contain" />
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;