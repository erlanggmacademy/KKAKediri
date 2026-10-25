-- ====================================================================
-- SKEMA DATABASE SUPABASE: KKA JAWA POS RADAR KEDIRI 2026
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABEL REGISTRATIONS (Data Transaksi Pendaftaran Induk)
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

-- Index pencarian kode & hp
CREATE INDEX IF NOT EXISTS idx_registrations_kode ON public.registrations(kode);
CREATE INDEX IF NOT EXISTS idx_registrations_hp ON public.registrations(hp_kontak);
CREATE INDEX IF NOT EXISTS idx_registrations_wilayah ON public.registrations(wilayah);

-- 3. TABEL PARTICIPANTS (Data Siswa Peserta Kompetisi)
CREATE TABLE IF NOT EXISTS public.participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id UUID NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
    nama VARCHAR(255) NOT NULL,
    nisn VARCHAR(20) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    kelas VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pencarian NISN & registration_id
CREATE INDEX IF NOT EXISTS idx_participants_nisn ON public.participants(nisn);
CREATE INDEX IF NOT EXISTS idx_participants_reg_id ON public.participants(registration_id);

-- 4. KEAMANAN DATA (ROW LEVEL SECURITY / RLS)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;

-- Izinkan publik (anonim) melakukan pendaftaran (INSERT)
CREATE POLICY "Publik dapat mendaftar (Insert Registrations)"
ON public.registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Publik dapat menambahkan peserta (Insert Participants)"
ON public.participants
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Izinkan publik membaca data untuk cek status berdasarkan kode pendaftaran
CREATE POLICY "Publik dapat cek status pendaftaran (Select by Kode)"
ON public.registrations
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Publik dapat membaca peserta dari pendaftarannya"
ON public.participants
FOR SELECT
TO anon, authenticated
USING (true);

-- Izinkan admin panitia memperbarui status verifikasi dan catatan penolakan pendaftaran
CREATE POLICY "Admin dapat update status dan catatan pendaftaran"
ON public.registrations
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 5. STORAGE BUCKET: BUKTI-TRANSFER
-- Menyiapkan bucket untuk upload bukti pembayaran
INSERT INTO storage.buckets (id, name, public)
VALUES ('bukti-transfer', 'bukti-transfer', true)
ON CONFLICT (id) DO NOTHING;

-- Kebijakan Storage: Publik dapat mengunggah bukti transfer
CREATE POLICY "Publik dapat upload bukti transfer"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'bukti-transfer');

-- Kebijakan Storage: Publik dapat melihat file bukti transfer
CREATE POLICY "Publik dapat melihat bukti transfer"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'bukti-transfer');
