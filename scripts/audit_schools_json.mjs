import fs from 'fs';
import path from 'path';

// Daftar Kecamatan Resmi Berdasarkan Kemendagri / BPS
const OFFICIAL_KECAMATAN = {
  'kabupaten-blitar': [
    'Bakung', 'Binangun', 'Doko', 'Gandusari', 'Garum', 'Kademangan', 'Kanigoro',
    'Kesamben', 'Nglegok', 'Panggungrejo', 'Ponggok', 'Sanankulon', 'Selopuro',
    'Selorejo', 'Srengat', 'Sutojayan', 'Talun', 'Udanawu', 'Wates', 'Wlingi',
    'Wonodadi', 'Wonotirto'
  ],
  'kota-blitar': [
    'Kepanjenkidul', 'Sananwetan', 'Sukorejo'
  ],
  'kabupaten-kediri': [
    'Badas', 'Banyakan', 'Gampengrejo', 'Grogol', 'Gurah', 'Kandangan', 'Kandat',
    'Kayen Kidul', 'Kepung', 'Kras', 'Kunjang', 'Mojo', 'Ngadiluwih', 'Ngancar',
    'Ngasem', 'Pagu', 'Papar', 'Pare', 'Plemahan', 'Plosoklaten', 'Puncu',
    'Purwoasri', 'Ringinrejo', 'Semen', 'Tarokan', 'Wates'
  ],
  'kota-kediri': [
    'Kediri', 'Mojoroto', 'Pesantren'
  ],
  'kabupaten-nganjuk': [
    'Bagor', 'Baron', 'Berbek', 'Gondang', 'Jatikalen', 'Kertosono', 'Lengkong',
    'Loceret', 'Nganjuk', 'Ngetos', 'Ngluyu', 'Ngronggot', 'Pace', 'Patianrowo',
    'Prambon', 'Rejoso', 'Sawahan', 'Sukomoro', 'Tanjunganom', 'Wilangan'
  ],
  'kabupaten-tulungagung': [
    'Bandung', 'Besuki', 'Boyolangu', 'Campurdarat', 'Gondang', 'Kalidawir', 'Karangrejo',
    'Kauman', 'Kedungwaru', 'Ngantru', 'Ngunut', 'Pagerwojo', 'Pakel', 'Pucanglaban',
    'Rejotangan', 'Sendang', 'Sumbergempol', 'Tanggunggunung', 'Tulungagung'
  ],
  'kabupaten-trenggalek': [
    'Bendungan', 'Dongko', 'Durenan', 'Gandusari', 'Kampak', 'Karangan',
    'Munjungan', 'Panggul', 'Pogalan', 'Pule', 'Suruh', 'Trenggalek', 'Tugu',
    'Watulimo'
  ]
};

