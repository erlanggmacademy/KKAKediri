-- ====================================================================
-- MIGRASI STANDALONE: TABEL & 12 FOTO RESMI GALERI KKA RADAR KEDIRI
-- Jalankan skrip ini di: Supabase Dashboard -> SQL Editor -> RUN
-- ====================================================================

-- 1. Buat Tabel Gallery jika belum ada
CREATE TABLE IF NOT EXISTS public.gallery (
    id TEXT PRIMARY KEY,
    image TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    filter_category VARCHAR(50) NOT NULL,
    caption TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- 3. Kebijakan Akses Penuh (Anon & Authenticated)
DROP POLICY IF EXISTS "Izin Penuh Gallery" ON public.gallery;
CREATE POLICY "Izin Penuh Gallery"
ON public.gallery
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 4. Seed & Update Seluruh 12 Foto Galeri Resmi KKA
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
