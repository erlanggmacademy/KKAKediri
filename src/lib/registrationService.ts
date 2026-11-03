import { supabase } from './supabase';

export interface StudentItem {
  nama: string;
  nisn: string;
  gender: string;
  kelas: string;
}

export interface RegistrationData {
  kode: string;
  tipe: 'mandiri' | 'kolektif';
  wilayah: string;
  kecamatan: string;
  sekolah: string;
  jenjang: string;
  namaKontak?: string;
  hpKontak: string;
  totalBiaya: number;
  students: StudentItem[];
  proofFile?: File | null;
}

/**
 * Upload Bukti Transfer ke Supabase Storage Bucket 'bukti-transfer'
 */
export async function uploadPaymentProof(file: File, kodeReg: string): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const filePath = `${kodeReg}-${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('bukti-transfer')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.warn('[Supabase Storage] Gagal upload:', error.message);
      return '';
    }

    const { data: publicUrlData } = supabase.storage
      .from('bukti-transfer')
      .getPublicUrl(filePath);

    return publicUrlData?.publicUrl || '';
  } catch (err) {
    console.warn('[Supabase Storage] Exception upload:', err);
    return '';
  }
}

/**
 * Simpan Data Pendaftaran Ganda: Supabase Database + Google Apps Script (Spreadsheet)
 */
export async function processRegistration(data: RegistrationData): Promise<{ success: boolean; kode: string }> {
  let buktiUrl = '';

  // 1. Upload Bukti Transfer jika ada file
  if (data.proofFile) {
    buktiUrl = await uploadPaymentProof(data.proofFile, data.kode);
  }

  // 2. Simpan Transaksi Induk ke Supabase Table 'registrations'
  let regId = '';
  try {
    const { data: reg, error: regError } = await supabase
      .from('registrations')
      .insert({
        kode: data.kode,
        tipe: data.tipe,
        wilayah: data.wilayah,
        kecamatan: data.kecamatan,
        sekolah: data.sekolah,
        jenjang: data.jenjang,
        nama_kontak: data.namaKontak || (data.students[0] ? data.students[0].nama : '-'),
        hp_kontak: data.hpKontak,
        total_biaya: data.totalBiaya,
        bukti_bayar_url: buktiUrl,
        status: 'menunggu',
        synced_to_sheet: false
      })
      .select('id')
      .single();

    if (regError) {
      console.warn('[Supabase DB] Registrations insert warning:', regError.message);
    } else if (reg) {
      regId = reg.id;
    }
  } catch (dbErr) {
    console.warn('[Supabase DB] Exception insert registrations:', dbErr);
  }

  // 3. Simpan Data Siswa ke Supabase Table 'participants'
  if (regId && data.students.length > 0) {
    try {
      const participantsData = data.students.map(s => ({
        registration_id: regId,
        nama: s.nama,
        nisn: s.nisn,
        gender: s.gender,
        kelas: s.kelas
      }));

      const { error: partError } = await supabase
        .from('participants')
        .insert(participantsData);

      if (partError) {
        console.warn('[Supabase DB] Participants insert warning:', partError.message);
      }
    } catch (partErr) {
      console.warn('[Supabase DB] Exception insert participants:', partErr);
    }
  }

  // 4. Kirim Data ke Google Apps Script (Google Spreadsheet Panitia)
  const appsScriptUrl = import.meta.env.PUBLIC_APPS_SCRIPT_URL;
  if (appsScriptUrl && appsScriptUrl.startsWith('http')) {
    try {
      const sheetPayload = {
        kode: data.kode,
        tipe: data.tipe,
        sekolah: data.sekolah,
        wilayah: data.wilayah,
        kecamatan: data.kecamatan,
        jenjang: data.jenjang,
        waPJ: data.hpKontak,
        totalBiaya: data.totalBiaya,
        statusBayar: 'Menunggu Verifikasi',
        buktiBayarUrl: buktiUrl || '-',
        students: data.students
      };

      // Kirim POST ke Web App Google Apps Script
      await fetch(appsScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sheetPayload),
        mode: 'no-cors' // Menghindari isu redirect 302 CORS di browser
      });

      // Update flag synced_to_sheet jika berhasil
      if (regId) {
        await supabase
          .from('registrations')
          .update({ synced_to_sheet: true })
          .eq('id', regId);
      }
    } catch (gasErr) {
      console.warn('[Google Apps Script] Sync notice:', gasErr);
    }
  }

  return { success: true, kode: data.kode };
}

export interface DuplicateNisnInfo {
  nisn: string;
  nama: string;
  sekolah: string;
  kode: string;
  status: string;
}

export interface NisnValidationResult {
  valid: boolean;
  internalDuplicates: string[];
  dbDuplicates: DuplicateNisnInfo[];
  message: string;
}

/**
 * Validasi Keunikan NISN:
 * 1. Mencegah duplikasi di dalam satu form / berkas Excel yang sama
 * 2. Mencegah duplikasi terhadap data peserta yang sudah ada di Supabase Cloud
 */
export async function checkNisnDuplicates(nisnList: string[]): Promise<NisnValidationResult> {
  const cleanList = nisnList
    .map(n => String(n || '').trim())
    .filter(n => n.length > 0);

  // 1. Cek duplikasi internal dalam formulir / berkas yang diunggah
  const seen = new Set<string>();
  const internalDups = new Set<string>();
  cleanList.forEach(n => {
    if (seen.has(n)) {
      internalDups.add(n);
    } else {
      seen.add(n);
    }
  });

  if (internalDups.size > 0) {
    const dupArr = Array.from(internalDups);
    return {
      valid: false,
      internalDuplicates: dupArr,
      dbDuplicates: [],
      message: `Terdapat ${dupArr.length} nomor NISN ganda dalam pengisian formulir/berkas Anda: ${dupArr.join(', ')}. Setiap peserta hanya boleh didaftarkan 1 kali.`
    };
  }

  if (cleanList.length === 0) {
    return { valid: true, internalDuplicates: [], dbDuplicates: [], message: '' };
  }

  // 2. Cek ke Database Supabase Cloud (tabel participants)
  try {
    const chunkSize = 50;
    const dbDuplicates: DuplicateNisnInfo[] = [];

    for (let i = 0; i < cleanList.length; i += chunkSize) {
      const chunk = cleanList.slice(i, i + chunkSize);
      const { data, error } = await supabase
        .from('participants')
        .select('nisn, nama, registrations(kode, sekolah, status)')
        .in('nisn', chunk);

      if (!error && data && data.length > 0) {
        data.forEach((row: any) => {
          const reg = Array.isArray(row.registrations) ? row.registrations[0] : row.registrations;
          // Abaikan jika pendaftaran sebelumnya berstatus 'ditolak'
          if (reg && reg.status === 'ditolak') return;

          dbDuplicates.push({
            nisn: row.nisn,
            nama: row.nama || '-',
            sekolah: reg?.sekolah || '-',
            kode: reg?.kode || '-',
            status: reg?.status || 'menunggu'
          });
        });
      }
    }

    if (dbDuplicates.length > 0) {
      return {
        valid: false,
        internalDuplicates: [],
        dbDuplicates,
        message: `Ditemukan ${dbDuplicates.length} nomor NISN yang sudah terdaftar di database resmi KKA Radar Kediri 2026. Setiap siswa hanya dapat didaftarkan satu kali.`
      };
    }
  } catch (err) {
    console.warn('[Supabase] Gagal memeriksa keunikan NISN:', err);
  }

  return {
    valid: true,
    internalDuplicates: [],
    dbDuplicates: [],
    message: ''
  };
}
