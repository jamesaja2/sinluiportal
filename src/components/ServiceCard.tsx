import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  iconUrl: string;
  url: string; // Changed from 'link' to 'url' to match the data structure
}

const ServiceCard = ({ title, description, iconUrl, url }: ServiceCardProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <a 
      href={url}
      onClick={handleClick}
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