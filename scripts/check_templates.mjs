import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseTemplatesDir = path.join(__dirname, '..', 'public', 'templates', 'kolektif');

// Import SCHOOL_DATABASE from dist or parse src/data/schools.ts or import it directly
// Since schools.ts is TypeScript, let's extract district and kecamatan from src/data/schools.ts
const schoolsTs = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'schools.ts'), 'utf-8');

// Also check DISTRICTS from competition.ts
const competitionTs = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'competition.ts'), 'utf-8');

console.log('Scanning directory:', baseTemplatesDir);

function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

const allFiles = getFilesRecursively(baseTemplatesDir);
console.log(`Total files found in public/templates/kolektif: ${allFiles.length}`);

// Filter out "Kolektif KKA Kabupaten Blitar"
const validFiles = allFiles.filter(f => !f.includes('Kolektif KKA Kabupaten Blitar') && f.endsWith('.xlsx'));
console.log(`Total .xlsx files (excluding ignored folder): ${validFiles.length}`);

// Group by region folder and subfolders
const regionFolders = fs.readdirSync(baseTemplatesDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name !== 'Kolektif KKA Kabupaten Blitar');

const summary = {};

for (const rf of regionFolders) {
  const regPath = path.join(baseTemplatesDir, rf.name);
  summary[rf.name] = {};
  const subdirs = fs.readdirSync(regPath, { withFileTypes: true }).filter(d => d.isDirectory());
  for (const sd of subdirs) {
    const subPath = path.join(regPath, sd.name);
    const files = fs.readdirSync(subPath).filter(f => f.endsWith('.xlsx'));
    summary[rf.name][sd.name] = files;
  }
}

console.log('\n--- RINGKASAN FILE PER WILAYAH & JENJANG ---');
for (const [region, levels] of Object.entries(summary)) {
  console.log(`\n📁 ${region}`);
  let totalRegionFiles = 0;
  for (const [lvl, files] of Object.entries(levels)) {
    console.log(`   📂 ${lvl}: ${files.length} file`);
    totalRegionFiles += files.length;
    if (files.length <= 5) {
      files.forEach(f => console.log(`      - ${f}`));
    } else {
      console.log(`      - Contoh: ${files[0]}`);
      console.log(`      - Contoh: ${files[1]}`);
      console.log(`      ... total ${files.length} file kecamatan`);
    }
  }
  console.log(`   -> Total file ${region}: ${totalRegionFiles}`);
}
