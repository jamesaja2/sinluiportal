import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  iconUrl: string;
  link: string;
}

const ServiceCard = ({ title, description, iconUrl, link }: ServiceCardProps) => {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer" 
      className="app-card h-24 w-full block"
    >
      <img src={iconUrl} alt={title} className="w-8 h-8 shrink-0" />
      <div className="min-w-0">
        <h3 className="font-medium truncate">{title}</h3>
        <p className="text-sm text-gray-400 truncate">{description}</p>
      </div>
    </a>
  );
};

export default ServiceCard;
