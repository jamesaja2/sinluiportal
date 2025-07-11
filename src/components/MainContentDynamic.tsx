import React from 'react';
import ServiceCard from './ServiceCard';
import { useAuth } from '../contexts/useAuth';
import apps from '../assets/apps.png';
import slc from '../assets/slc.png';
import luisa from '../assets/luisa.png';
import office365 from '../assets/office365.png';
import presensi from '../assets/presensi.png';
import scbt from '../assets/scbt.png';
import twofa from '../assets/2fa.png';
import canva from '../assets/canva.png';
import email from '../assets/email.png';

const MainContentDynamic = () => {
  const { user } = useAuth();

  const fallbackServices = [
    {
      title: 'Sinlui Learning Center',
      description: 'Manajemen materi dan tugas',
      link: 'https://stlouislc.net/local/sso/index.php'
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

  return (
    <main className="flex-1 p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Selamat Datang, {user?.name}</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <img src={apps} alt="" className="w-6 h-6" />
          Applications and Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fallbackServices.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>

    </main>
  );
};

export default MainContentDynamic;