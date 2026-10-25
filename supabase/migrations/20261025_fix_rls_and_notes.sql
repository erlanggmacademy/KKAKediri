-- ====================================================================
-- FIX: IZIN UPDATE STATUS & KOLOM CATATAN SUPABASE POSTGRESQL
-- Jalankan skrip ini di: Supabase Dashboard -> SQL Editor -> RUN
-- ====================================================================

-- 1. Pastikan kolom catatan penolakan sudah ada di tabel registrations
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS catatan TEXT;

-- 2. Pastikan RLS aktif pada tabel registrations
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- 3. Hapus policy lama jika ada agar tidak bentrok
DROP POLICY IF EXISTS "Admin dapat update status dan catatan pendaftaran" ON public.registrations;
DROP POLICY IF EXISTS "Publik dapat update status pendaftaran" ON public.registrations;

-- 4. Buat Kebijakan RLS Baru untuk UPDATE
-- Mengizinkan pengubahan kolom status dan catatan dari antarmuka web (role anon & authenticated)
CREATE POLICY "Admin dapat update status dan catatan pendaftaran"
ON public.registrations
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 5. Pastikan policy SELECT tetap aktif agar pendaftar & admin bisa membaca data
DROP POLICY IF EXISTS "Publik dapat cek status pendaftaran (Select by Kode)" ON public.registrations;
CREATE POLICY "Publik dapat cek status pendaftaran (Select by Kode)"
ON public.registrations
FOR SELECT
TO anon, authenticated
USING (true);

-- Verifikasi skema kolom
COMMENT ON COLUMN public.registrations.catatan IS 'Catatan / alasan penolakan atau revisi berkas dari admin panitia KKA';
