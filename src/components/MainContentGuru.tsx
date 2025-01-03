import React from 'react';
import ServiceCard from './ServiceCard';
import AnnouncementSection from './AnnouncementSection';
import CalendarSection from './CalendarSection';
import { useAuth } from '../contexts/AuthContext';
import apps from '../assets/apps.png';
import slc from '../assets/slc.png';
import luisa from '../assets/luisa.png';
import office365 from '../assets/office365.png';
import presensi from '../assets/presensi.png';
import scbt from '../assets/scbt.png';
import twofa from '../assets/2fa.png';
import canva from '../assets/canva.png';
import email from '../assets/email.png';

  const services = [
    {
      title: 'Sinlui Learning Center',
      description: 'Manajemen materi dan tugas',
      link: 'https://stlouislc.net/my/',
      iconUrl: slc,
    },
    {
      title: 'SiLuisa',
      description: 'Input nilai dan manajemen kelas',
      link: 'https://si.luisa.id/login',
      iconUrl: luisa,
    },
    {
      title: 'Office 365',
      description: 'Akses layanan Office 365',
      link: 'https://accounts.google.com/o/saml2/initsso?idpid=C01jrcord&spid=936554538791',
      iconUrl: office365,
    },
    {
      title: 'e-Presensi',
      description: 'Kehadiran di sekolah',
      link: 'https://absensi.stlouislc.net/',
      iconUrl: presensi,
    },
    {
      title: 'Manager SCBT',
      description: 'Akses ke SCBT Manager anda',
      link: 'https://scbt.stlouislc.net/manager/',
      iconUrl: scbt,
    },
    {
      title: 'Atur 2FA akun anda!',
      description: 'Cek keamanan akun anda',
      link: 'https://myaccount.google.com/signinoptions/twosv',
      iconUrl: twofa,
    },
    {
      title: 'Canva Education',
      description: 'Akses ke akun canva',
      link: 'https://www.canva.com/login/sso/BAFM3FvydS8',
      iconUrl: canva,
    },
    {
        title: 'Email',
        description: 'Akses ke email anda',
        link: 'https://mail.google.com/mail/signinoptions/',
        iconUrl: email,
      },
  ];

  const MainContentGuru = () => {
    const { user } = useAuth();
  
    return (
      <MainLayout>
        <main className="flex-1 p-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Selamat Datang, {user?.name}</h1>
          <ServicesList services={services} />
          
          {features.showAnnouncements && features.showCalendar && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <AnnouncementSection className="lg:col-span-2" />
              <CalendarSection />
            </div>
          )}
        </main>
      </MainLayout>
    );
  };
  
  export default MainContentGuru;