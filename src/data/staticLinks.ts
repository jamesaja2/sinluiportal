import { LinkCategories } from '../types/links';
import slc from '../assets/slc.png';
import luisa from '../assets/luisa.png';
import office365 from '../assets/office365.png';
import presensi from '../assets/presensi.png';
import scbt from '../assets/scbt.png';
import twofa from '../assets/2fa.png';
import canva from '../assets/canva.png';
import email from '../assets/email.png';
import websklh from '../assets/logo.png'

// Public links (not logged in)
const publicLinks: LinkCategories = [
  {
    id: 1,
    name: "Applications and Services",
    lexorank: "a",
    links: [
      
      {
        title: 'Sinlui Learning Center',
        description: 'Portal pembelajaran digital',
        url: 'https://stlouislc.net/my/',
        iconUrl: slc,
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
        title: 'Situs Resmi SMAK St. Louis 1 Surabaya',
        description: 'Akses ke situs resmi',
        url: 'https://smakstlouis1sby.sch.id/',
        iconUrl: websklh,
      },

    ]
  }
];

// Student links (@s.smakstlouis1sby.sch.id)
const studentLinks: LinkCategories = [
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
        title: 'Luisa',
        description: 'Cek biodata dan nilai',
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
        title: 'Email Siswa',
        description: 'Akses email @s.smakstlouis1sby.sch.id',
        url: 'https://accounts.google.com/AccountChooser?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&flowName=GlifWebSignIn&flowEntry=AccountChooser&ec=asw-gmail-globalnav-signin',
        iconUrl: email,
      },
      {
        title: 'Atur 2FA akun anda!',
        description: 'Cek keamanan akun anda',
        url: 'https://myaccount.google.com/signinoptions/twosv',
        iconUrl: twofa,
      },
      {
        title: 'Situs Resmi SMAK St. Louis 1 Surabaya',
        description: 'Akses ke situs resmi',
        url: 'https://smakstlouis1sby.sch.id/',
        iconUrl: websklh,
      },
      {
        title: 'Canva Education',
        description: 'Akses layanan Canva Edu',
        url: 'https://www.canva.com/login/sso/BAFM3FvydS8',
        iconUrl: canva,
      },
    ]
  }
];

// Staff links (@smakstlouis1sby.sch.id)
const staffLinks: LinkCategories = [
  {
    id: 1,
    name: "Applications and Services",
    lexorank: "a",
    links: [
      {
        title: 'Sinlui Learning Center',
        description: 'Manajemen materi dan tugas',
        url: 'https://stlouislc.net/my/',
        iconUrl: slc,
      },
      {
        title: 'siLuisa',
        description: 'Input nilai dan manajemen kelas',
        url: 'https://si.luisa.id/login',
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
        title: 'SCBT Manager',
        description: 'Manajemen soal dan ujian',
        url: 'https://scbt.stlouislc.net/manager/',
        iconUrl: scbt,
      },
      {
        title: 'Email Staff',
        description: 'Akses email @smakstlouis1sby.sch.id',
        url: 'https://accounts.google.com/AccountChooser?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&flowName=GlifWebSignIn&flowEntry=AccountChooser&ec=asw-gmail-globalnav-signin',
        iconUrl: email,
      },
      {
        title: 'Canva Education',
        description: 'Akses ke akun canva',
        url: 'https://www.canva.com/login/sso/BAFM3FvydS8',
        iconUrl: canva,
      },
      {
        title: 'Atur 2FA akun anda!',
        description: 'Cek keamanan akun anda',
        url: 'https://myaccount.google.com/signinoptions/twosv',
        iconUrl: twofa,
      }
    ]
  }
];

export const getStaticLinks = (email?: string | null): LinkCategories => {
  if (!email) return publicLinks;
  if (email.endsWith('@s.smakstlouis1sby.sch.id')) return studentLinks;
  if (email.endsWith('@smakstlouis1sby.sch.id')) return staffLinks;
  return publicLinks;
};