/**
 * ====================================================================
 * GOOGLE APPS SCRIPT: SINKRONISASI PENDAFTARAN KKA RADAR KEDIRI 2026
 * ====================================================================
 * 
 * Skrip ini dipasang pada Google Spreadsheet panitia untuk menerima
 * dan memperbarui data pendaftaran (Mandiri & Kolektif) dari website secara real-time.
 * 
 * FITUR:
 * 1. Otomatis membuat baris baru saat peserta mendaftar di web.
 * 2. Otomatis MEMPERBARUI Status Pembayaran (LUNAS / Ditolak) saat admin memverifikasi di CMS.
 * 3. Menyimpan Catatan Penolakan/Revisi jika berkas ditolak admin.
 * 4. Mencatat ke tab master "Semua Pendaftar" dan tab spesifik per Wilayah.
 * 5. Proteksi Concurrency (LockService) agar data tidak saling tumpuk saat diakses bersamaan.
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
  'Link Bukti Transfer',
  'Catatan Admin'
];

/**
 * Endpoint Pengujian (GET)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'Google Apps Script KKA Radar Kediri 2026 Aktif & Siap Menerima Data / Update Status.'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Endpoint Penerima Data & Pembaruan Status (POST)
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

    // ===================================================================
    // AKSI 1: UPDATE STATUS PEMBAYARAN & CATATAN OLEH ADMIN (REAL-TIME)
    // ===================================================================
    if (payload.action === 'update_status') {
      const targetKode = String(payload.kode || '').trim();
      const newStatus = payload.statusBayar || payload.status || 'Lunas';
      const catatan = payload.catatan || '';

      if (!targetKode) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Kode registrasi tidak ditemukan dalam payload.'
        })).setMimeType(ContentService.MimeType.JSON);
      }

      const allSheets = ss.getSheets();
      let totalUpdated = 0;

      for (let i = 0; i < allSheets.length; i++) {
        totalUpdated += updateStatusInSheet(allSheets[i], targetKode, newStatus, catatan);
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Status pembayaran berhasil diperbarui di Google Spreadsheet.',
        kode: targetKode,
        statusBayar: newStatus,
        barisTerupdate: totalUpdated
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // ===================================================================
    // AKSI 2: INPUT PENDAFTARAN BARU DARI FORMULIR WEBSITE
    // ===================================================================
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
    const catatanAwal = payload.catatan || '-';

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
      buktiBayarUrl,
      catatanAwal
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
 * Helper: Mencari baris dengan Kode Registrasi dan mengubah Status Pembayaran serta Catatan
 */
function updateStatusInSheet(sheet, targetKode, newStatus, catatan) {
  if (!sheet) return 0;
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return 0;

  const range = sheet.getDataRange();
  const values = range.getValues();
  let count = 0;

  // Header baris 1 (indeks 0).
  // Kolom 2: Kode Registrasi (indeks 1).
  // Kolom 14: Status Pembayaran (indeks 13).
  // Kolom 16: Catatan Admin (indeks 15).
  for (let r = 1; r < values.length; r++) {
    const rowKode = String(values[r][1] || '').trim();
    if (rowKode && rowKode.toLowerCase() === targetKode.toLowerCase()) {
      const rowIndex = r + 1;

      // Update Kolom 14: Status Pembayaran
      const statusCell = sheet.getRange(rowIndex, 14);
      statusCell.setValue(newStatus);

      // Beri warna latar belakang indikator
      const stLower = String(newStatus).toLowerCase();
      if (stLower.includes('lunas')) {
        statusCell.setBackground('#dcfce7'); // Hijau muda
        statusCell.setFontColor('#15803d');
        statusCell.setFontWeight('bold');
      } else if (stLower.includes('tolak')) {
        statusCell.setBackground('#fee2e2'); // Merah muda
        statusCell.setFontColor('#b91c1c');
        statusCell.setFontWeight('bold');
      }

      // Update Kolom 16: Catatan Admin
      if (catatan !== undefined && catatan !== null) {
        if (sheet.getLastColumn() < 16) {
          const catHeader = sheet.getRange(1, 16);
          catHeader.setValue('Catatan Admin');
          catHeader.setFontWeight('bold');
          catHeader.setBackground('#0f2d59');
          catHeader.setFontColor('#ffffff');
        }
        sheet.getRange(rowIndex, 16).setValue(catatan);
      }

      count++;
    }
  }

  return count;
}

/**
 * Helper: Bersihkan nama sheet (maks 30 karakter)
 */
function cleanSheetName(name) {
  return String(name).replace(/[\/\\\?\*\[\]]/g, '').substring(0, 30).trim();
}
