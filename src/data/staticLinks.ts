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
    tags: [{ name: "public" }],
    links: [
      
      {
        id: 1,
        title: 'Sinlui Learning Center',
        description: 'Portal pembelajaran digital',
        url: 'https://stlouislc.net/my/',
        iconUrl: slc,
        lexorank: 'a',
      },
      {
        id: 2,
        title: 'Office 365',
        description: 'Akses layanan Office 365',
        url: 'https://accounts.google.com/o/saml2/initsso?idpid=C01jrcord&spid=936554538791',
        iconUrl: office365,
        lexorank: 'b',
      },
      {
        id: 3,
        title: 'e-Presensi',
        description: 'Kehadiran di kelas',
        url: 'https://absensi.stlouislc.net/',
        iconUrl: presensi,
        lexorank: 'c',
      },
      {
        id: 4,
        title: 'Sinlui Computer Based Test (SCBT)',
        description: 'Akses ke soal penilaian',
        url: 'sebs://smakstlouis1sby.sch.id/seb/config/PAS-Local.seb',
        iconUrl: scbt,
        lexorank: 'd',
      },
      {
        id: 5,
        title: 'Situs Resmi SMAK St. Louis 1 Surabaya',
        description: 'Akses ke situs resmi',
        url: 'https://smakstlouis1sby.sch.id/',
        iconUrl: websklh,
        lexorank: 'e',
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
    tags: [{ name: "student" }],
    links: [
      {
        id: 1,
        title: 'Sinlui Learning Center',
        description: 'Akses e-book, materi, dan tugas',
        url: 'https://stlouislc.net/my/',
        iconUrl: slc,
        lexorank: 'a',
      },
      {
        id: 2,
        title: 'Luisa',
        description: 'Cek biodata dan nilai',
        url: 'https://www.luisa.id/login/google/redirect/',
        iconUrl: luisa,
        lexorank: 'b',
      },
      {
        id: 3,
        title: 'Office 365',
        description: 'Akses layanan Office 365',
        url: 'https://accounts.google.com/o/saml2/initsso?idpid=C01jrcord&spid=936554538791',
        iconUrl: office365,
        lexorank: 'c',
      },
      {
        id: 4,
        title: 'e-Presensi',
        description: 'Kehadiran di kelas',
        url: 'https://absensi.stlouislc.net/',
        iconUrl: presensi,
        lexorank: 'd',
      },
      {
        id: 5,
        title: 'Sinlui Computer Based Test (SCBT)',
        description: 'Akses ke soal penilaian',
        url: 'sebs://smakstlouis1sby.sch.id/seb/config/PAS-Local.seb',
        iconUrl: scbt,
        lexorank: 'e',
      },
      {
        id: 6,
        title: 'Email Siswa',
        description: 'Akses email @s.smakstlouis1sby.sch.id',
        url: 'https://accounts.google.com/AccountChooser?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&flowName=GlifWebSignIn&flowEntry=AccountChooser&ec=asw-gmail-globalnav-signin',
        iconUrl: email,
        lexorank: 'f',
      },
      {
        id: 7,
        title: 'Atur 2FA akun anda!',
        description: 'Cek keamanan akun anda',
        url: 'https://myaccount.google.com/signinoptions/twosv',
        iconUrl: twofa,
        lexorank: 'g',
      },
      {
        id: 8,
        title: 'Situs Resmi SMAK St. Louis 1 Surabaya',
        description: 'Akses ke situs resmi',
        url: 'https://smakstlouis1sby.sch.id/',
        iconUrl: websklh,
        lexorank: 'h',
      },
      {
        id: 9,
        title: 'Canva Education',
        description: 'Akses layanan Canva Edu',
        url: 'https://www.canva.com/login/sso/BAFM3FvydS8',
        iconUrl: canva,
        lexorank: 'i',
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
    tags: [{ name: "staff" }],
    links: [
      {
        id: 1,
        title: 'Sinlui Learning Center',
        description: 'Manajemen materi dan tugas',
        url: 'https://stlouislc.net/my/',
        iconUrl: slc,
        lexorank: 'a',
      },
      {
        id: 2,
        title: 'siLuisa',
        description: 'Input nilai dan manajemen kelas',
        url: 'https://si.luisa.id/login',
        iconUrl: luisa,
        lexorank: 'b',
      },
      {
        id: 3,
        title: 'Office 365',
        description: 'Akses layanan Office 365',
        url: 'https://accounts.google.com/o/saml2/initsso?idpid=C01jrcord&spid=936554538791',
        iconUrl: office365,
        lexorank: 'c',
      },
      {
        id: 4,
        title: 'e-Presensi',
        description: 'Kehadiran di kelas',
        url: 'https://absensi.stlouislc.net/',
        iconUrl: presensi,
        lexorank: 'd',
      },
      {
        id: 5,
        title: 'SCBT Manager',
        description: 'Manajemen soal dan ujian',
        url: 'https://scbt.stlouislc.net/manager/',
        iconUrl: scbt,
        lexorank: 'e',
      },
      {
        id: 6,
        title: 'Email Staff',
        description: 'Akses email @smakstlouis1sby.sch.id',
        url: 'https://accounts.google.com/AccountChooser?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&flowName=GlifWebSignIn&flowEntry=AccountChooser&ec=asw-gmail-globalnav-signin',
        iconUrl: email,
        lexorank: 'f',
      },
      {
        id: 7,
        title: 'Canva Education',
        description: 'Akses ke akun canva',
        url: 'https://www.canva.com/login/sso/BAFM3FvydS8',
        iconUrl: canva,
        lexorank: 'g',
      },
      {
        id: 8,
        title: 'Atur 2FA akun anda!',
        description: 'Cek keamanan akun anda',
        url: 'https://myaccount.google.com/signinoptions/twosv',
        iconUrl: twofa,
        lexorank: 'h',
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