function capitalizeWords(str) {
  if (!str) return '';
  return str.toString().trim().replace(/\b\w+/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export function auditFile(filePath) {
  const fileName = path.basename(filePath);
  console.log('\n======================================================');
  console.log(`🔍 AUDIT ANOMALI DATA: ${fileName}`);
  console.log('======================================================');

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File ${filePath} tidak ditemukan.`);
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  let data = [];
  try {
    data = JSON.parse(raw);
  } catch (err) {
    console.error(`❌ File bukan JSON valid:`, err.message);
    return null;
  }

  console.log(`📊 Total Baris: ${data.length}`);

  // 1. Audit Wilayah
  const wilayahMap = new Map();
  data.forEach((row, idx) => {
    const w = row.Wilayah || row.wilayah || '(KOSONG)';
    if (!wilayahMap.has(w)) wilayahMap.set(w, []);
    wilayahMap.get(w).push(idx + 1);
  });

  console.log('\n📍 Nilai Kolom Wilayah:');
  wilayahMap.forEach((indices, w) => {
    console.log(`   - "${w}": ${indices.length} baris`);
  });

  // 2. Audit Jenjang
  const jenjangMap = new Map();
  data.forEach((row, idx) => {
    const j = row.jenjang || '(KOSONG)';
    if (!jenjangMap.has(j)) jenjangMap.set(j, []);
    jenjangMap.get(j).push(idx + 1);
  });

  console.log('\n🏫 Nilai Kolom Jenjang:');
  jenjangMap.forEach((indices, j) => {
    console.log(`   - "${j}": ${indices.length} baris`);
  });

  // 3. Audit Kecamatan
  const kecamatanMap = new Map();
  const rawKecSet = new Set();
  data.forEach((row, idx) => {
    const rawKec = row.kecamatan || '(KOSONG)';
    rawKecSet.add(rawKec);
    const normKec = capitalizeWords(rawKec);
    if (!kecamatanMap.has(normKec)) kecamatanMap.set(normKec, 0);
    kecamatanMap.set(normKec, kecamatanMap.get(normKec) + 1);
  });

  console.log(`\n🗺️ Kecamatan Ditemukan (${kecamatanMap.size} unik setelah Title Case):`);
  Array.from(kecamatanMap.keys()).sort().forEach(k => {
    console.log(`   - ${k.padEnd(20)}: ${kecamatanMap.get(k)} sekolah`);
  });

  // 4. Deteksi Anomali
  console.log('\n⚠️ PEMERIKSAAN ANOMALI:');
  const anomalies = [];

  // 4a. Cek baris tanpa nama sekolah
  const emptyName = data.filter((row, idx) => !row.nama || String(row.nama).trim() === '');
  if (emptyName.length > 0) {
    anomalies.push(`❌ Ada ${emptyName.length} baris tanpa nama sekolah!`);
  } else {
    console.log('   ✓ Semua baris memiliki nama sekolah yang valid.');
  }

  // 4b. Cek duplikasi persis
  const seenExact = new Set();
  const exactDuplicates = [];
  data.forEach((row, idx) => {
    const key = `${row.nama}|${row.kecamatan}|${row.jenjang}`.toUpperCase().trim();
    if (seenExact.has(key)) {
      exactDuplicates.push({ index: idx + 1, nama: row.nama, kecamatan: row.kecamatan });
    } else {
      seenExact.add(key);
    }
  });

  if (exactDuplicates.length > 0) {
    anomalies.push(`⚠️ Ditemukan ${exactDuplicates.length} baris duplikat persis.`);
    console.log(`   ⚠️ Duplikat persis: ${exactDuplicates.length} data`);
    exactDuplicates.slice(0, 5).forEach(d => {
      console.log(`      Baris ${d.index}: "${d.nama}" (${d.kecamatan})`);
    });
  } else {
    console.log('   ✓ Tidak ada duplikat persis (100% unik).');
  }

  // 4c. Cek kecocokan kecamatan dengan referensi resmi jika terdeteksi wilayahnya
  let matchedRegionSlug = null;
  const fileNameLower = fileName.toLowerCase();
  for (const slug of Object.keys(OFFICIAL_KECAMATAN)) {
    const namePart = slug.replace('kabupaten-', '').replace('kota-', '');
    const isKota = slug.startsWith('kota');
    if (fileNameLower.includes(namePart)) {
      if (isKota && fileNameLower.includes('kota')) matchedRegionSlug = slug;
      if (!isKota && (fileNameLower.includes('kab') || !fileNameLower.includes('kota'))) matchedRegionSlug = slug;
    }
  }

  if (matchedRegionSlug && OFFICIAL_KECAMATAN[matchedRegionSlug]) {
    const officialList = OFFICIAL_KECAMATAN[matchedRegionSlug];
    const detectedList = Array.from(kecamatanMap.keys());
    const unknownKec = detectedList.filter(k => !officialList.map(o => o.toLowerCase()).includes(k.toLowerCase()));
    const missingKec = officialList.filter(o => !detectedList.map(k => k.toLowerCase()).includes(o.toLowerCase()));

    console.log(`\n📋 Perbandingan dengan Kecamatan Resmi (${matchedRegionSlug}):`);
    console.log(`   - Total resmi Kemendagri : ${officialList.length} kecamatan`);
    console.log(`   - Ditemukan di file     : ${detectedList.length} kecamatan`);

    if (unknownKec.length > 0) {
      anomalies.push(`⚠️ Kecamatan tidak dikenal/berbeda ejaan: ${unknownKec.join(', ')}`);
      console.log(`   ❌ Kecamatan tidak dikenal di wilayah ini:`, unknownKec);
    } else {
      console.log(`   ✓ Semua kecamatan cocok dengan data resmi!`);
    }

    if (missingKec.length > 0) {
      console.log(`   ℹ️ Kecamatan resmi yang belum ada sekolahnya di file:`, missingKec);
    }
  }

  console.log('======================================================\n');
  return {
    fileName,
    totalRows: data.length,
    wilayah: Array.from(wilayahMap.keys()),
    jenjang: Object.fromEntries(jenjangMap),
    kecamatan: Object.fromEntries(kecamatanMap),
    anomalies
  };
}

// Jalankan dari command line jika dipanggil langsung
if (process.argv[1]?.endsWith('audit_schools_json.mjs')) {
  const target = process.argv[2];
  const rawDir = path.resolve('src/data/raw-sekolah');
  if (target) {
    const p = path.isAbsolute(target) ? target : path.join(rawDir, target);
    auditFile(p);
  } else {
    const files = fs.readdirSync(rawDir).filter(f => f.endsWith('.json'));
    files.forEach(f => auditFile(path.join(rawDir, f)));
  }
}
