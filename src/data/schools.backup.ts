/**
 * Database Data Wilayah, Kecamatan, dan Sekolah KKA Radar Kediri 2026
 * Meliputi 7 Kabupaten/Kota di wilayah kerja Jawa Pos Radar Kediri.
 */

export interface SchoolDatabase {
  [regionSlug: string]: {
    name: string;
    districts: {
      [kecamatanName: string]: {
        sd: string[];
        smp: string[];
        sma: string[];
      };
    };
  };
}

export const SCHOOL_DATABASE: SchoolDatabase = {
  'kabupaten-nganjuk': {
    name: 'Kabupaten Nganjuk',
    districts: {
      'Nganjuk': {
        sd: [
          'SDN 1 Mangundikaran',
          'SDN 2 Mangundikaran',
          'SDN 1 Ganung Kidul',
          'SDN 2 Ganung Kidul',
          'SDN 1 Payaman',
          'SDN 3 Kauman',
          'MIN 1 Nganjuk',
          'SD Katolik Santo Paulus',
          'SDIT Al-Khairaat Nganjuk'
        ],
        smp: [
          'SMPN 1 Nganjuk',
          'SMPN 2 Nganjuk',
          'SMPN 3 Nganjuk',
          'SMPN 4 Nganjuk',
          'SMPN 5 Nganjuk',
          'SMPN 6 Nganjuk',
          'MTsN 1 Nganjuk',
          'SMP Katolik Santo Thomas'
        ],
        sma: [
          'SMAN 1 Nganjuk',
          'SMAN 2 Nganjuk',
          'SMAN 3 Nganjuk',
          'SMKN 1 Nganjuk',
          'SMKN 2 Nganjuk',
          'MAN 1 Nganjuk',
          'SMA Katolik Santo Thomas'
        ]
      },
      'Kertosono': {
        sd: [
          'SDN 1 Banaran',
          'SDN 2 Banaran',
          'SDN 1 Pelem',
          'SDN Kutorejo',
          'MIN 2 Nganjuk',
          'SD Islam Kertosono'
        ],
        smp: [
          'SMPN 1 Kertosono',
          'SMPN 2 Kertosono',
          'SMPN 3 Kertosono',
          'MTsN 2 Nganjuk',
          'SMP Muhammadiyah 1 Kertosono'
        ],
        sma: [
          'SMAN 1 Kertosono',
          'SMKN 1 Kertosono',
          'MAN 2 Nganjuk',
          'SMA Muhammadiyah 1 Kertosono'
        ]
      },
      'Tanjunganom': {
        sd: [
          'SDN 1 Warujayeng',
          'SDN 2 Warujayeng',
          'SDN 1 Tanjunganom',
          'SDN 2 Tanjunganom',
          'MIN 3 Nganjuk'
        ],
        smp: [
          'SMPN 1 Tanjunganom',
          'SMPN 2 Tanjunganom',
          'MTsN 3 Nganjuk'
        ],
        sma: [
          'SMAN 1 Tanjunganom',
          'SMKN 1 Tanjunganom',
          'MAN 3 Nganjuk'
        ]
      },
      'Loceret': {
        sd: ['SDN 1 Loceret', 'SDN 2 Loceret', 'SDN Candirejo', 'SDN Kenep'],
        smp: ['SMPN 1 Loceret', 'SMPN 2 Loceret', 'MTs Darul Huda Loceret'],
        sma: ['SMAN 1 Loceret', 'SMKN 1 Loceret']
      },
      'Berbek': {
        sd: ['SDN 1 Berbek', 'SDN 2 Berbek', 'SDN Bendungrejo', 'SDN Soko'],
        smp: ['SMPN 1 Berbek', 'SMPN 2 Berbek', 'MTsN 4 Nganjuk'],
        sma: ['SMAN 1 Berbek', 'MA Al-Hidayah Berbek']
      },
      'Bagor': {
        sd: ['SDN 1 Bagor', 'SDN 2 Bagor', 'SDN Guyangan', 'SDN Petak'],
        smp: ['SMPN 1 Bagor', 'SMPN 2 Bagor'],
        sma: ['SMKN 1 Bagor', 'SMA PGRI 1 Bagor']
      },
      'Sukomoro': {
        sd: ['SDN 1 Sukomoro', 'SDN 2 Sukomoro', 'SDN Bungur', 'SDN Kedungsoko'],
        smp: ['SMPN 1 Sukomoro', 'SMPN 2 Sukomoro'],
        sma: ['SMAN 1 Sukomoro', 'SMKN 1 Sukomoro']
      },
      'Pace': {
        sd: ['SDN 1 Pace', 'SDN 2 Pace', 'SDN Babadan', 'SDN Cerme'],
        smp: ['SMPN 1 Pace', 'SMPN 2 Pace', 'MTs Salafiyah Pace'],
        sma: ['SMAN 1 Pace', 'SMKN 1 Pace']
      },
      'Prambon': {
        sd: ['SDN 1 Prambon', 'SDN 2 Prambon', 'SDN Tanjungtani', 'SDN Kurungrejo'],
        smp: ['SMPN 1 Prambon', 'SMPN 2 Prambon'],
        sma: ['SMAN 1 Prambon', 'SMKN 1 Prambon']
      },
      'Baron': {
        sd: ['SDN 1 Baron', 'SDN 2 Baron', 'SDN Waung', 'SDN Jambi'],
        smp: ['SMPN 1 Baron', 'SMPN 2 Baron'],
        sma: ['SMAN 1 Baron', 'SMK PGRI Baron']
      },
      'Gondang': {
        sd: ['SDN 1 Gondang', 'SDN 2 Gondang', 'SDN Senggowok', 'SDN Nglinggo'],
        smp: ['SMPN 1 Gondang', 'SMPN 2 Gondang', 'MTs Gondang'],
        sma: ['SMAN 1 Gondang', 'SMKN 1 Gondang']
      },
      'Rejoso': {
        sd: ['SDN 1 Rejoso', 'SDN 2 Rejoso', 'SDN Mlorah', 'SDN Banjangkuncir'],
        smp: ['SMPN 1 Rejoso', 'SMPN 2 Rejoso'],
        sma: ['SMAN 1 Rejoso', 'SMKN 1 Rejoso']
      },
      'Sawahan': {
        sd: ['SDN 1 Sawahan', 'SDN 2 Sawahan', 'SDN Bareng', 'SDN Duren'],
        smp: ['SMPN 1 Sawahan', 'SMPN 2 Sawahan'],
        sma: ['SMAN 1 Sawahan']
      },
      'Ngetos': {
        sd: ['SDN 1 Ngetos', 'SDN 2 Ngetos', 'SDN Blongko', 'SDN Klodan'],
        smp: ['SMPN 1 Ngetos', 'SMPN 2 Ngetos'],
        sma: ['SMAN 1 Ngetos']
      },
      'Ngluyu': {
        sd: ['SDN 1 Ngluyu', 'SDN 2 Ngluyu', 'SDN Sugihwaras'],
        smp: ['SMPN 1 Ngluyu'],
        sma: ['SMAN 1 Ngluyu']
      },
      'Lengkong': {
        sd: ['SDN 1 Lengkong', 'SDN 2 Lengkong', 'SDN Bangle', 'SDN Sumberkepuh'],
        smp: ['SMPN 1 Lengkong', 'SMPN 2 Lengkong'],
        sma: ['SMAN 1 Lengkong', 'SMKN 1 Lengkong']
      },
      'Jatikalen': {
        sd: ['SDN 1 Jatikalen', 'SDN 2 Jatikalen', 'SDN Munung'],
        smp: ['SMPN 1 Jatikalen'],
        sma: ['SMAN 1 Jatikalen']
      },
      'Wilangan': {
        sd: ['SDN 1 Wilangan', 'SDN 2 Wilangan', 'SDN Mancon', 'SDN Ngadipiro'],
        smp: ['SMPN 1 Wilangan', 'SMPN 2 Wilangan'],
        sma: ['SMAN 1 Wilangan']
      },
      'Patianrowo': {
        sd: ['SDN 1 Patianrowo', 'SDN 2 Patianrowo', 'SDN Rowomarto', 'SDN Pakuncen'],
        smp: ['SMPN 1 Patianrowo', 'SMPN 2 Patianrowo'],
        sma: ['SMAN 1 Patianrowo', 'SMKN 1 Patianrowo']
      },
      'Ngronggot': {
        sd: ['SDN 1 Ngronggot', 'SDN 2 Ngronggot', 'SDN Cengkok', 'SDN Banjarsari'],
        smp: ['SMPN 1 Ngronggot', 'SMPN 2 Ngronggot'],
        sma: ['SMAN 1 Ngronggot', 'SMKN 1 Ngronggot']
      }
    }
  },

  'kota-kediri': {
    name: 'Kota Kediri',
    districts: {
      'Kota': {
        sd: [
          'SDN Banjaran 1',
          'SDN Banjaran 2',
          'SDN Banjaran 4',
          'SDN Balowerti 1',
          'SDN Balowerti 2',
          'SDN Setonopande 1',
          'SDN Setonopande 2',
          'SDK Santa Maria Kediri',
          'SD Plus Rahmat Kediri',
          'MIN 2 Kota Kediri'
        ],
        smp: [
          'SMPN 1 Kediri',
          'SMPN 2 Kediri',
          'SMPN 3 Kediri',
          'SMPN 5 Kediri',
          'SMP Katolik Santa Maria',
          'MTsN 2 Kota Kediri'
        ],
        sma: [
          'SMAN 1 Kediri',
          'SMAN 2 Kediri',
          'SMAN 3 Kediri',
          'SMAN 7 Kediri',
          'SMKN 1 Kediri',
          'SMKN 2 Kediri',
          'SMA Katolik Santo Augustinus',
          'MAN 2 Kota Kediri'
        ]
      },
      'Mojoroto': {
        sd: [
          'SDN Sukorame 1',
          'SDN Sukorame 2',
          'SDN Campurejo 1',
          'SDN Bandar Lor 1',
          'SDN Bandar Kidul 1',
          'SD Pawyatan Daha',
          'MIN 1 Kota Kediri'
        ],
        smp: [
          'SMPN 4 Kediri',
          'SMPN 6 Kediri',
          'SMPN 8 Kediri',
          'MTsN 1 Kota Kediri',
          'SMP Pawyatan Daha'
        ],
        sma: [
          'SMAN 4 Kediri',
          'SMAN 6 Kediri',
          'SMKN 3 Kediri',
          'MAN 1 Kota Kediri',
          'SMA Pawyatan Daha'
        ]
      },
      'Pesantren': {
        sd: [
          'SDN Burengan 1',
          'SDN Burengan 2',
          'SDN Pesantren 1',
          'SDN Pesantren 2',
          'SDN Betet 1',
          'SDN Singonegaran 1',
          'MIN 3 Kota Kediri'
        ],
        smp: [
          'SMPN 7 Kediri',
          'SMPN 9 Kediri',
          'MTsN 3 Kota Kediri'
        ],
        sma: [
          'SMAN 5 Kediri',
          'SMKN 1 Kediri (Kampus Pesantren)',
          'MAN 3 Kota Kediri'
        ]
      }
    }
  },

  'kabupaten-kediri': {
    name: 'Kabupaten Kediri',
    districts: {
      'Pare': {
        sd: ['SDN Pare 1', 'SDN Pare 2', 'SDN Pare 3', 'SDN Tulungrejo 1', 'MIN 1 Kediri', 'SDIT Pare'],
        smp: ['SMPN 1 Pare', 'SMPN 2 Pare', 'SMPN 3 Pare', 'SMPN 4 Pare', 'MTsN 1 Kediri'],
        sma: ['SMAN 1 Pare', 'SMAN 2 Pare', 'SMKN 1 Pare', 'MAN 2 Kediri', 'SMA Canda Bhirawa']
      },
      'Gampengrejo': {
        sd: ['SDN Gampeng 1', 'SDN Turus', 'SDN Putih', 'SDN Jongbiru'],
        smp: ['SMPN 1 Gampengrejo', 'SMPN 2 Gampengrejo'],
        sma: ['SMAN 1 Gampengrejo', 'SMKN 1 Gampengrejo']
      },
      'Ngasem': {
        sd: ['SDN Ngasem 1', 'SDN Doko 1', 'SDN Tugurejo', 'SDN Sukorejo'],
        smp: ['SMPN 1 Ngasem', 'SMPN 2 Ngasem'],
        sma: ['SMAN 1 Ngasem']
      },
      'Gurah': {
        sd: ['SDN Gurah 1', 'SDN Gurah 2', 'SDN Sukorejo', 'SDN Kranggan'],
        smp: ['SMPN 1 Gurah', 'SMPN 2 Gurah', 'MTsN Gurah'],
        sma: ['SMAN 1 Gurah', 'SMK PGRI Gurah']
      },
      'Wates': {
        sd: ['SDN Wates 1', 'SDN Wates 2', 'SDN Tawang', 'SDN Gadungan'],
        smp: ['SMPN 1 Wates', 'SMPN 2 Wates', 'MTsN Wates'],
        sma: ['SMAN 1 Wates', 'SMKN 1 Wates']
      },
      'Ngadiluwih': {
        sd: ['SDN Ngadiluwih 1', 'SDN Ngadiluwih 2', 'SDN Rembang', 'SDN Branggahan'],
        smp: ['SMPN 1 Ngadiluwih', 'SMPN 2 Ngadiluwih'],
        sma: ['SMAN 1 Ngadiluwih', 'SMKN 1 Ngadiluwih']
      },
      'Mojo': {
        sd: ['SDN Mojo 1', 'SDN Mojo 2', 'SDN Surat', 'SDN Tambibendo'],
        smp: ['SMPN 1 Mojo', 'SMPN 2 Mojo', 'MTsN Mojo'],
        sma: ['SMAN 1 Mojo']
      },
      'Kras': {
        sd: ['SDN Kras 1', 'SDN Kras 2', 'SDN Jabang', 'SDN Bendosari'],
        smp: ['SMPN 1 Kras', 'SMPN 2 Kras'],
        sma: ['SMAN 1 Kras', 'SMKN 1 Kras']
      },
      'Papar': {
        sd: ['SDN Papar 1', 'SDN Papar 2', 'SDN Pehkulon', 'SDN Janti'],
        smp: ['SMPN 1 Papar', 'SMPN 2 Papar'],
        sma: ['SMAN 1 Papar', 'SMKN 1 Papar']
      },
      'Plemahan': {
        sd: ['SDN Plemahan 1', 'SDN Plemahan 2', 'SDN Tegowangi'],
        smp: ['SMPN 1 Plemahan', 'SMPN 2 Plemahan'],
        sma: ['SMAN 1 Plemahan', 'SMKN 1 Plemahan']
      },
      'Kandangan': {
        sd: ['SDN Kandangan 1', 'SDN Kandangan 2', 'SDN Kasreman'],
        smp: ['SMPN 1 Kandangan', 'SMPN 2 Kandangan'],
        sma: ['SMAN 1 Kandangan', 'SMKN 1 Kandangan']
      },
      'Purwoasri': {
        sd: ['SDN Purwoasri 1', 'SDN Purwoasri 2', 'SDN Woromarto'],
        smp: ['SMPN 1 Purwoasri', 'SMPN 2 Purwoasri'],
        sma: ['SMAN 1 Purwoasri', 'SMKN 1 Purwoasri']
      },
      'Badas': {
        sd: ['SDN Badas 1', 'SDN Canggu 1', 'SDN Keling'],
        smp: ['SMPN 1 Badas', 'SMPN 2 Badas'],
        sma: ['SMAN 1 Badas']
      },
      'Banyakan': {
        sd: ['SDN Banyakan 1', 'SDN Maron', 'SDN Manyaran'],
        smp: ['SMPN 1 Banyakan', 'SMPN 2 Banyakan'],
        sma: ['SMAN 1 Banyakan']
      },
      'Grogol': {
        sd: ['SDN Grogol 1', 'SDN Sonorejo', 'SDN Cengkok'],
        smp: ['SMPN 1 Grogol', 'SMPN 2 Grogol'],
        sma: ['SMAN 1 Grogol', 'SMKN 1 Grogol']
      },
      'Kandat': {
        sd: ['SDN Kandat 1', 'SDN Kandat 2', 'SDN Ringinsari'],
        smp: ['SMPN 1 Kandat', 'SMPN 2 Kandat'],
        sma: ['SMAN 1 Kandat']
      },
      'Kayen Kidul': {
        sd: ['SDN Kayen Kidul 1', 'SDN Semambung', 'SDN Bangsongan'],
        smp: ['SMPN 1 Kayen Kidul'],
        sma: ['SMAN 1 Kayen Kidul']
      },
      'Kepung': {
        sd: ['SDN Kepung 1', 'SDN Krenceng', 'SDN Besowo'],
        smp: ['SMPN 1 Kepung', 'SMPN 2 Kepung'],
        sma: ['SMAN 1 Kepung']
      },
      'Kunjang': {
        sd: ['SDN Kunjang 1', 'SDN Pakis', 'SDN Tengger Lor'],
        smp: ['SMPN 1 Kunjang'],
        sma: ['SMAN 1 Kunjang']
      },
      'Ngancar': {
        sd: ['SDN Ngancar 1', 'SDN Sugihwaras', 'SDN Babadan'],
        smp: ['SMPN 1 Ngancar', 'SMPN 2 Ngancar'],
        sma: ['SMAN 1 Ngancar']
      },
      'Pagu': {
        sd: ['SDN Pagu 1', 'SDN Sitimerto', 'SDN Menang'],
        smp: ['SMPN 1 Pagu', 'SMPN 2 Pagu'],
        sma: ['SMAN 1 Pagu']
      },
      'Plosoklaten': {
        sd: ['SDN Plosoklaten 1', 'SDN Klanderan', 'SDN Brenggolo'],
        smp: ['SMPN 1 Plosoklaten', 'SMPN 2 Plosoklaten'],
        sma: ['SMAN 1 Plosoklaten']
      },
      'Puncu': {
        sd: ['SDN Puncu 1', 'SDN Wonorejo', 'SDN Asmorobangun'],
        smp: ['SMPN 1 Puncu', 'SMPN 2 Puncu'],
        sma: ['SMAN 1 Puncu']
      },
      'Ringinrejo': {
        sd: ['SDN Ringinrejo 1', 'SDN Sambirejo', 'SDN Deyeng'],
        smp: ['SMPN 1 Ringinrejo'],
        sma: ['SMAN 1 Ringinrejo']
      },
      'Semen': {
        sd: ['SDN Semen 1', 'SDN Puhsarang', 'SDN Kanyoran'],
        smp: ['SMPN 1 Semen', 'SMPN 2 Semen'],
        sma: ['SMAN 1 Semen']
      },
      'Tarokan': {
        sd: ['SDN Tarokan 1', 'SDN Kaliboto', 'SDN Kedungsari'],
        smp: ['SMPN 1 Tarokan', 'SMPN 2 Tarokan'],
        sma: ['SMAN 1 Tarokan']
      }
    }
  },

  'kota-blitar': {
    name: 'Kota Blitar',
    districts: {
      'Sananwetan': {
        sd: ['SDN Bendogerit 1', 'SDN Bendogerit 2', 'SDN Sananwetan 1', 'SDN Sananwetan 2', 'MIN 1 Kota Blitar'],
        smp: ['SMPN 1 Blitar', 'SMPN 2 Blitar', 'SMPN 3 Blitar', 'MTsN 1 Kota Blitar'],
        sma: ['SMAN 1 Blitar', 'SMAN 2 Blitar', 'SMAN 3 Blitar', 'SMKN 1 Blitar', 'MAN 1 Kota Blitar']
      },
      'Kepanjenkidul': {
        sd: ['SDN Kepanjenkidul 1', 'SDN Kepanjenkidul 2', 'SDN Bendo 1', 'SDN Kauman 1'],
        smp: ['SMPN 4 Blitar', 'SMPN 5 Blitar'],
        sma: ['SMAN 4 Blitar', 'SMKN 2 Blitar']
      },
      'Sukorejo': {
        sd: ['SDN Sukorejo 1', 'SDN Sukorejo 2', 'SDN Turi 1', 'SDN Pakunden 1'],
        smp: ['SMPN 6 Blitar', 'SMPN 7 Blitar', 'SMPN 8 Blitar'],
        sma: ['SMKN 3 Blitar', 'MAN 2 Kota Blitar']
      }
    }
  },

  'kabupaten-blitar': {
    name: 'Kabupaten Blitar',
    districts: {
      'Kanigoro': {
        sd: ['SDN Kanigoro 1', 'SDN Kanigoro 2', 'SDN Satreyan 1', 'MIN 1 Blitar'],
        smp: ['SMPN 1 Kanigoro', 'SMPN 2 Kanigoro', 'MTsN 1 Blitar'],
        sma: ['SMAN 1 Kanigoro', 'SMKN 1 Kanigoro']
      },
      'Wlingi': {
        sd: ['SDN Wlingi 1', 'SDN Babadan 1', 'SDN Beru 1'],
        smp: ['SMPN 1 Wlingi', 'SMPN 2 Wlingi', 'MTsN 2 Blitar'],
        sma: ['SMAN 1 Wlingi', 'SMKN 1 Wlingi']
      },
      'Garum': {
        sd: ['SDN Garum 1', 'SDN Pojok 1', 'SDN Bence 1'],
        smp: ['SMPN 1 Garum', 'SMPN 2 Garum'],
        sma: ['SMAN 1 Garum']
      },
      'Sutojayan': {
        sd: ['SDN Sutojayan 1', 'SDN Kalipang 1', 'SDN Pandanarum 1'],
        smp: ['SMPN 1 Sutojayan', 'SMPN 2 Sutojayan'],
        sma: ['SMAN 1 Sutojayan', 'SMKN 1 Sutojayan']
      },
      'Talun': {
        sd: ['SDN Talun 1', 'SDN Pasirharjo 1', 'SDN Kendalrejo 1'],
        smp: ['SMPN 1 Talun', 'SMPN 2 Talun'],
        sma: ['SMAN 1 Talun']
      },
      'Srengat': {
        sd: ['SDN Srengat 1', 'SDN Dandong 1', 'SDN Bagelenan 1'],
        smp: ['SMPN 1 Srengat', 'SMPN 2 Srengat'],
        sma: ['SMAN 1 Srengat', 'MAN 3 Blitar']
      },
      'Ponggok': {
        sd: ['SDN Ponggok 1', 'SDN Candirejo 1', 'SDN Karanganyar 1'],
        smp: ['SMPN 1 Ponggok', 'SMPN 2 Ponggok'],
        sma: ['SMAN 1 Ponggok']
      },
      'Nglegok': {
        sd: ['SDN Nglegok 1', 'SDN Modangan 1', 'SDN Penataran 1'],
        smp: ['SMPN 1 Nglegok', 'SMPN 2 Nglegok'],
        sma: ['SMAN 1 Nglegok']
      },
      'Gandusari': {
        sd: ['SDN Gandusari 1', 'SDN Sukosewu 1', 'SDN Kotes 1'],
        smp: ['SMPN 1 Gandusari', 'SMPN 2 Gandusari'],
        sma: ['SMAN 1 Gandusari']
      },
      'Kademangan': {
        sd: ['SDN Kademangan 1', 'SDN Plumpungrejo 1', 'SDN Darungan 1'],
        smp: ['SMPN 1 Kademangan', 'SMPN 2 Kademangan'],
        sma: ['SMAN 1 Kademangan']
      },
      'Kesamben': {
        sd: ['SDN Kesamben 1', 'SDN Siraman 1', 'SDN Pagerwojo 1'],
        smp: ['SMPN 1 Kesamben', 'SMPN 2 Kesamben'],
        sma: ['SMAN 1 Kesamben']
      },
      'Sanankulon': {
        sd: ['SDN Sanankulon 1', 'SDN Kalipucung 1', 'SDN Bendowulung 1'],
        smp: ['SMPN 1 Sanankulon'],
        sma: ['SMAN 1 Sanankulon']
      },
      'Udanawu': {
        sd: ['SDN Udanawu 1', 'SDN Bakung 1', 'SDN Ringinanom 1'],
        smp: ['SMPN 1 Udanawu'],
        sma: ['SMAN 1 Udanawu']
      },
      'Wonodadi': {
        sd: ['SDN Wonodadi 1', 'SDN Kolomayan 1', 'SDN Pikatan 1'],
        smp: ['SMPN 1 Wonodadi'],
        sma: ['SMAN 1 Wonodadi']
      },
      'Wonotirto': {
        sd: ['SDN Wonotirto 1', 'SDN Pasiraman 1'],
        smp: ['SMPN 1 Wonotirto'],
        sma: ['SMAN 1 Wonotirto']
      },
      'Doko': {
        sd: ['SDN Doko 1', 'SDN Resapombo 1'],
        smp: ['SMPN 1 Doko'],
        sma: ['SMAN 1 Doko']
      },
      'Binangun': {
        sd: ['SDN Binangun 1', 'SDN Rejoso 1'],
        smp: ['SMPN 1 Binangun'],
        sma: ['SMAN 1 Binangun']
      },
      'Bakung': {
        sd: ['SDN Bakung 1', 'SDN Pulerejo 1'],
        smp: ['SMPN 1 Bakung'],
        sma: ['SMAN 1 Bakung']
      },
      'Panggungrejo': {
        sd: ['SDN Panggungrejo 1', 'SDN Kalitengah 1'],
        smp: ['SMPN 1 Panggungrejo'],
        sma: ['SMAN 1 Panggungrejo']
      },
      'Selorejo': {
        sd: ['SDN Selorejo 1', 'SDN Boro 1'],
        smp: ['SMPN 1 Selorejo'],
        sma: ['SMAN 1 Selorejo']
      },
      'Selopuro': {
        sd: ['SDN Selopuro 1', 'SDN Popoh 1'],
        smp: ['SMPN 1 Selopuro'],
        sma: ['SMAN 1 Selopuro']
      },
      'Wates': {
        sd: ['SDN Wates 1', 'SDN Ringinrejo 1'],
        smp: ['SMPN 1 Wates Blitar'],
        sma: ['SMAN 1 Wates Blitar']
      }
    }
  },

  'kabupaten-tulungagung': {
    name: 'Kabupaten Tulungagung',
    districts: {
      'Tulungagung': {
        sd: ['SDN Kampungdalem 1', 'SDN Kampungdalem 2', 'SDN Kepatihan 1', 'MIN 1 Tulungagung', 'SD Katolik Santa Maria'],
        smp: ['SMPN 1 Tulungagung', 'SMPN 2 Tulungagung', 'SMPN 3 Tulungagung', 'MTsN 1 Tulungagung'],
        sma: ['SMAN 1 Kedungwaru', 'SMAN 1 Kauman', 'SMAN 1 Boyolangu', 'SMKN 1 Tulungagung', 'MAN 1 Tulungagung']
      },
      'Kedungwaru': {
        sd: ['SDN Kedungwaru 1', 'SDN Bangoan 1', 'SDN Ringinpitu 1'],
        smp: ['SMPN 1 Kedungwaru', 'SMPN 2 Kedungwaru'],
        sma: ['SMAN 1 Kedungwaru', 'SMKN 2 Tulungagung']
      },
      'Boyolangu': {
        sd: ['SDN Boyolangu 1', 'SDN Beji 1', 'SDN Sobontoro 1'],
        smp: ['SMPN 1 Boyolangu', 'SMPN 2 Boyolangu'],
        sma: ['SMAN 1 Boyolangu', 'SMKN 3 Boyolangu']
      },
      'Ngunut': {
        sd: ['SDN Ngunut 1', 'SDN Ngunut 2', 'SDN Sumberejo Kulon 1'],
        smp: ['SMPN 1 Ngunut', 'SMPN 2 Ngunut', 'MTsN 2 Tulungagung'],
        sma: ['SMAN 1 Ngunut', 'SMKN 1 Ngunut']
      },
      'Kauman': {
        sd: ['SDN Kauman 1', 'SDN Balerejo 1', 'SDN Batangsaren 1'],
        smp: ['SMPN 1 Kauman', 'SMPN 2 Kauman'],
        sma: ['SMAN 1 Kauman', 'MAN 2 Tulungagung']
      },
      'Karangrejo': {
        sd: ['SDN Karangrejo 1', 'SDN Sukodono 1', 'SDN Sembon 1'],
        smp: ['SMPN 1 Karangrejo', 'SMPN 2 Karangrejo'],
        sma: ['SMAN 1 Karangrejo']
      },
      'Gondang': {
        sd: ['SDN Gondang 1', 'SDN Tiudan 1', 'SDN Dukuh 1'],
        smp: ['SMPN 1 Gondang', 'SMPN 2 Gondang'],
        sma: ['SMAN 1 Gondang']
      },
      'Campurdarat': {
        sd: ['SDN Campurdarat 1', 'SDN Welandakan 1', 'SDN Sawo 1'],
        smp: ['SMPN 1 Campurdarat', 'SMPN 2 Campurdarat'],
        sma: ['SMAN 1 Campurdarat']
      },
      'Kalidawir': {
        sd: ['SDN Kalidawir 1', 'SDN Karangtalun 1', 'SDN Tunggangri 1'],
        smp: ['SMPN 1 Kalidawir', 'SMPN 2 Kalidawir'],
        sma: ['SMAN 1 Kalidawir']
      },
      'Rejotangan': {
        sd: ['SDN Rejotangan 1', 'SDN Aryojeding 1', 'SDN Banjarejo 1'],
        smp: ['SMPN 1 Rejotangan', 'SMPN 2 Rejotangan'],
        sma: ['SMAN 1 Rejotangan', 'SMKN 1 Rejotangan']
      },
      'Sumbergempol': {
        sd: ['SDN Sumbergempol 1', 'SDN Podorejo 1', 'SDN Junjung 1'],
        smp: ['SMPN 1 Sumbergempol'],
        sma: ['SMAN 1 Sumbergempol']
      },
      'Ngantru': {
        sd: ['SDN Ngantru 1', 'SDN Batokan 1', 'SDN Kepuhrejo 1'],
        smp: ['SMPN 1 Ngantru'],
        sma: ['SMAN 1 Ngantru']
      },
      'Besuki': {
        sd: ['SDN Besuki 1', 'SDN Tanggulkundung 1'],
        smp: ['SMPN 1 Besuki'],
        sma: ['SMAN 1 Besuki']
      },
      'Pagerwojo': {
        sd: ['SDN Pagerwojo 1', 'SDN Samar 1'],
        smp: ['SMPN 1 Pagerwojo'],
        sma: ['SMAN 1 Pagerwojo']
      },
      'Sendang': {
        sd: ['SDN Sendang 1', 'SDN Tugu 1'],
        smp: ['SMPN 1 Sendang'],
        sma: ['SMAN 1 Sendang']
      },
      'Pakel': {
        sd: ['SDN Pakel 1', 'SDN Bangunmulyo 1'],
        smp: ['SMPN 1 Pakel'],
        sma: ['SMAN 1 Pakel']
      },
      'Tanggunggunung': {
        sd: ['SDN Tanggunggunung 1', 'SDN Kresikan 1'],
        smp: ['SMPN 1 Tanggunggunung'],
        sma: ['SMAN 1 Tanggunggunung']
      },
      'Pucanglaban': {
        sd: ['SDN Pucanglaban 1', 'SDN Kalidawe 1'],
        smp: ['SMPN 1 Pucanglaban'],
        sma: ['SMAN 1 Pucanglaban']
      }
    }
  },

  'kabupaten-trenggalek': {
    name: 'Kabupaten Trenggalek',
    districts: {
      'Trenggalek': {
        sd: ['SDN Sumbergedong 1', 'SDN Surodakan 2', 'SDN Kelutan 1', 'MIN 1 Trenggalek', 'SDIT Permata Umat'],
        smp: ['SMPN 1 Trenggalek', 'SMPN 2 Trenggalek', 'SMPN 3 Trenggalek', 'MTsN 1 Trenggalek'],
        sma: ['SMAN 1 Trenggalek', 'SMAN 2 Trenggalek', 'SMKN 1 Trenggalek', 'SMKN 2 Trenggalek', 'MAN 1 Trenggalek']
      },
      'Durenan': {
        sd: ['SDN Durenan 1', 'SDN Sembrum 1', 'SDN Malasan 1'],
        smp: ['SMPN 1 Durenan', 'SMPN 2 Durenan', 'MTsN 2 Trenggalek'],
        sma: ['SMAN 1 Durenan']
      },
      'Karangan': {
        sd: ['SDN Karangan 1', 'SDN Kerjo 1', 'SDN Jati 1'],
        smp: ['SMPN 1 Karangan', 'SMPN 2 Karangan'],
        sma: ['SMAN 1 Karangan', 'SMKN 1 Karangan']
      },
      'Pogalan': {
        sd: ['SDN Pogalan 1', 'SDN Ngetal 1', 'SDN Ngadirenggo 1'],
        smp: ['SMPN 1 Pogalan'],
        sma: ['SMAN 1 Pogalan']
      },
      'Gandusari': {
        sd: ['SDN Gandusari 1', 'SDN Sukorejo 1', 'SDN Wonorejo 1'],
        smp: ['SMPN 1 Gandusari', 'SMPN 2 Gandusari'],
        sma: ['SMAN 1 Gandusari']
      },
      'Kampak': {
        sd: ['SDN Kampak 1', 'SDN Bendoagung 1', 'SDN Senden 1'],
        smp: ['SMPN 1 Kampak', 'SMPN 2 Kampak'],
        sma: ['SMAN 1 Kampak']
      },
      'Dongko': {
        sd: ['SDN Dongko 1', 'SDN Pringapus 1', 'SDN Petung 1'],
        smp: ['SMPN 1 Dongko', 'SMPN 2 Dongko'],
        sma: ['SMAN 1 Dongko']
      },
      'Panggul': {
        sd: ['SDN Panggul 1', 'SDN Wonocoyo 1', 'SDN Kertosono 1'],
        smp: ['SMPN 1 Panggul', 'SMPN 2 Panggul'],
        sma: ['SMAN 1 Panggul', 'SMKN 1 Panggul']
      },
      'Watulimo': {
        sd: ['SDN Prigi 1', 'SDN Tasikmadu 1', 'SDN Slawe 1'],
        smp: ['SMPN 1 Watulimo', 'SMPN 2 Watulimo'],
        sma: ['SMAN 1 Watulimo', 'SMKN 1 Watulimo']
      },
      'Munjungan': {
        sd: ['SDN Munjungan 1', 'SDN Masaran 1', 'SDN Tawing 1'],
        smp: ['SMPN 1 Munjungan', 'SMPN 2 Munjungan'],
        sma: ['SMAN 1 Munjungan']
      },
      'Tugu': {
        sd: ['SDN Tugu 1', 'SDN Gondang 1', 'SDN Prambon 1'],
        smp: ['SMPN 1 Tugu'],
        sma: ['SMAN 1 Tugu']
      },
      'Bendungan': {
        sd: ['SDN Bendungan 1', 'SDN Dompyong 1'],
        smp: ['SMPN 1 Bendungan'],
        sma: ['SMAN 1 Bendungan']
      },
      'Pule': {
        sd: ['SDN Pule 1', 'SDN Puyung 1'],
        smp: ['SMPN 1 Pule'],
        sma: ['SMAN 1 Pule']
      },
      'Suruh': {
        sd: ['SDN Suruh 1', 'SDN Puru 1'],
        smp: ['SMPN 1 Suruh'],
        sma: ['SMAN 1 Suruh']
      }
    }
  }
};
