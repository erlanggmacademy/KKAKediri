-- ====================================================================
-- MASTER SKEMA LENGKAP SUPABASE: KKA JAWA POS RADAR KEDIRI 2026
-- Mengintegrasikan SELURUH FITUR ADMIN & CMS KE SUPABASE CLOUD DATABASE
-- Jalankan skrip ini di: Supabase Dashboard -> SQL Editor -> RUN
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- 2. TABEL REGISTRATIONS (Data Transaksi Pendaftaran Induk)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kode VARCHAR(50) UNIQUE NOT NULL,
    tipe VARCHAR(20) NOT NULL CHECK (tipe IN ('mandiri', 'kolektif')),
    wilayah VARCHAR(100) NOT NULL,
    kecamatan VARCHAR(100) NOT NULL,
    sekolah VARCHAR(255) NOT NULL,
    jenjang VARCHAR(50) NOT NULL,
    nama_kontak VARCHAR(200),
    hp_kontak VARCHAR(50) NOT NULL,
    total_biaya NUMERIC(12, 2) NOT NULL DEFAULT 0,
    bukti_bayar_url TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'menunggu' CHECK (status IN ('menunggu', 'lunas', 'ditolak')),
    catatan TEXT,
    synced_to_sheet BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pastikan kolom catatan ada jika tabel sudah pernah dibuat sebelumnya
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS catatan TEXT;

CREATE INDEX IF NOT EXISTS idx_registrations_kode ON public.registrations(kode);
CREATE INDEX IF NOT EXISTS idx_registrations_hp ON public.registrations(hp_kontak);
CREATE INDEX IF NOT EXISTS idx_registrations_wilayah ON public.registrations(wilayah);

-- --------------------------------------------------------------------
-- 3. TABEL PARTICIPANTS (Data Siswa Peserta Kompetisi)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id UUID NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
    nama VARCHAR(255) NOT NULL,
    nisn VARCHAR(20) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    kelas VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_participants_reg_id ON public.participants(registration_id);

-- --------------------------------------------------------------------
-- 4. TABEL APP_SETTINGS (Pengaturan Sistem, Saklar Buka/Tutup Pendaftaran)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.app_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Pengaturan Awal (Default)
INSERT INTO public.app_settings (key, value)
VALUES 
(
  'registration_control',
  '{
    "mandiri": {
      "enabled": true,
      "condition": "normal",
      "closedTitle": "Pendaftaran Mandiri Telah Ditutup",
      "closedMsg": "Periode pendaftaran mandiri KKA 2026 telah resmi berakhir atau kuota kupon ujian telah terpenuhi."
    },
    "kolektif": {
      "enabled": true,
      "condition": "normal",
      "closedTitle": "Pendaftaran Kolektif Sekolah Telah Ditutup",
      "closedMsg": "Periode pendaftaran kolektif sekolah KKA 2026 telah ditutup oleh panitia resmi Radar Kediri."
    }
  }'::jsonb
),
(
  'system_settings',
  '{
    "activeWave": 1,
    "bankName": "Bank Jatim Cabang Kediri",
    "bankNumber": "0061001234",
    "bankHolder": "PT Kediri Intermedia Pers (Radar Kediri)",
    "wa1": "0812-3456-7890",
    "wa2": "0812-3456-7891",
    "email": "event@radarkediri.jawapos.com"
  }'::jsonb
)
ON CONFLICT (key) DO NOTHING;

