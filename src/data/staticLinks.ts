import { LinkCategories } from '../types/links';
import slc from '../assets/slc.png';
import luisa from '../assets/luisa.png';
import office365 from '../assets/office365.png';
import presensi from '../assets/presensi.png';
import scbt from '../assets/scbt.png';
import twofa from '../assets/2fa.png';
import canva from '../assets/canva.png';

export const staticLinks: LinkCategories = [
  {
    id: 1,
    name: "Applications and Services",
    lexorank: "a",
    links: [
      {
        title: 'Sinlui Learning Center',
        description: 'Akses e-book, materi, dan tugas',
        url: 'https://stlouislc.net/my/',
        iconUrl: slc,
      },
      {
        title: 'SiLuisa',
        description: 'Cek biodata, nilai, peminjaman ruang...',
        url: 'https://www.luisa.id/login/google/redirect/',
        iconUrl: luisa,
      },
      {
        title: 'Office 365',
        description: 'Akses layanan Office 365',
        url: 'https://accounts.google.com/o/saml2/initsso?idpid=C01jrcord&spid=936554538791',
        iconUrl: office365,
      },
      {
        title: 'e-Presensi',
        description: 'Kehadiran di kelas',
        url: 'https://absensi.stlouislc.net/',
        iconUrl: presensi,
      },
      {
        title: 'Sinlui Computer Based Test (SCBT)',
        description: 'Akses ke soal penilaian',
        url: 'sebs://smakstlouis1sby.sch.id/seb/config/PAS-Local.seb',
        iconUrl: scbt,
      },
      {
        title: 'Atur 2FA akun anda!',
        description: 'Cek keamanan akun anda',
        url: 'https://myaccount.google.com/signinoptions/twosv',
        iconUrl: twofa,
      },
      {
        title: 'Canva Education',
        description: 'Akses ke akun canva',
        url: 'https://www.canva.com/login/sso/BAFM3FvydS8',
        iconUrl: canva,
      },
    ]
  }
];