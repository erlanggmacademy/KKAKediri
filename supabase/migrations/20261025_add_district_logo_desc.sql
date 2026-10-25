-- ====================================================================
-- MIGRASI TAMBAHAN: FOTO/LOGO DAN DESKRIPSI PADA DISTRICT_SETTINGS
-- Tanggal: 2026-10-25
-- ====================================================================

ALTER TABLE public.district_settings 
ADD COLUMN IF NOT EXISTS logo_url TEXT,
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS description TEXT;

-- Update data bawaan dengan logoUrl masing-masing daerah
UPDATE public.district_settings SET logo_url = '/images/wilayah/kota-kediri.webp', image_url = '/images/wilayah/kota-kediri.webp' WHERE slug = 'kota-kediri';
UPDATE public.district_settings SET logo_url = '/images/wilayah/kabupaten-kediri.webp', image_url = '/images/wilayah/kabupaten-kediri.webp' WHERE slug = 'kabupaten-kediri';
UPDATE public.district_settings SET logo_url = '/images/wilayah/kabupaten-nganjuk.webp', image_url = '/images/wilayah/kabupaten-nganjuk.webp' WHERE slug = 'kabupaten-nganjuk';
UPDATE public.district_settings SET logo_url = '/images/wilayah/kabupaten-blitar.webp', image_url = '/images/wilayah/kabupaten-blitar.webp' WHERE slug = 'kabupaten-blitar';
UPDATE public.district_settings SET logo_url = '/images/wilayah/kota-blitar.webp', image_url = '/images/wilayah/kota-blitar.webp' WHERE slug = 'kota-blitar';
UPDATE public.district_settings SET logo_url = '/images/wilayah/kabupaten-tulungagung.webp', image_url = '/images/wilayah/kabupaten-tulungagung.webp' WHERE slug = 'kabupaten-tulungagung';
UPDATE public.district_settings SET logo_url = '/images/wilayah/kabupaten-trenggalek.webp', image_url = '/images/wilayah/kabupaten-trenggalek.webp' WHERE slug = 'kabupaten-trenggalek';
