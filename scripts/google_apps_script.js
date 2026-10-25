/**
 * ====================================================================
 * GOOGLE APPS SCRIPT: SINKRONISASI PENDAFTARAN KKA RADAR KEDIRI 2026
 * ====================================================================
 * 
 * Skrip ini dipasang pada Google Spreadsheet panitia untuk menerima
 * data pendaftaran (Mandiri & Kolektif) dari website secara real-time.
 * 
 * FITUR:
 * 1. Otomatis membuat baris baru untuk setiap siswa terdaftar.
 * 2. Mencatat ke tab master "Semua Pendaftar" dan tab spesifik per Wilayah.
 * 3. Otomatis membuat Header kolom jika tab masih kosong.
 * 4. Proteksi Concurrency (LockService) agar data tidak saling tumpuk saat diakses bersamaan.
 */

const HEADERS = [
  'Waktu Daftar',
  'Kode Registrasi',
  'Tipe',
  'Nama Sekolah',
  'Wilayah',
  'Kecamatan',
  'Jenjang',
  'Nama Siswa',
  'NISN',
  'Gender',
  'Kelas',
  'No. WhatsApp PJ',
  'Total Biaya',
  'Status Pembayaran',
  'Link Bukti Transfer'
];

/**
 * Endpoint Pengujian (GET)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'Google Apps Script KKA Radar Kediri 2026 Aktif & Siap Menerima Data.'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Endpoint Penerima Data Form Website (POST)
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  // Kunci eksekusi selama maks 30 detik untuk mencegah race condition
  lock.waitLock(30000);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Tidak ada payload data yang diterima.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const payload = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const timestamp = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");

    // Ambil metadata pendaftaran
    const kodeReg = payload.kode || '-';
    const tipe = payload.tipe || 'mandiri';
    const sekolah = payload.sekolah || '-';
    const wilayah = payload.wilayah || 'Umum';
    const kecamatan = payload.kecamatan || '-';
    const jenjang = payload.jenjang || '-';
    const waPJ = payload.waPJ || '-';
    const totalBiaya = payload.totalBiaya || 0;
    const statusBayar = payload.statusBayar || 'Menunggu Verifikasi';
    const buktiBayarUrl = payload.buktiBayarUrl || '-';

    // Daftar peserta (array siswa)
    const students = Array.isArray(payload.students) && payload.students.length > 0 
      ? payload.students 
      : [{
          nama: payload.namaSiswa || '-',
          nisn: payload.nisn || '-',
          gender: payload.gender || '-',
          kelas: payload.kelas || '-'
        }];

    // Siapkan baris data yang akan dimasukkan
    const rowsToAdd = students.map(s => [
      timestamp,
      kodeReg,
      tipe.toUpperCase(),
      sekolah,
      wilayah,
      kecamatan,
      jenjang,
      s.nama || s.name || '-',
      s.nisn ? `'${s.nisn}` : '-', // Kutip agar NISN berawalan 0 tidak hilang
      s.gender || '-',
      s.kelas || s.sClass || '-',
      waPJ ? `'${waPJ}` : '-',
      totalBiaya,
      statusBayar,
      buktiBayarUrl
    ]);

    // 1. Catat ke Tab Master: "Semua Pendaftar"
    const masterSheet = getOrCreateSheet(ss, "Semua Pendaftar");
    appendRowsWithFormatting(masterSheet, rowsToAdd);

    // 2. Catat juga ke Tab Spesifik Wilayah (contoh: "Kabupaten Nganjuk")
    if (wilayah && wilayah !== 'Umum') {
      const regionSheet = getOrCreateSheet(ss, cleanSheetName(wilayah));
      appendRowsWithFormatting(regionSheet, rowsToAdd);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data pendaftaran berhasil disimpan ke Google Spreadsheet.',
      kode: kodeReg,
      totalSiswa: students.length
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    // Lepaskan kunci
    lock.releaseLock();
  }
}

/**
 * Helper: Ambil atau buat Sheet baru lengkap dengan Header
 */
function getOrCreateSheet(ss, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    // Tambahkan header
    sheet.appendRow(HEADERS);
    // Format Header (Background Navy, Teks Putih Tebal)
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground('#0f2d59');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Helper: Menambahkan baris ke sheet
 */
function appendRowsWithFormatting(sheet, rows) {
  if (!rows || rows.length === 0) return;
  const startRow = sheet.getLastRow() + 1;
  const range = sheet.getRange(startRow, 1, rows.length, HEADERS.length);
  range.setValues(rows);
}

/**
 * Helper: Bersihkan nama sheet (maks 30 karakter)
 */
function cleanSheetName(name) {
  return String(name).replace(/[\/\\\?\*\[\]]/g, '').substring(0, 30).trim();
}
