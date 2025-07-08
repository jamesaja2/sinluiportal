import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  iconUrl: string;
  url: string;
}

const ServiceCard = ({ title, description, iconUrl, url }: ServiceCardProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      onClick={handleClick}
      onContextMenu={(e) => e.preventDefault()}
      className="app-card"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      }}
    >
      <img src={iconUrl} alt={title} className="w-8 h-8 shrink-0" />
      <div className="min-w-0">
        <h3 className="font-medium truncate">{title}</h3>
        <p className="text-sm text-gray-400 truncate">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;