import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { auditFile } from './audit_schools_json.mjs';

// Konfigurasi Wilayah
const REGION_DEFINITIONS = {
  'kabupaten-blitar': {
    slug: 'kabupaten-blitar',
    name: 'Kabupaten Blitar',
    patterns: [/kabupaten.*blitar/i, /blitar.*kab/i, /belitar/i]
  },
  'kota-blitar': {
    slug: 'kota-blitar',
    name: 'Kota Blitar',
    patterns: [/kota.*blitar/i, /blitar.*kota/i]
  },
  'kabupaten-kediri': {
    slug: 'kabupaten-kediri',
    name: 'Kabupaten Kediri',
    patterns: [/kabupaten.*kediri/i, /kediri.*kab/i]
  },
  'kota-kediri': {
    slug: 'kota-kediri',
    name: 'Kota Kediri',
    patterns: [/kota.*kediri/i, /kediri.*kota/i]
  },
  'kabupaten-nganjuk': {
    slug: 'kabupaten-nganjuk',
    name: 'Kabupaten Nganjuk',
    patterns: [/nganjuk/i]
  },
  'kabupaten-tulungagung': {
    slug: 'kabupaten-tulungagung',
    name: 'Kabupaten Tulungagung',
    patterns: [/tulungagung/i]
  },
  'kabupaten-trenggalek': {
    slug: 'kabupaten-trenggalek',
    name: 'Kabupaten Trenggalek',
    patterns: [/trenggalek/i]
  }
};

// Pembersihan nama kecamatan (typo umum dari data mentah)
const KECAMATAN_CLEANUP = {
  // Blitar
  'salerejo': 'Selorejo',
  'selerejo': 'Selorejo',
  // Nganjuk
  'gondnang': 'Gondang',
  'kertosno': 'Kertosono',
  'patianworo': 'Patianrowo',
  // Kota Kediri (Kecamatan Kota / Kediri)
  'kota kediri': 'Kediri'
};

function normalizeJenjang(val) {
  if (!val) return 'sd';
  const str = String(val).toUpperCase().trim();
  if (str.includes('SMA') || str.includes('SMK') || str.includes('MA') || str.includes('SLTA')) {
    return 'sma';
  }
  if (str.includes('SMP') || str.includes('MTS') || str.includes('SLTP')) {
    return 'smp';
  }
  return 'sd';
}

function detectRegion(fileName, sampleItem) {
  const checkText = `${fileName} ${sampleItem?.Wilayah || ''}`;
  for (const [slug, def] of Object.entries(REGION_DEFINITIONS)) {
    for (const pat of def.patterns) {
      if (pat.test(checkText)) {
        return def;
      }
    }
  }
  return REGION_DEFINITIONS['kabupaten-blitar'];
}

