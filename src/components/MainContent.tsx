import React from 'react';
import ServiceCard from './ServiceCard';
import AnnouncementSection from './AnnouncementSection';
import CalendarSection from './CalendarSection';

const MainContent = () => {
  const services = [
    {
      title: 'Sinlui Learning Center',
      description: 'Akses e-book, materi, dan tugas',
      link: 'https://stlouislc.net/',
      iconUrl: '', // Add your icon URL here
    },
    {
      title: 'SiLuisa',
      description: 'Cek biodata, nilai, peminjaman ruang...',
      link: 'https://luisa.id/Login',
      iconUrl: '', // Add your icon URL here
    },
    {
      title: 'Office 365',
      description: 'Akses layanan Office 365',
      link: 'https://accounts.google.com/o/saml2/initsso?idpid=C01jrcord&spid=936554538791',
      iconUrl: '', // Add your icon URL here
    },
    {
      title: 'e-Presensi',
      description: 'Kehadiran di kelas',
      link: 'absensi.stlouislc.net',
      iconUrl: '', // Add your icon URL here
    },
    {
      title: 'Sinlui Computer Based Test (SCBT)',
      description: 'Akses ke soal penilaian',
      link: 'sebs://smakstlouis1sby.sch.id/seb/config/PAS-Local.seb',
      iconUrl: '', // Add your icon URL here
    },
    {
      title: 'Atur 2FA akun anda!',
      description: 'Cek keamanan akun anda',
      link: 'https://myaccount.google.com/u/1/signinoptions/twosv',
      iconUrl: '', // Add your icon URL here
    },
    {
      title: 'Canva Education',
      description: 'Akses ke akun canva',
      link: 'https://www.canva.com/login/sso/BAFM3FvydS8',
      iconUrl: '', // Add your icon URL here
    },
  ];

  return (
    <main className="flex-1 p-6 space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <div className="icon-placeholder">📱</div>
          Applications and Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnnouncementSection className="lg:col-span-2" />
        <CalendarSection />
      </div>
    </main>
  );
};

export default MainContent;