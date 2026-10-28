import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseTemplatesDir = path.join(__dirname, '..', 'public', 'templates', 'kolektif');

const schoolsTs = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'schools.ts'), 'utf-8');

// Parse JSON from SCHOOL_DATABASE
const jsonStart = schoolsTs.indexOf('export const SCHOOL_DATABASE: SchoolDatabase = ') + 'export const SCHOOL_DATABASE: SchoolDatabase = '.length;
const jsonEnd = schoolsTs.lastIndexOf('};') + 1;
const jsonStr = schoolsTs.substring(jsonStart, jsonEnd).trim();
const SCHOOL_DATABASE = JSON.parse(jsonStr);

console.log('Database Wilayah loaded:', Object.keys(SCHOOL_DATABASE));

const regionMapping = {
  'kabupaten-kediri': { name: 'Kabupaten Kediri', folder: 'Kolektif Kabupaten Kediri' },
  'kota-kediri': { name: 'Kota Kediri', folder: 'Kolektif Kota Kediri' },
  'kabupaten-nganjuk': { name: 'Kabupaten Nganjuk', folder: 'Kolektif Kabupaten Nganjuk' },
  'kabupaten-blitar': { name: 'Kabupaten Blitar', folder: 'Kolektif Kabupaten Blitar' },
  'kota-blitar': { name: 'Kota Blitar', folder: 'Kolektif Kota Blitar' },
  'kabupaten-tulungagung': { name: 'Kabupaten Tulungagung', folder: 'Kolektif Kabupaten Tulungagung' },
  'kabupaten-trenggalek': { name: 'Kabupaten Trenggalek', folder: 'Kolektif Kabupaten Trenggalek' }
};

const jenjangConfig = [
  { key: 'sd', label: 'SD-MI', regex: /(sd[- ]?mi)/i },
  { key: 'smp', label: 'SMP-MTs', regex: /(smp[- ]?mts?)/i },
  { key: 'sma', label: 'SMA-MA-SMK', regex: /(sma[- ]?ma[- ]?smk)/i }
];

console.log('\n======================================================');
console.log('AUDIT KELENGKAPAN TEMPLATE EXCEL KOLEKTIF KKA 2026');
console.log('======================================================');

let totalExpected = 0;
let totalFound = 0;
const missingTemplates = [];
const extraTemplates = [];
const namingAnomalies = [];

for (const [slug, meta] of Object.entries(regionMapping)) {
  const dbRegion = SCHOOL_DATABASE[slug];
  if (!dbRegion) {
    console.error(`Slug ${slug} tidak ditemukan di database!`);
    continue;
  }

  const kecListDb = Object.keys(dbRegion.districts || {}).sort((a, b) => a.localeCompare(b, 'id'));
  const regFolder = path.join(baseTemplatesDir, meta.folder);

  console.log(`\n📌 [${meta.name}]`);
  console.log(`   Kecamatan Terdaftar di DB : ${kecListDb.length} Kecamatan`);

  if (!fs.existsSync(regFolder)) {
    console.log(`   ❌ Folder tidak ditemukan: ${meta.folder}`);
    missingTemplates.push(`Folder ${meta.folder} tidak ada.`);
    continue;
  }

  // Get all files recursively
  function getAllFiles(dir) {
    let files = [];
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, item.name);
      if (item.isDirectory()) {
        files = files.concat(getAllFiles(p));
      } else if (item.name.endsWith('.xlsx')) {
        files.push({ name: item.name, path: p, relative: path.relative(regFolder, p) });
      }
    }
    return files;
  }

  const filesInRegion = getAllFiles(regFolder);
  console.log(`   Total File Excel Ditemukan: ${filesInRegion.length} file`);

  // Count files per jenjang in folder
  const sdFiles = filesInRegion.filter(f => /(sd[- ]?mi)/i.test(f.name));
  const smpFiles = filesInRegion.filter(f => /(smp[- ]?mts?)/i.test(f.name));
  const smaFiles = filesInRegion.filter(f => /(sma[- ]?ma[- ]?smk)/i.test(f.name));

  console.log(`   - File SD-MI       : ${sdFiles.length} file`);
  console.log(`   - File SMP-MTs     : ${smpFiles.length} file`);
  console.log(`   - File SMA-MA-SMK  : ${smaFiles.length} file`);

  // Check each kecamatan and jenjang
  for (const kec of kecListDb) {
    for (const j of jenjangConfig) {
      totalExpected++;
      
      // Matching logic
      const matched = filesInRegion.find(f => {
        const n = f.name.toLowerCase();
        if (!j.regex.test(n)) return false;

        const kecLow = kec.toLowerCase();
        if (n.includes(kecLow)) return true;

        // Special normalization
        if (kecLow === 'kota' && n.includes('kota kediri')) return true;
        if (kecLow === 'kandat' && n.includes('kandat')) return true;

        return false;
      });

      if (matched) {
        totalFound++;
      } else {
        missingTemplates.push({
          region: meta.name,
          jenjang: j.label,
          kecamatan: kec
        });
      }
    }
  }

  // Check if any extra files exist in folder that don't match any DB kecamatan
  for (const f of filesInRegion) {
    const fLow = f.name.toLowerCase();
    const matchedKec = kecListDb.find(kec => {
      const k = kec.toLowerCase();
      if (fLow.includes(k)) return true;
      if (k === 'kota' && fLow.includes('kota kediri')) return true;
      return false;
    });

    if (!matchedKec) {
      extraTemplates.push({
        region: meta.name,
        file: f.relative
      });
    }

    // Check naming convention: e.g. "SMP-MTS" vs "SMP MTS" vs "SMP-MTs"
    if (f.name.includes('SMP MTS')) {
      namingAnomalies.push({
        region: meta.name,
        file: f.name,
        reason: 'Menggunakan spasi "SMP MTS" (bukan "SMP-MTs" atau "SMP-MTS")'
      });
    }
  }
}

console.log('\n======================================================');
console.log(`HASIL AUDIT KESELURUHAN:`);
console.log(`- Total Template yang Diharapkan (DB) : ${totalExpected}`);
console.log(`- Total Template Cocok Ditemukan      : ${totalFound} (${((totalFound/totalExpected)*100).toFixed(1)}%)`);
console.log(`- Template Kurang / Belum Ada         : ${missingTemplates.length}`);
console.log(`- File Template Tambahan / Berlebih   : ${extraTemplates.length}`);
console.log(`- File dengan Format Penamaan Unik    : ${namingAnomalies.length}`);
console.log('======================================================');

if (missingTemplates.length > 0) {
  console.log('\n❌ DAFTAR TEMPLATE YANG BELUM ADA DI FOLDER:');
  missingTemplates.forEach((m, i) => {
    console.log(`   ${i + 1}. [${m.region}] Jenjang ${m.jenjang} - Kecamatan ${m.kecamatan}`);
  });
}

if (extraTemplates.length > 0) {
  console.log('\n⚠️ DAFTAR FILE EKSTRA (TIDAK ADA DI DAFTAR KECAMATAN DB):');
  extraTemplates.forEach((e, i) => {
    console.log(`   ${i + 1}. [${e.region}] ${e.file}`);
  });
}

if (namingAnomalies.length > 0) {
  console.log('\nℹ️ DAFTAR FILE DENGAN VARIASI SPASI "SMP MTS" (TETAP BISA TERBACA DENGAN NORMALISASI):');
  namingAnomalies.forEach((a, i) => {
    console.log(`   ${i + 1}. [${a.region}] ${a.file}`);
  });
}