function capitalizeWords(str) {
  return str.replace(/\b\w+/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

async function run() {
  console.log('====================================================');
  console.log('🚀 PENGIMPOR DATA SEKOLAH RESMI KKA RADAR KEDIRI');
  console.log('====================================================');

  const rawDir = path.resolve('src/data/raw-sekolah');
  if (!fs.existsSync(rawDir)) {
    console.error('❌ Folder src/data/raw-sekolah tidak ditemukan.');
    process.exit(1);
  }

  const targetArg = process.argv[2];
  let files = fs.readdirSync(rawDir).filter(f => f.endsWith('.json'));
  if (targetArg) {
    const match = files.find(f => f.toLowerCase() === targetArg.toLowerCase() || f.toLowerCase().includes(targetArg.toLowerCase()));
    if (match) {
      files = [match];
      console.log(`🎯 Menargetkan spesifik file: ${match}`);
    } else {
      console.warn(`⚠️ Argumen "${targetArg}" tidak cocok dengan file manapun. Memproses semua file.`);
    }
  }
  if (files.length === 0) {
    console.log('⚠️ Belum ada file .json di src/data/raw-sekolah/');
    process.exit(0);
  }

  // Siapkan Supabase client jika ada env
  const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY;
  let supabase = null;
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }

  // Load existing schools.ts
  const schoolsFilePath = path.resolve('src/data/schools.ts');
  let currentSchoolsCode = fs.readFileSync(schoolsFilePath, 'utf-8');

  // Ekstrak objek SCHOOL_DATABASE yang ada saat ini
  let currentSchoolDatabase = {};
  try {
    const backupFilePath = path.resolve('src/data/schools.backup.ts');
    if (!fs.existsSync(backupFilePath)) {
      fs.copyFileSync(schoolsFilePath, backupFilePath);
      console.log('📦 Backup schools.ts dibuat di src/data/schools.backup.ts');
    }

    // Parsing current database secara dinamis
    const startIdx = currentSchoolsCode.indexOf('export const SCHOOL_DATABASE: SchoolDatabase =');
    if (startIdx !== -1) {
      const jsonStart = currentSchoolsCode.indexOf('{', startIdx);
      const jsonEnd = currentSchoolsCode.lastIndexOf('};');
      const objStr = currentSchoolsCode.slice(jsonStart, jsonEnd + 1);
      // Gunakan Function constructor agar aman membaca object literal TS/JS
      currentSchoolDatabase = new Function(`return (${objStr});`)();
    }
  } catch (err) {
    console.warn('⚠️ Gagal membaca SCHOOL_DATABASE sebelumnya, inisialisasi kosong:', err.message);
  }

  // Proses setiap file JSON
  for (const file of files) {
    console.log(`\n📄 Memproses file: ${file}`);
    const filePath = path.join(rawDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    let rawList = [];
    try {
      rawList = JSON.parse(content);
    } catch (e) {
      console.error(`❌ Gagal membaca JSON dari ${file}:`, e.message);
      continue;
    }

    if (!Array.isArray(rawList) || rawList.length === 0) {
      console.warn(`⚠️ File ${file} kosong atau bukan array.`);
      continue;
    }

    // Jalankan audit anomali mendalam terlebih dahulu
    const auditResult = auditFile(filePath);

    const region = detectRegion(file, rawList[0]);
    console.log(`📍 Wilayah terdeteksi: ${region.name} (${region.slug})`);
    console.log(`📊 Jumlah data sekolah di file: ${rawList.length}`);

    const normalizedSchools = [];
    const districtsData = {};
    const jenjangCount = { sd: 0, smp: 0, sma: 0 };
    const seenNames = new Set();

    rawList.forEach((item, index) => {
      const rawNama = (item.nama || '').trim();
      if (!rawNama) return;

      // Normalisasi nama kecamatan
      let kec = (item.kecamatan || 'Lainnya').trim();
      const kecKey = kec.toLowerCase();
      if (KECAMATAN_CLEANUP[kecKey]) {
        kec = KECAMATAN_CLEANUP[kecKey];
      } else {
        kec = capitalizeWords(kec);
      }

      const jenjang = normalizeJenjang(item.jenjang);
      jenjangCount[jenjang]++;

      // Struktur untuk schools.ts
      if (!districtsData[kec]) {
        districtsData[kec] = { sd: [], smp: [], sma: [] };
      }

      // Hindari duplikat nama persis di kecamatan dan jenjang yang sama
      const uniqueKey = `${kec}|${jenjang}|${rawNama.toUpperCase()}`;
      if (!seenNames.has(uniqueKey)) {
        seenNames.add(uniqueKey);
        districtsData[kec][jenjang].push(rawNama);
      }

      // Struktur untuk Supabase
      const recordId = `sch_${region.slug}_${item.id || index + 1}`;
      normalizedSchools.push({
        id: recordId,
        region_slug: region.slug,
        region_name: region.name,
        kecamatan: kec,
        jenjang: jenjang,
        nama_sekolah: rawNama,
        is_custom: false,
        updated_at: new Date().toISOString()
      });
    });

    console.log(`✅ Normalisasi selesai:`);
    console.log(`   - SD/MI     : ${jenjangCount.sd}`);
    console.log(`   - SMP/MTs   : ${jenjangCount.smp}`);
    console.log(`   - SMA/SMK/MA: ${jenjangCount.sma}`);
    console.log(`   - Total Unik: ${normalizedSchools.length}`);
    console.log(`   - Kecamatan : ${Object.keys(districtsData).length} kecamatan (${Object.keys(districtsData).sort().join(', ')})`);

    // Urutkan nama sekolah dalam setiap kecamatan
    for (const kec of Object.keys(districtsData)) {
      districtsData[kec].sd.sort((a, b) => a.localeCompare(b, 'id'));
      districtsData[kec].smp.sort((a, b) => a.localeCompare(b, 'id'));
      districtsData[kec].sma.sort((a, b) => a.localeCompare(b, 'id'));
    }

    // Urutkan kunci kecamatan secara alfabetis
    const sortedDistricts = {};
    Object.keys(districtsData).sort().forEach(k => {
      sortedDistricts[k] = districtsData[k];
    });

    // Update currentSchoolDatabase
    currentSchoolDatabase[region.slug] = {
      name: region.name,
      districts: sortedDistricts
    };

    // 1. Simpan ke Supabase Cloud (Batch per 100)
    if (supabase) {
      console.log(`\n☁️ Menyinkronkan ke Supabase Cloud (tabel: schools)...`);
      const batchSize = 100;
      let successCount = 0;
      let failCount = 0;

      for (let i = 0; i < normalizedSchools.length; i += batchSize) {
        const batch = normalizedSchools.slice(i, i + batchSize);
        const { error } = await supabase.from('schools').upsert(batch, { onConflict: 'id' });
        if (error) {
          console.error(`   ❌ Batch ${i + 1} - ${i + batch.length} gagal:`, error.message);
          failCount += batch.length;
        } else {
          successCount += batch.length;
          process.stdout.write(`   ✓ Tersinkron: ${successCount}/${normalizedSchools.length}\r`);
        }
      }
      console.log(`\n   🎉 Selesai sinkronisasi Supabase! Berhasil: ${successCount}, Gagal: ${failCount}`);
    } else {
      console.log('⚠️ Supabase credentials tidak ditemukan di .env, lewati sinkronisasi cloud.');
    }

    // 2. Buat file SQL Dump cadangan
    const sqlPath = path.resolve(`supabase/migrations/seed_schools_${region.slug}.sql`);
    const sqlStatements = [
      `-- Seed data sekolah ${region.name} (${normalizedSchools.length} sekolah)`,
      `-- Jalankan di Supabase Dashboard -> SQL Editor jika diperlukan`,
      `INSERT INTO public.schools (id, region_slug, region_name, kecamatan, jenjang, nama_sekolah, is_custom)`,
      `VALUES`
    ];

    const valueRows = normalizedSchools.map(s => {
      const escape = str => str.replace(/'/g, "''");
      return `  ('${s.id}', '${s.region_slug}', '${escape(s.region_name)}', '${escape(s.kecamatan)}', '${s.jenjang}', '${escape(s.nama_sekolah)}', false)`;
    });

    const fullSql = `${sqlStatements.join('\n')}\n${valueRows.join(',\n')}\nON CONFLICT (id) DO UPDATE SET\n  nama_sekolah = EXCLUDED.nama_sekolah,\n  kecamatan = EXCLUDED.kecamatan,\n  jenjang = EXCLUDED.jenjang;\n`;
    fs.writeFileSync(sqlPath, fullSql, 'utf-8');
    console.log(`💾 File SQL Migration cadangan dibuat: supabase/migrations/seed_schools_${region.slug}.sql`);
  }

  // 3. Tulis ulang src/data/schools.ts dengan data yang sudah di-merge
  console.log(`\n📝 Memperbarui database lokal: src/data/schools.ts ...`);
  const newSchoolsCode = `/**
 * Database Data Wilayah, Kecamatan, dan Sekolah KKA Radar Kediri 2026
 * Meliputi 7 Kabupaten/Kota di wilayah kerja Jawa Pos Radar Kediri.
 * File ini digenerate secara otomatis oleh scripts/import_schools.mjs
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

export const SCHOOL_DATABASE: SchoolDatabase = ${JSON.stringify(currentSchoolDatabase, null, 2)};
`;

  fs.writeFileSync(schoolsFilePath, newSchoolsCode, 'utf-8');
  console.log(`🎉 src/data/schools.ts berhasil diperbarui!`);
  console.log('====================================================\n');
}

run().catch(err => {
  console.error('❌ Terjadi kesalahan:', err);
  process.exit(1);
});
