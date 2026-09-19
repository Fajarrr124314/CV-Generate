import { ResumeData } from '@/types/resume';

export const INITIAL_RESUME_DATA: ResumeData = {
  category: 'ATS',
  templateId: 'ats-classic',
  personal: {
    fullName: 'Arya Satria Pratama',
    jobTitle: 'Senior Full Stack Engineer',
    email: 'arya.satria@example.com',
    phone: '+62 812-3456-7890',
    address: 'Jakarta Selatan, DKI Jakarta, Indonesia',
    website: 'https://aryapratama.dev',
    linkedin: 'linkedin.com/in/aryapratama',
    github: 'github.com/aryapratama',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    summary: 'Senior Software Engineer dengan 6+ tahun pengalaman dalam merancang dan mengembangkan sistem web berskala besar, arsitektur microservices, serta aplikasi cloud-native. Terbukti meningkatkan performa query database hingga 40% dan memimpin tim beranggotakan 8 engineer untuk meluncurkan produk SaaS berkecepatan tinggi.',
  },
  experiences: [
    {
      id: 'exp-1',
      company: 'PT Telkom Digital Solusindo',
      position: 'Lead Full Stack Engineer',
      startDate: '2022-01',
      endDate: 'Sekarang',
      isCurrent: true,
      description: '• Memimpin perancangan ulang sistem core billing berbasis Next.js, Node.js, dan PostgreSQL, menangani 500.000+ transaksi harian.\n• Mengurangi waktu loading aplikasi sebesar 55% dengan optimasi bundle code-splitting dan Redis caching layer.\n• Menerapkan automated CI/CD pipeline dengan Docker dan Kubernetes, mempercepat delivery deployment dari mingguan menjadi harian.',
    },
    {
      id: 'exp-2',
      company: 'Nusantara FinTech Global',
      position: 'Software Engineer',
      startDate: '2019-06',
      endDate: '2021-12',
      isCurrent: false,
      description: '• Mengembangkan microservices payment gateway dengan enkripsi tingkat tinggi sesuai standar PCI-DSS.\n• Merancang RESTful & GraphQL API yang digunakan oleh lebih dari 50 partner perbankan.\n• Membina 4 junior engineer dalam praktik clean architecture dan unit testing dengan coverage >85%.',
    },
    {
      id: 'exp-3',
      company: 'Creative Byte Agency',
      position: 'Frontend Developer',
      startDate: '2018-02',
      endDate: '2019-05',
      isCurrent: false,
      description: '• Membangun antarmuka interaktif dan responsif untuk 15+ klien enterprise menggunakan React, TypeScript, dan Tailwind CSS.\n• Mengoptimalkan Core Web Vitals untuk mencapai skor 95+ di Google PageSpeed Insights.',
    },
  ],
  educations: [
    {
      id: 'edu-1',
      institution: 'Institut Teknologi Bandung (ITB)',
      degree: 'Sarjana Komputer (S.Kom)',
      fieldOfStudy: 'Teknik Informatika',
      startDate: '2014-08',
      endDate: '2018-07',
    },
  ],
  skills: [
    { id: 'sk-1', name: 'TypeScript / JavaScript', level: 'Expert' },
    { id: 'sk-2', name: 'React.js & Next.js', level: 'Expert' },
    { id: 'sk-3', name: 'Node.js & Go', level: 'Advanced' },
    { id: 'sk-4', name: 'PostgreSQL & MongoDB', level: 'Advanced' },
    { id: 'sk-5', name: 'Docker & Kubernetes', level: 'Intermediate' },
    { id: 'sk-6', name: 'AWS & Cloud Architecture', level: 'Advanced' },
    { id: 'sk-7', name: 'Tailwind CSS & UI/UX', level: 'Expert' },
    { id: 'sk-8', name: 'GraphQL & RESTful API', level: 'Advanced' },
  ],
  coverLetter: {
    recipientName: 'Bapak Hendra Wijaya',
    recipientTitle: 'Head of Talent Acquisition & Engineering',
    companyName: 'PT Global Tech Nusantara',
    companyAddress: 'Sudirman Central Business District (SCBD) Lot 28, Jakarta Selatan',
    date: '19 September 2026',
    subject: 'Lamaran Pekerjaan - Lead Full Stack Engineer',
    letterBody: `Dengan hormat,

Sehubungan dengan informasi lowongan pekerjaan yang saya peroleh mengenai posisi Lead Full Stack Engineer di PT Global Tech Nusantara, saya ingin menyampaikan ketertarikan mendalam saya untuk bergabung dan berkontribusi dalam tim engineering Anda.

Dengan lebih dari 6 tahun pengalaman dalam pengembangan perangkat lunak berskala enterprise, saya telah memimpin tim lintas fungsi dalam merancang arsitektur sistem yang andal, scalable, dan secure. Di peran saya saat ini sebagai Lead Engineer, saya berhasil memimpin modernisasi sistem core billing yang memproses ratusan ribu transaksi harian dengan tingkat reliabilitas 99.98% serta memangkas latency hingga 55%.

PT Global Tech Nusantara dikenal atas inovasi teknologi finansialnya yang pesat dan berdampak nyata bagi ekosistem digital Indonesia. Saya yakin latar belakang keahlian teknis saya dalam Next.js, Node.js, arsitektur microservices, serta kapabilitas kepemimpinan tim agile dapat memberikan nilai tambah langsung bagi pencapaian target strategis perusahaan.

Terlampir resume saya yang merangkum kualifikasi, riwayat proyek, dan pencapaian profesional saya. Saya sangat menantikan kesempatan untuk berdiskusi lebih lanjut dalam sesi wawancara guna memaparkan bagaimana kontribusi saya dapat mendukung visi perusahaan.

Atas perhatian dan kesempatan yang Bapak/Ibu berikan, saya ucapkan terima kasih.`,
  },
};

const STORAGE_KEY = 'spacelive_cv_builder_data';

export const loadResumeData = (): ResumeData => {
  if (typeof window === 'undefined') return INITIAL_RESUME_DATA;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...INITIAL_RESUME_DATA, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load resume data from storage:', e);
  }
  return INITIAL_RESUME_DATA;
};

export const saveResumeData = (data: ResumeData): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save resume data to storage:', e);
  }
};

export const clearResumeData = (): ResumeData => {
  const emptyData: ResumeData = {
    category: 'ATS',
    templateId: 'ats-classic',
    personal: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      address: '',
      summary: '',
    },
    experiences: [],
    educations: [],
    skills: [],
    coverLetter: {
      recipientName: '',
      recipientTitle: '',
      companyName: '',
      companyAddress: '',
      date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
      letterBody: '',
    },
  };
  saveResumeData(emptyData);
  return emptyData;
};
