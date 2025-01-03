import React from 'react';
import ServiceCard from '../ServiceCard';
import apps from '../../assets/apps.png';

interface Service {
  title: string;
  description: string;
  link: string;
  iconUrl: string;
}

interface ServicesListProps {
  services: Service[];
}

const ServicesList = ({ services }: ServicesListProps) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <img src={apps} alt="" className="w-6 h-6" />
        Applications and Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesList;