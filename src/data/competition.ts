export interface Region {
  id: number;
  name: string;
  description: string;
}

export interface District {
  id: number;
  regionId: number;
  regionName: string;
  name: string;
  slug: string;
  description: string;
  badge: string;
  logoUrl?: string;
}

export interface Level {
  id: string;
  name: string;
  shortName: string;
  classes: string;
  subjects: string[];
  electiveCount?: number;
  electiveOptions?: string[];
  description: string;
}

export interface Wave {
  id: number;
  name: string;
  period: string;
  startDate: string; // ISO string for date comparison
  endDate: string;
  isActive: boolean;
  prices: {
    sd: number;
    smp: number;
    sma: number;
  };
}

export const REGIONS: Region[] = [
  { id: 1, name: 'Region 1', description: 'Kota Kediri & Kabupaten Kediri' },
  { id: 2, name: 'Region 2', description: 'Kabupaten Nganjuk, Kabupaten Blitar & Kota Blitar' },
  { id: 3, name: 'Region 3', description: 'Kabupaten Tulungagung & Kabupaten Trenggalek' }
];

export const DISTRICTS: District[] = [
  {
    id: 1,
    regionId: 1,
    regionName: 'Region 1',
    name: 'Kota Kediri',
    slug: 'kota-kediri',
    description: 'Pusat kompetisi KKA 2026 wilayah Region 1. Ajang bergengsi bagi siswa terbaik Kota Kediri untuk mengukur kemampuan akademik dan meraih tiket menuju Grand Final.',
    badge: 'Kota Kediri',
    logoUrl: '/images/wilayah/kota-kediri.webp'
  },
  {
    id: 2,
    regionId: 1,
    regionName: 'Region 1',
    name: 'Kabupaten Kediri',
    slug: 'kabupaten-kediri',
    description: 'Kompetisi akademik untuk seluruh pelajar Kabupaten Kediri. Ukur kemampuanmu bersama ribuan siswa terbaik se-Region 1 dan buktikan prestasimu di panggung Grand Final.',
    badge: 'Kab. Kediri',
    logoUrl: '/images/wilayah/kabupaten-kediri.webp'
  },
  {
    id: 3,
    regionId: 2,
    regionName: 'Region 2',
    name: 'Kabupaten Nganjuk',
    slug: 'kabupaten-nganjuk',
    description: 'Wakili Kabupaten Nganjuk di KKA 2026! Bersaing dengan peserta terbaik Region 2 Nganjuk, Kota Blitar, dan Kab. Blitar, tunjukkan kemampuan akademik terbaikmu.',
    badge: 'Kab. Nganjuk',
    logoUrl: '/images/wilayah/kabupaten-nganjuk.webp'
  },
  {
    id: 4,
    regionId: 2,
    regionName: 'Region 2',
    name: 'Kabupaten Blitar',
    slug: 'kabupaten-blitar',
    description: 'KKA 2026 hadir untuk pelajar Kabupaten Blitar! Bergabung dalam Region 2 bersama Kab. Nganjuk dan Kota Blitar. Asah kemampuan, raih medali, dan cetak prestasi terbaikmu.',
    badge: 'Kab. Blitar',
    logoUrl: '/images/wilayah/kabupaten-blitar.webp'
  },
  {
    id: 5,
    regionId: 2,
    regionName: 'Region 2',
    name: 'Kota Blitar',
    slug: 'kota-blitar',
    description: 'Siswa Kota Blitar siap unjuk kemampuan di KKA 2026! Bersama peserta Region 2, buktikan bahwa pelajar Kota Blitar siap bersaing di tingkat regional hingga Grand Final.',
    badge: 'Kota Blitar',
    logoUrl: '/images/wilayah/kota-blitar.webp'
  },
  {
    id: 6,
    regionId: 3,
    regionName: 'Region 3',
    name: 'Kabupaten Tulungagung',
    slug: 'kabupaten-tulungagung',
    description: 'Pelajar Kabupaten Tulungagung kini punya kesempatan bersaing di Region 3 bersama Kab. Trenggalek. Jadikan KKA 2026 sebagai batu loncatan menuju sekolah atau kampus impianmu.',
    badge: 'Kab. Tulungagung',
    logoUrl: '/images/wilayah/kabupaten-tulungagung.webp'
  },
  {
    id: 7,
    regionId: 3,
    regionName: 'Region 3',
    name: 'Kabupaten Trenggalek',
    slug: 'kabupaten-trenggalek',
    description: 'KKA 2026 kini hadir di Kabupaten Trenggalek! Bergabung dalam Region 3 bersama Kab. Tulungagung dan tunjukkan bahwa pelajar Trenggalek siap bersaing di level terbaik.',
    badge: 'Kab. Trenggalek',
    logoUrl: '/images/wilayah/kabupaten-trenggalek.webp'
  }
];

export const LEVELS: Level[] = [
  {
    id: 'sd',
    name: 'SD / MI Sederajat',
    shortName: 'SD / MI',
    classes: 'Kelas IV, V, dan VI',
    subjects: ['Matematika', 'Bahasa Indonesia'],
    description: 'Membangun dasar logika dan literasi siswa sekolah dasar sejak dini melalui tantangan standar TKA.'
  },
  {
    id: 'smp',
    name: 'SMP / MTs Sederajat',
    shortName: 'SMP / MTs',
    classes: 'Kelas VIII dan IX',
    subjects: ['Matematika', 'Bahasa Indonesia'],
    description: 'Mengasah penalaran analitis dan kecakapan akademik persiapan jenjang sekolah menengah atas.'
  },
  {
    id: 'sma',
    name: 'SMA / MA / SMK Sederajat',
    shortName: 'SMA / MA / SMK',
    classes: 'Kelas XI dan XII',
    subjects: ['Matematika', 'Bahasa Indonesia', 'Bahasa Inggris'],
    electiveCount: 2,
    electiveOptions: ['Fisika', 'Kimia', 'Biologi', 'Ekonomi', 'Geografi', 'Sosiologi'],
    description: 'Simulasi komprehensif mengukur kesiapan kompetensi akademik menuju perguruan tinggi dan karir masa depan.'
  }
];

export const WAVES: Wave[] = [
  {
    id: 1,
    name: 'Gelombang I (Early Bird)',
    period: '2 Juni – 20 Juni 2026',
    startDate: '2026-06-02',
    endDate: '2026-06-20',
    isActive: true,
    prices: {
      sd: 25000,
      smp: 35000,
      sma: 50000
    }
  },
  {
    id: 2,
    name: 'Gelombang II (Reguler)',
    period: '22 Juni – 18 Juli 2026',
    startDate: '2026-06-22',
    endDate: '2026-07-18',
    isActive: false,
    prices: {
      sd: 30000,
      smp: 40000,
      sma: 60000
    }
  },
  {
    id: 3,
    name: 'Gelombang III (Last Call)',
    period: '20 Juli – 25 Juli 2026',
    startDate: '2026-07-20',
    endDate: '2026-07-25',
    isActive: false,
    prices: {
      sd: 40000,
      smp: 50000,
      sma: 75000
    }
  }
];

export const SITE_INFO = {
  name: 'KKA Jawa Pos Radar Kediri',
  shortName: 'KKA 2026',
  tagline: 'Challenge Your Brain, Test Your Skills',
  subtagline: 'Kompetisi Kompetensi Akademik Terbesar Se-Karesidenan Kediri & Sekitarnya',
  year: '2026',
  stats: {
    participants2024: '4.920',
    participants2025: '5.633',
    expected2026: '6.500+',
    regionsCount: 7,
    schoolsCount: '350+'
  },
  organizer: 'Jawa Pos Radar Kediri',
  partners: [
    { name: 'Neutron Yogyakarta', role: 'Partner Standar Soal & Akademik' },
    { name: 'Cabdindik Wilayah Jatim', role: 'Dukungan Edukasi' },
    { name: 'Kemenag Wilayah', role: 'Dukungan Madrasah' }
  ],
  whatsappContacts: [
    { 
      adminLabel: 'WhatsApp Admin 1',
      name: 'Pak Endro', 
      number: '6281235508957', 
      display: '0812-3550-8957 (Pak Endro)', 
      phoneOnly: '0812-3550-8957',
      role: 'Pendaftaran & Teknis',
      subtext: 'Admin Wilayah Kabupaten Kediri'
    },
    { 
      adminLabel: 'WhatsApp Admin 2',
      name: 'Mas Fajar', 
      number: '6281359138251', 
      display: '0813-5913-8251 (Mas Fajar)', 
      phoneOnly: '0813-5913-8251',
      role: 'Verifikasi Pembayaran',
      subtext: 'Admin Wilayah Kota Kediri'
    },
    { 
      adminLabel: 'WhatsApp Admin 3',
      name: 'Mas Wildan', 
      number: '62815589790831', 
      display: '0815-5897-90831 (Mas Wildan)', 
      phoneOnly: '0815-5897-90831',
      role: 'Informasi Umum & Sekolah',
      subtext: 'Admin Wilayah Nganjuk & Blitar'
    }
  ],
  paymentAccounts: [
    {
      bank: 'Bank BRI',
      accountNumber: '0033-01-001234-53-8',
      accountHolder: 'Radar Kediri Event',
      note: 'Wajib cantumkan Kode Pendaftaran pada berita transfer'
    },
    {
      bank: 'Bank BCA',
      accountNumber: '011-897-6543',
      accountHolder: 'Radar Kediri Event',
      note: 'Wajib cantumkan Kode Pendaftaran pada berita transfer'
    }
  ]
};