-- --------------------------------------------------------------------
-- 5. TABEL ARTICLES (CMS Artikel & Berita Radar Kediri)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.articles (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    date VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL DEFAULT 'Redaksi Radar Kediri',
    category VARCHAR(100) NOT NULL DEFAULT 'Berita',
    summary TEXT,
    content TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Data Artikel Awal
INSERT INTO public.articles (id, title, slug, date, author, category, summary, content, status)
VALUES
(
  'art-1',
  'Ribuan Pelajar Siap Bersaing di KKA 2026 Jawa Pos Radar Kediri',
  'ribuan-pelajar-siap-bersaing-kka-2026',
  '24 Oktober 2026',
  'Redaksi Radar Kediri',
  'Berita Utama',
  'Antusiasme peserta dari 7 wilayah kota/kabupaten melonjak drastis pada pembukaan pendaftaran gelombang pertama.',
  'Kompetisi Kompetensi Akademik (KKA) 2026 yang diselenggarakan oleh Jawa Pos Radar Kediri kembali menjadi magnet bagi pelajar berprestasi di wilayah Eks-Karesidenan Kediri.',
  'published'
),
(
  'art-2',
  'Tips & Trik Sukses Taklukkan Soal Literasi & Numerasi CBT KKA',
  'tips-sukses-soal-literasi-numerasi-kka',
  '20 Oktober 2026',
  'Tim Akademik KKA',
  'Tips & Panduan',
  'Simak panduan belajar dan strategi manajemen waktu menjawab soal berbasis komputer (CBT) standar ANBK nasional.',
  'Dalam menghadapi ujian seleksi berbasis komputer (CBT), manajemen waktu dan ketelitian dalam membaca soal literasi menjadi kunci utama peraihan skor tinggi.',
  'published'
),
(
  'art-3',
  'Kisah Inspiratif Juara KKA: Dari Siswa Daerah Menuju Prestasi Nasional',
  'kisah-inspiratif-juara-kka',
  '15 Oktober 2026',
  'Radar Kediri Event',
  'Prestasi',
  'Bagaimana portofolio sertifikat resmi Radar Kediri membantu siswa meraih jalur prestasi (PPDB) sekolah unggulan impian.',
  'Banyak alumni juara KKA berhasil menembus SMA/SMK negeri favorit dan perguruan tinggi negeri impian berkat portofolio piagam kejuaraan resmi dari Jawa Pos Radar Kediri.',
  'published'
)
ON CONFLICT (id) DO NOTHING;

-- --------------------------------------------------------------------
-- 6. TABEL GALLERY (Dokumentasi Galeri Foto Kegiatan KKA)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery (
    id TEXT PRIMARY KEY,
    image TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    filter_category VARCHAR(50) NOT NULL,
    caption TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Data Galeri Awal (Seluruh 12 Foto Resmi KKA)
INSERT INTO public.gallery (id, image, title, category, filter_category, caption)
VALUES
(
  'gal-1',
  'KKA 2025 Square 29.webp',
  'Ratusan Finalis di Hall Utama Grand Final KKA',
  'Grand Final',
  'grand-final',
  'Foto bersama seluruh finalis terbaik, kepala sekolah, dan pimpinan Jawa Pos Radar Kediri di panggung megah Grand Final.'
),
(
  'gal-2',
  'KKA 2025 Square 24.webp',
  'Penganugerahan Juara Jenjang SD/MI',
  'Juara & Penghargaan',
  'juara',
  'Senyum bangga para peraih juara jenjang SD/MI memegang papan kejuaraan didampingi para pejabat dinas pendidikan.'
),
(
  'gal-3',
  'KKA 2025 Square 25.webp',
  'Penganugerahan Juara Jenjang SMP/MTs',
  'Juara & Penghargaan',
  'juara',
  'Apresiasi medali dan piagam penghargaan resmi untuk talenta terbaik jenjang SMP/MTs se-Karesidenan Kediri.'
),
(
  'gal-4',
  'KKA 2025 Square 26.webp',
  'Penganugerahan Juara Jenjang SMA/MA/SMK',
  'Juara & Penghargaan',
  'juara',
  'Foto bersama para finalis terbaik jenjang SMA/MA se-Karesidenan Kediri di podium kehormatan.'
),
(
  'gal-5',
  'KKA 2025 Square 03.webp',
  'Penyerahan Piagam Juara 1 SMA Nganjuk',
  'Juara & Penghargaan',
  'juara',
  'Penyerahan simbolis penghargaan Juara I jenjang SMA/SMK/MA untuk delegasi pelajar berprestasi Kabupaten Nganjuk.'
),
(
  'gal-6',
  'KKA 2025 Square 27.webp',
  'Juara 1 & 3 Jenjang SMA Kota Kediri',
  'Juara & Penghargaan',
  'juara',
  'Momen penganugerahan Juara 1 dan 3 wilayah Kota Kediri sebagai bukti keunggulan akademik pelajar daerah.'
),
(
  'gal-7',
  'KKA 2025 Square 04.webp',
  'Semarak Registration Booth Grand Final',
  'Registrasi & Suasana',
  'suasana',
  'Antrean tertib ratusan peserta finalis di registration booth resmi KKA bersama guru pendamping.'
),
(
  'gal-8',
  'KKA 2025 Square 05.webp',
  'Verifikasi Berkas & Kartu Peserta',
  'Registrasi & Suasana',
  'suasana',
  'Panitia melayani pengecekan identitas dan pembagian kit ujian untuk memastikan validitas peserta.'
),
(
  'gal-9',
  'KKA 2025 Square 10.webp',
  'Konsentrasi Penuh Babak Grand Final',
  'Pelaksanaan Ujian',
  'ujian',
  'Peserta jenjang SMA/SMK/MA fokus menuntaskan paket soal penalaran analitis berstandar TKA Nasional.'
),
(
  'gal-10',
  'KKA 2025 Square 23.webp',
  'Khidmat Seremoni Indonesia Raya',
  'Grand Final',
  'grand-final',
  'Seluruh peserta dan dewan juri menyanyikan lagu Indonesia Raya mengawali pembukaan babak Grand Final.'
),
(
  'gal-11',
  'KKA 2025 Square 08.webp',
  'Pendalaman Materi & Kisi-Kisi Soal',
  'Pelaksanaan Ujian',
  'ujian',
  'Peserta mempelajari modul materi dan buku panduan Neutron sebelum memasuki ruang kompetisi.'
),
(
  'gal-12',
  'KKA 2025 Square 28.webp',
  'Kesiapan Mental Siswa Berprestasi',
  'Pelaksanaan Ujian',
  'ujian',
  'Siswa menelaah strategi pengerjaan soal dengan tenang dan percaya diri demi hasil optimal.'
)
ON CONFLICT (id) DO UPDATE 
SET 
  image = EXCLUDED.image,
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  filter_category = EXCLUDED.filter_category,
  caption = EXCLUDED.caption;

-- --------------------------------------------------------------------
-- 7. TABEL DISTRICT_SETTINGS (Pengaturan Wilayah / Venue & Kuota)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.district_settings (
    slug VARCHAR(100) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    venue VARCHAR(255) NOT NULL,
    quota INT NOT NULL DEFAULT 1000,
    contact VARCHAR(150) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'buka',
    logo_url TEXT,
    image_url TEXT,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Data Wilayah Awal
INSERT INTO public.district_settings (slug, name, venue, quota, contact, status, logo_url, image_url)
VALUES
('kota-kediri', 'Kota Kediri', 'IKIP PGRI Convention Hall Kediri', 1200, '0812-3456-7890 (Sekretariat Radar Kediri)', 'buka', '/images/wilayah/kota-kediri.webp', '/images/wilayah/kota-kediri.webp'),
('kabupaten-kediri', 'Kabupaten Kediri', 'Convention Hall Simpang Lima Gumul (SLG)', 1500, '0812-3456-7891 (Panitia Kab. Kediri)', 'buka', '/images/wilayah/kabupaten-kediri.webp', '/images/wilayah/kabupaten-kediri.webp'),
('kabupaten-nganjuk', 'Kabupaten Nganjuk', 'GOR Bung Karno Nganjuk', 1000, '0812-3456-7892 (Panitia Nganjuk)', 'buka', '/images/wilayah/kabupaten-nganjuk.webp', '/images/wilayah/kabupaten-nganjuk.webp'),
('kabupaten-blitar', 'Kabupaten Blitar', 'Gedung Sasana Praja Kanigoro Blitar', 1000, '0812-3456-7893 (Panitia Kab. Blitar)', 'buka', '/images/wilayah/kabupaten-blitar.webp', '/images/wilayah/kabupaten-blitar.webp'),
('kota-blitar', 'Kota Blitar', 'Balai Kota Kusumo Wicitro Kota Blitar', 800, '0812-3456-7894 (Panitia Kota Blitar)', 'buka', '/images/wilayah/kota-blitar.webp', '/images/wilayah/kota-blitar.webp'),
('kabupaten-tulungagung', 'Kabupaten Tulungagung', 'Crown Victoria Hotel Hall Tulungagung', 1200, '0812-3456-7895 (Panitia Tulungagung)', 'buka', '/images/wilayah/kabupaten-tulungagung.webp', '/images/wilayah/kabupaten-tulungagung.webp'),
('kabupaten-trenggalek', 'Kabupaten Trenggalek', 'Gedung Serbaguna Kab. Trenggalek', 800, '0812-3456-7896 (Panitia Trenggalek)', 'buka', '/images/wilayah/kabupaten-trenggalek.webp', '/images/wilayah/kabupaten-trenggalek.webp')
ON CONFLICT (slug) DO NOTHING;

-- --------------------------------------------------------------------
-- 8. KEAMANAN DATA & ROW LEVEL SECURITY (RLS) LENGKAP
-- Mengizinkan operasi penuh untuk aplikasi (role anon & authenticated)
-- --------------------------------------------------------------------
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.district_settings ENABLE ROW LEVEL SECURITY;

-- Policy Registrations
DROP POLICY IF EXISTS "Izin Penuh Registrations" ON public.registrations;
CREATE POLICY "Izin Penuh Registrations"
ON public.registrations
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Policy Participants
DROP POLICY IF EXISTS "Izin Penuh Participants" ON public.participants;
CREATE POLICY "Izin Penuh Participants"
ON public.participants
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Policy App Settings
DROP POLICY IF EXISTS "Izin Penuh App Settings" ON public.app_settings;
CREATE POLICY "Izin Penuh App Settings"
ON public.app_settings
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Policy Articles (CMS)
DROP POLICY IF EXISTS "Izin Penuh Articles" ON public.articles;
CREATE POLICY "Izin Penuh Articles"
ON public.articles
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Policy Gallery
DROP POLICY IF EXISTS "Izin Penuh Gallery" ON public.gallery;
CREATE POLICY "Izin Penuh Gallery"
ON public.gallery
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Policy District Settings
DROP POLICY IF EXISTS "Izin Penuh District Settings" ON public.district_settings;
CREATE POLICY "Izin Penuh District Settings"
ON public.district_settings
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- --------------------------------------------------------------------
-- 9. STORAGE BUCKET: BUKTI-TRANSFER
-- --------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('bukti-transfer', 'bukti-transfer', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Publik dapat upload bukti transfer" ON storage.objects;
CREATE POLICY "Publik dapat upload bukti transfer"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'bukti-transfer');

DROP POLICY IF EXISTS "Publik dapat melihat bukti transfer" ON storage.objects;
CREATE POLICY "Publik dapat melihat bukti transfer"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'bukti-transfer');

-- --------------------------------------------------------------------
-- 10. TABEL SCHOOLS (CMS Data Sekolah & Madrasah KKA)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.schools (
    id TEXT PRIMARY KEY,
    region_slug VARCHAR(100) NOT NULL,
    region_name VARCHAR(150) NOT NULL,
    kecamatan VARCHAR(100) NOT NULL,
    jenjang VARCHAR(20) NOT NULL CHECK (jenjang IN ('sd', 'smp', 'sma')),
    nama_sekolah VARCHAR(255) NOT NULL,
    is_custom BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_schools_lookup ON public.schools(region_slug, kecamatan, jenjang);
CREATE INDEX IF NOT EXISTS idx_schools_nama ON public.schools(nama_sekolah);

ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Izin Penuh Schools" ON public.schools;
CREATE POLICY "Izin Penuh Schools"
ON public.schools
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

