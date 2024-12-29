import React from 'react';
import ServiceCard from './ServiceCard';
import AnnouncementSection from './AnnouncementSection';
import CalendarSection from './CalendarSection';
import { useAuth } from '../contexts/AuthContext';
import { features } from '../config/features';
import apps from '../assets/apps.png';
import slc from '../assets/slc.png';
import luisa from '../assets/luisa.png';
import office365 from '../assets/office365.png';
import presensi from '../assets/presensi.png';
import scbt from '../assets/scbt.png';
import twofa from '../assets/2fa.png';
import canva from '../assets/canva.png';

const teacherServices = [
  {
    title: 'Sinlui Learning Center',
    description: 'Upload materi dan tugas',
    link: '#',
    iconUrl: slc,
  },
  {
    title: 'SiLuisa',
    description: 'Input nilai, presensi, dan jadwal',
    link: '#',
    iconUrl: luisa,
  },
  // ... other teacher-specific services
];

const studentServices = [
  {
    title: 'Sinlui Learning Center',
    description: 'Akses e-book, materi, dan tugas',
    link: '#',
    iconUrl: slc,
  },
  {
    title: 'SiLuisa',
    description: 'Cek biodata, nilai, peminjaman ruang...',
    link: '#',
    iconUrl: luisa,
  },
  // ... other student-specific services
];

const commonServices = [
  {
    title: 'Office 365',
    description: 'Akses layanan Office 365',
    link: '#',
    iconUrl: office365,
  },
  {
    title: 'Atur 2FA akun anda!',
    description: 'Cek keamanan akun anda',
    link: '#',
    iconUrl: twofa,
  },
  {
    title: 'Canva Education',
    description: 'Akses ke akun canva',
    link: '#',
    iconUrl: canva,
  },
];

const MainContent = () => {
  const { user } = useAuth();

  if (!user) return null;

  const services = [
    ...(user.role === 'teacher' ? teacherServices : studentServices),
    ...commonServices,
  ];

  return (
    <main className="flex-1 p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">
          Hello, {user.name}
        </h1>
        <p className="text-gray-400">
          {user.role === 'teacher' ? 'Teacher Portal' : 'Student Portal'}
        </p>
      </div>

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

      {(features.showAnnouncements || features.showCalendar) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {features.showAnnouncements && (
            <AnnouncementSection className="lg:col-span-2" />
          )}
          {features.showCalendar && (
            <CalendarSection />
          )}
        </div>
      )}
    </main>
  );
};

export default MainContent;