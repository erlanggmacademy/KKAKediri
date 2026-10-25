-- ====================================================================
-- TABEL SCHOOLS (CMS Data Sekolah & Madrasah KKA Radar Kediri)
-- Jalankan skrip ini di: Supabase Dashboard -> SQL Editor -> RUN
-- ====================================================================

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
