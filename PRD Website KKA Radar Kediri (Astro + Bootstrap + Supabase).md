# PRD Website KKA Radar Kediri

**Pembuatan ulang website dengan Astro + Bootstrap + Supabase**

Versi 1.0 · Oktober 2026 · Domain: kkaradarkediri.com

## 1. Ringkasan Eksekutif

Website Kompetisi Kompetensi Akademik (KKA) Jawa Pos Radar Kediri saat ini berjalan di Blogspot. Website ini dibangun ulang dari nol dengan stack modern: **Astro** (framework), **Bootstrap 5** (UI), dan **Supabase** (database, auth, storage). Tujuannya adalah halaman yang ringan, SEO yang lebih terkontrol, dan sistem pendaftaran peserta yang terstruktur, tidak lagi bergantung pada form eksternal.

Dokumen ini draf awal dan tidak perlu sempurna sejak awal. Setelah ditinjau pembimbing dan setelah versi pertama jadi, bagian yang kurang diperbaiki. Dua hal utama: website **dibangun ulang** (bukan migrasi), dan setiap pendaftaran **otomatis masuk ke database Supabase sekaligus Google Spreadsheet** lewat Google Apps Script, supaya guru pengelola mudah memantau datanya.

### Apakah stack ini memungkinkan?

**Ya, sangat memungkinkan dan cocok.**

| Komponen | Peran | Penilaian |
| --- | --- | --- |
| Astro | Generate halaman statis (HTML murni, nol JS secara default) | Sangat cocok untuk situs konten + landing page. Skor Lighthouse mudah 95+ |
| Bootstrap 5 | Grid, komponen, responsif | Cocok. Pakai CSS saja, JS Bootstrap hanya dimuat jika perlu (navbar mobile, accordion, tab) |
| Supabase | Postgres, Auth admin, Storage, Edge Functions | Cocok untuk data pendaftaran, blog dinamis, dan galeri |

**Catatan penting:**

- Astro bersifat statis. Konten yang berubah dari database (blog, pengumuman) butuh strategi: rebuild otomatis via webhook, atau mode SSR/hybrid. Rekomendasi ada di bagian 6.
- Form pendaftaran berjalan di sisi klien (JavaScript kecil) langsung ke Supabase, dilindungi RLS dan anti-spam.
- Pembayaran adalah bagian paling berisiko. Mulai dari transfer manual + upload bukti, payment gateway menyusul (fase 2).

## 2. Hasil Analisis Website Saat Ini

Website lama hanya dipakai sebagai referensi konten, karena situs dibangun ulang dari nol. Berdasarkan halaman beranda kkaradarkediri.com:

**Struktur menu:** Tentang KKA, Informasi, Pendaftaran Mandiri, Pendaftaran Kolektif, Regulasi, Galeri, Kontak, Blog.

**Section beranda:**

1. Hero: judul "Kompetisi Kompetensi Akademik (KKA) 2026", tagline "Challenge Your Brain, Test Your Skills", tombol Daftar Mandiri / Daftar Kolektif
2. Statistik: 4.920 peserta (2024) menjadi 5.633 peserta (2025), ratusan finalis dari 7 wilayah
3. Tentang KKA: soal standar TKA, partner Neutron Yogyakarta, dukungan Cabdindik & Kemenag
4. Pendaftaran per wilayah: 7 kartu wilayah
5. Materi soal per jenjang (SD/MI, SMP/MTs, SMA/MA/SMK)
6. Detail KKA (tab): Mengapa KKA, Peserta & Materi, Alur & Cara Daftar, Biaya, Hadiah
7. Testimoni (siswa dan guru)
8. Blog (saat ini kosong)
9. Formulir kontak, widget chat WhatsApp 3 admin, tombol chat admin

**Data bisnis yang sudah ada:**

- **Wilayah (7):** Kota Kediri, Kab. Kediri, Kab. Nganjuk, Kab. Tulungagung, Kab. Blitar, Kota Blitar, Kab. Trenggalek
- **Region kompetisi:** Region 1 (Kota + Kab. Kediri), Region 2 (Nganjuk, Kab. Blitar, Kota Blitar), Region 3 (Tulungagung, Trenggalek)
- **Jenjang & mapel:**
  - SD/MI kelas IV-VI: Matematika, Bahasa Indonesia
  - SMP/MTs kelas VIII-IX: Matematika, Bahasa Indonesia
  - SMA/MA/SMK kelas XI-XII: Matematika, Bahasa Indonesia, Bahasa Inggris + 2 mapel pilihan jurusan
- **Biaya per gelombang:**
  - Gelombang I (2-20 Juni 2026): SD Rp25.000, SMP Rp35.000, SMA Rp50.000
  - Gelombang II (22 Juni-18 Juli 2026): SD Rp30.000, SMP Rp40.000, SMA Rp60.000
  - Gelombang III (20-25 Juli 2026): SD Rp40.000, SMP Rp50.000, SMA Rp75.000
- **Alur:** Seleksi regional online di sekolah masing-masing, lolos menuju Grand Final
- **Hadiah:** medali, uang tunai, sertifikat

**Temuan yang perlu dibenahi saat dibangun ulang:**

- Tombol "Daftar Mandiri" dan "Daftar Kolektif" di beranda masih mengarah ke `#` (belum berfungsi). Pendaftaran sebenarnya di `/p/kka.html`.
- Section materi SMA/MA/SMK tampil dua kali (duplikat).
- Tombol "Ikut Kompetisi" di kartu wilayah juga `#`.
- Nomor WhatsApp di tombol "Chat admin" (6283198002246) berbeda dengan 3 nomor admin di widget. Perlu dikonfirmasi mana yang resmi.
- Logo beberapa wilayah diambil dari hotlink eksternal (Wikipedia, Flickr, situs pemda). Harus diunduh dan di-host sendiri.
- Halaman galeri dan regulasi di Blogspot berupa halaman statis. Perlu diaudit isinya sebelum migrasi.

## 3. Tujuan & Metrik Sukses

| Tujuan | Metrik | Target |
| --- | --- | --- |
| Website cepat | Lighthouse Performance (mobile) | 90+ |
| SEO | Lighthouse SEO | 100 |
| Core Web Vitals | LCP / CLS / INP | < 2.5 s / < 0.1 / < 200 ms |
| Pendaftaran terdigitalisasi | Persentase pendaftar lewat website | 100% |
| Admin efisien | Waktu verifikasi satu pembayaran | < 1 menit |
| SEO tidak jatuh setelah situs diganti | Halaman lama ter-redirect 301 | 100% URL terindeks |

## 4. Pengguna & Peran

| Peran | Deskripsi | Kebutuhan utama |
| --- | --- | --- |
| Pengunjung | Siswa, orang tua, guru | Info lomba, biaya, jadwal, daftar |
| Peserta mandiri | Siswa/orang tua mendaftar sendiri | Form sederhana, bayar, bukti, kartu peserta |
| Koordinator kolektif | Guru/sekolah mendaftarkan banyak siswa | Input banyak peserta sekaligus (form berulang atau import Excel), 1 invoice |
| Admin | Panitia (3 admin saat ini) | Kelola pendaftar, verifikasi pembayaran, kelola konten |
| Super admin | Pengelola website | Kelola admin, pengaturan gelombang dan harga |

## 5. Ruang Lingkup Fitur

### 5.1 Fase 1 (MVP, wajib saat launch)

**A. Halaman publik (statis, SEO)**

- Beranda (semua section dari website lama)
- Tentang KKA
- Regulasi
- Informasi (jadwal, biaya, alur, hadiah)
- Halaman per wilayah (7 halaman, contoh `/wilayah/kota-kediri`)
- Halaman per jenjang (3 halaman, contoh `/jenjang/sma`)
- Galeri
- Blog / berita (daftar + detail)
- Kontak
- 404 kustom

**B. Pendaftaran**

- Pendaftaran Mandiri: form peserta tunggal
- Pendaftaran Kolektif: koordinator mendaftarkan beberapa siswa sekaligus
- Harga otomatis berdasarkan gelombang aktif (tanggal) dan jenjang
- Upload bukti transfer (Supabase Storage)
- Halaman status pendaftaran (cek pakai kode pendaftaran + nomor HP)
- Notifikasi WhatsApp: tombol tautan `wa.me` dengan pesan terisi otomatis (tanpa API berbayar)

**Penyimpanan ganda:** setiap pendaftaran tersimpan di dua tempat, yaitu Supabase (data utama) dan Google Spreadsheet (tampilan kerja guru). Sinkronisasi otomatis lewat Google Apps Script. Detail di bagian 6.5.

**C. Panel admin (`/admin`, tidak diindeks)**

- Login (Supabase Auth, email + password)
- Dashboard ringkasan: total pendaftar per wilayah, jenjang, status bayar
- Daftar peserta (filter, cari, export CSV/Excel)
- Verifikasi pembayaran (lihat bukti, setujui/tolak)
- Kelola blog, galeri, testimoni
- Kelola gelombang & harga
- Inbox pesan kontak

### 5.2 Fase 2 (setelah launch)

- Payment gateway (Midtrans / Xendit) via Supabase Edge Function
- Kartu peserta PDF otomatis (nomor peserta + QR)
- Pengumuman hasil dan pencarian hasil per peserta
- Notifikasi email otomatis
- Import peserta kolektif dari Excel
- Multi-bahasa (opsional)

### 5.3 Di luar lingkup

- Ujian online / CBT (dikerjakan di platform terpisah)
- Aplikasi mobile native

## 6. Arsitektur Teknis

### 6.1 Stack

| Lapisan | Pilihan | Alasan |
| --- | --- | --- |
| Framework | Astro 5 | Static-first, island architecture, SEO bagus |
| UI | Bootstrap 5.3 (CSS via npm/SCSS) | Cepat dibangun, familiar |
| Interaktivitas | Vanilla JS / Astro `<script>`; opsional Alpine.js | Menghindari framework JS berat |
| Database & Auth | Supabase (Postgres, Auth, Storage, RLS) | Sesuai permintaan |
| Hosting | Cloudflare Pages (rekomendasi) atau Vercel / Netlify | Gratis, CDN global, build webhook |
| Anti-spam | Cloudflare Turnstile | Gratis, ramah privasi |
| Analytics | Google Analytics 4 + Search Console | Pantau trafik dan indeks |

### 6.2 Strategi rendering

**Rekomendasi: Hybrid.**

- **Statis (SSG):** semua halaman publik. Cepat, SEO maksimal.
- **Client-side:** form pendaftaran, cek status, seluruh panel `/admin` (SPA ringan, data diambil dari Supabase di browser dengan sesi login).
- **Blog:** dua opsi.
  - **Opsi A (disarankan awal):** artikel disimpan di tabel `posts` Supabase, Astro mengambilnya saat build. Saat admin publish, Supabase Database Webhook memicu *Deploy Hook* Cloudflare/Vercel sehingga situs rebuild (sekitar 1 menit). Hasilnya HTML statis murni.
  - **Opsi B:** pakai Astro Content Collections (file Markdown di repo). Paling ringan, tapi admin non-teknis harus edit lewat Git.

Selama blog tidak terbit setiap menit, Opsi A cukup dan paling seimbang.

### 6.3 Struktur folder

```
kka-radar-kediri/
├── astro.config.mjs
├── package.json
├── .env                     # PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── _redirects           # 301 dari URL Blogspot lama
│   └── images/
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro     # <head> SEO, navbar, footer
│   │   └── AdminLayout.astro
│   ├── components/
│   │   ├── Seo.astro            # meta, OG, JSON-LD
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── RegionCard.astro
│   │   ├── PricingTable.astro
│   │   ├── Testimonials.astro
│   │   └── WhatsAppFab.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── tentang-kka.astro
│   │   ├── regulasi.astro
│   │   ├── informasi.astro
│   │   ├── galeri.astro
│   │   ├── kontak.astro
│   │   ├── blog/index.astro
│   │   ├── blog/[slug].astro
│   │   ├── wilayah/[slug].astro
│   │   ├── jenjang/[slug].astro
│   │   ├── daftar/mandiri.astro
│   │   ├── daftar/kolektif.astro
│   │   ├── daftar/status.astro
│   │   ├── admin/               # noindex, client-side
│   │   └── sitemap handled by @astrojs/sitemap
│   ├── lib/
│   │   ├── supabase.ts
│   │   └── pricing.ts           # logika gelombang & harga
│   ├── data/                    # JSON statis: wilayah, jenjang, mapel
│   └── styles/custom.scss       # override variabel Bootstrap
└── supabase/
    ├── migrations/              # SQL skema + RLS
    └── functions/               # Edge Functions (fase 2)
```

### 6.4 Integrasi yang dipakai

- `@astrojs/sitemap` untuk sitemap otomatis
- `astro-compress` atau `sharp` untuk optimasi gambar (konversi WebP/AVIF)
- Komponen `<Image>` bawaan Astro untuk gambar responsif
- `@supabase/supabase-js`

### 6.5 Integrasi Google Spreadsheet (Apps Script)

Supabase tetap menjadi sumber data utama. Google Spreadsheet adalah salinan yang mudah dibaca, difilter, dan dicetak oleh guru panitia. Sinkronisasi dibuat satu arah: database ke Spreadsheet.

**Alur:**

1. Peserta submit form, data masuk ke tabel `registrations` dan `participants` di Supabase
2. Trigger Postgres menyusun satu JSON lengkap (join peserta, pendaftaran, wilayah) lalu mengirimnya ke URL Web App Apps Script lewat `pg_net`
3. Apps Script menambah satu baris baru di Spreadsheet, atau memperbarui baris yang sama jika statusnya berubah (misalnya menjadi lunas)
4. Jika sukses, database menandai `synced_to_sheet = true`; jika gagal, tetap `false` dan bisa dikirim ulang

Alasan memakai trigger + `pg_net`: webhook bawaan Supabase hanya membawa baris dari satu tabel, sedangkan satu baris Spreadsheet butuh data gabungan.

| Keputusan | Pilihan awal |
| --- | --- |
| Arah sinkron | Database ke Spreadsheet saja. Mengedit sel tidak mengubah database |
| Kunci baris | Kode pendaftaran (contoh KKA26-000123) di kolom A, dipakai mencari baris saat update |
| Struktur tab | Satu tab per wilayah (7 tab) + tab "Semua". Bisa diubah setelah review |
| Kolom | Kode, tanggal daftar, wilayah, jenjang, nama, sekolah, kelas, mapel pilihan, nama kontak, HP, biaya, status bayar |
| Keamanan | Token rahasia di URL Web App yang dicek skrip (Apps Script tidak bisa membaca header). Spreadsheet hanya dibagikan ke email guru, bukan "siapa saja dengan link" |
| Gagal kirim | Kolom `synced_to_sheet` + tombol "Kirim ulang" di panel admin |
| Bukti transfer | Tetap di bucket privat Supabase, tidak masuk Spreadsheet |
| Antrean | Skrip memakai `LockService` agar pendaftar bersamaan tidak saling menimpa baris |

Kerangka skrip (disempurnakan saat implementasi):

```javascript
function doPost(e) {
  const props = PropertiesService.getScriptProperties();
  if (e.parameter.token !== props.getProperty('SECRET')) {
    return ContentService.createTextOutput('forbidden');
  }
  const data = JSON.parse(e.postData.contents);
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const ss = SpreadsheetApp.getActive();
    const sheet = ss.getSheetByName(data.wilayah) || ss.insertSheet(data.wilayah);
    // cari baris berdasarkan data.kode, update jika ada, tambah jika belum
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput('ok');
}
```

**Batasan yang perlu diketahui:** Apps Script punya kuota eksekusi harian dan waktu respons yang kadang lambat. Untuk ribuan pendaftar (tahun lalu 5.633) ini umumnya cukup, tetapi jika kewalahan, ganti dengan Supabase Edge Function + Google Sheets API tanpa mengubah alur di atas.

## 7. Model Data (Supabase / Postgres)

### 7.1 Tabel referensi

| Tabel | Kolom utama |
| --- | --- |
| `regions` | id, nama (Region 1/2/3) |
| `districts` | id, region\_id, nama, slug, logo\_url |
| `levels` | id, kode (SD, SMP, SMA), nama, kelas\_min, kelas\_max |
| `subjects` | id, nama (Matematika, B. Indonesia, B. Inggris, dll) |
| `level_subjects` | level\_id, subject\_id, wajib (bool) |
| `waves` | id, nama, tanggal\_mulai, tanggal\_selesai, aktif |
| `prices` | id, wave\_id, level\_id, harga |

### 7.2 Tabel transaksi

| Tabel | Kolom utama |
| --- | --- |
| `registrations` | id, kode (contoh KKA26-000123), tipe (mandiri/kolektif), district\_id, wave\_id, nama\_kontak, hp\_kontak, email, total\_bayar, status (menunggu/lunas/ditolak), created\_at |
| `participants` | id, registration\_id, nama, nisn, sekolah, kelas, level\_id, jurusan\_rencana, mapel\_pilihan\_1, mapel\_pilihan\_2, nomor\_peserta |
| `payments` | id, registration\_id, bukti\_url, nominal, bank\_pengirim, status, verified\_by, verified\_at, catatan |

### 7.3 Tabel konten

| Tabel | Kolom utama |
| --- | --- |
| `posts` | id, judul, slug, ringkasan, isi (markdown/html), cover\_url, status (draft/publish), published\_at, meta\_title, meta\_description |
| `gallery_items` | id, judul, image\_url, album, urutan |
| `testimonials` | id, nama, asal\_sekolah, isi, peran (siswa/guru), tampil |
| `contact_messages` | id, nama, email, pesan, dibaca, created\_at |
| `site_settings` | key, value (contoh nomor WA admin, tahun aktif) |
| `profiles` | id (= auth.users.id), nama, role (admin/superadmin) |

### 7.4 Keamanan data (RLS)

Peserta adalah pelajar di bawah umur dan data seperti NISN termasuk data pribadi. Aturan minimum:

- **Publik (anon):** boleh `INSERT` ke `registrations`, `participants`, `payments`, `contact_messages`. Tidak boleh `SELECT` data peserta.
- **Cek status:** lewat fungsi Postgres `check_registration_status(kode, hp)` bertipe `SECURITY DEFINER` yang hanya mengembalikan status, bukan data lengkap.
- **Admin:** `SELECT/UPDATE/DELETE` penuh hanya untuk user yang ada di `profiles` dengan role admin.
- **Konten publik:** `posts` (status publish), `gallery_items`, `testimonials` (tampil = true) boleh dibaca anon.
- **Storage:** bucket `bukti-bayar` privat (admin yang bisa lihat, upload dibatasi tipe dan ukuran). Bucket `media` publik untuk gambar blog dan galeri.
- **Anti-spam:** Turnstile pada semua form publik, dan rate limit di Edge Function jika dibutuhkan.
- Terapkan prinsip UU PDP: tampilkan persetujuan privasi di form dan sediakan halaman Kebijakan Privasi.
- **Jangan pernah** memakai `service_role` key di kode klien. Hanya `anon` key yang boleh publik.

## 8. Kebutuhan SEO

Ini alasan utama migrasi, jadi dibuat eksplisit.

### 8.1 On-page

- Satu `<h1>` per halaman, hierarki heading rapi
- `<title>` dan `meta description` unik per halaman (komponen `Seo.astro`)
- Canonical URL, Open Graph, Twitter Card
- `lang="id"`, `og:locale=id_ID`
- URL bersih tanpa `.html` (contoh `/tentang-kka`)
- Gambar: format WebP/AVIF, atribut `width`/`height`, `loading="lazy"` kecuali gambar hero, `alt` deskriptif
- Breadcrumb di halaman dalam

### 8.2 Structured data (JSON-LD)

- `Organization` (KKA / Jawa Pos Radar Kediri)
- `Event` (KKA 2026: tanggal, lokasi online/regional, harga/offers)
- `FAQPage` di halaman Informasi
- `Article` / `BlogPosting` di blog
- `BreadcrumbList`

### 8.3 Teknis

- `sitemap.xml` otomatis, `robots.txt` (blokir `/admin`)
- Halaman admin diberi `noindex`
- Sertifikat HTTPS, redirect non-www ke www (atau sebaliknya, pilih satu)
- Daftarkan ulang di Google Search Console dan kirim sitemap baru
- Target kata kunci awal: "KKA Radar Kediri", "kompetisi akademik Kediri 2026", "try out TKA Kediri", "lomba akademik SD SMP SMA Kediri", "simulasi TKA Kediri"

### 8.4 Redirect URL lama

Domain yang sama sudah terindeks Google dengan URL Blogspot seperti `/p/tentang-kka.html`. Buat redirect 301 untuk URL lama yang penting supaya tidak menjadi 404 (file `_redirects` atau aturan hosting):

```
/p/tentang-kka.html   /tentang-kka   301
/p/regulasi.html      /regulasi      301
/p/galeri.html        /galeri        301
/p/kontak.html        /kontak        301
/p/blog.html          /blog          301
/p/kka.html           /daftar        301
```

Cukup untuk halaman utama saja (sekitar 6-10 URL). Daftar URL lama bisa dilihat di `/sitemap.xml` Blogspot sebelum DNS dialihkan.

## 9. Kebutuhan Non-Fungsional

- **Performa:** total JS halaman beranda < 50 KB (di luar Bootstrap JS opsional), gambar hero < 150 KB, font maksimal 2 keluarga dengan `font-display: swap`
- **Responsif:** mobile-first (mayoritas pengguna siswa/orang tua lewat HP)
- **Aksesibilitas:** kontras warna cukup, fokus keyboard terlihat, label form jelas (target WCAG AA)
- **Browser:** dua versi terakhir Chrome, Safari, Firefox, Edge; Android WebView
- **Ketersediaan:** pakai CDN; saat masa pendaftaran tidak boleh ada downtime
- **Skalabilitas:** puncak trafik pendaftaran (mendekati tutup gelombang). Supabase free tier cukup untuk awal, tetapi pertimbangkan Pro saat musim pendaftaran. Pantau batas koneksi dan storage
- **Backup:** jadwalkan ekspor database berkala (Supabase Pro punya backup harian; di free tier ekspor manual/cron)

## 10. Desain & Branding

- Pakai logo KKA yang sudah ada (unduh versi asli dan simpan di `public/images/`)
- Tentukan palet dari logo dan override variabel Bootstrap lewat SCSS (`$primary`, `$secondary`)
- Gaya: bersih, energik, cocok untuk pelajar; CTA "Daftar Mandiri" dan "Daftar Kolektif" selalu terlihat (sticky di mobile)
- Tombol WhatsApp mengambang menggantikan widget live support berbasis JS yang berat
- Gunakan ulang copywriting dari website lama kecuali ada koreksi (poin di bagian 2)

## 11. Alur Pengguna Utama

**Pendaftaran mandiri:**

1. Pengunjung memilih wilayah (dari beranda atau halaman wilayah)
2. Memilih jenjang, mengisi data siswa (nama, sekolah, kelas, NISN; untuk SMA: 2 mapel pilihan)
3. Sistem menampilkan harga sesuai gelombang aktif
4. Pengunjung submit, menerima **kode pendaftaran** dan instruksi transfer. Data tersimpan di Supabase dan otomatis masuk satu baris di Google Spreadsheet
5. Mengunggah bukti transfer
6. Admin memverifikasi, status menjadi **lunas** (kolom status di Spreadsheet ikut berubah)
7. Peserta cek status lewat kode + nomor HP

**Pendaftaran kolektif:**

1. Koordinator (guru) mengisi data sekolah dan kontak
2. Menambahkan banyak peserta (form berulang; fase 2: import Excel)
3. Sistem menjumlahkan total biaya
4. Satu kali transfer dan satu bukti, admin verifikasi sekaligus

**Admin memublikasikan blog:**

1. Login ke `/admin`, menulis artikel (editor Markdown), unggah cover
2. Menekan Publish, webhook memicu rebuild
3. Artikel muncul di situs sekitar 1-2 menit kemudian

## 12. Rencana Pengembangan

| Tahap | Pekerjaan | Perkiraan |
| --- | --- | --- |
| 0. Persiapan | Rangkum konten Blogspot sebagai referensi, kumpulkan aset (logo, foto), setup repo + Supabase + hosting | 2-3 hari |
| 1. Fondasi | Layout, navbar, footer, komponen SEO, tema Bootstrap | 2-3 hari |
| 2. Halaman statis | Beranda, tentang, regulasi, informasi, wilayah, jenjang, kontak | 4-5 hari |
| 3. Database | Skema SQL, RLS, seed data (wilayah, jenjang, harga) | 2 hari |
| 4. Pendaftaran | Form mandiri + kolektif, upload bukti, cek status, sinkron ke Google Spreadsheet (Apps Script) | 5-6 hari |
| 5. Panel admin | Login, dashboard, peserta, verifikasi, export | 5-6 hari |
| 6. Blog & galeri | CRUD + webhook rebuild | 3 hari |
| 7. SEO & redirect | JSON-LD, sitemap, redirect 301, uji Lighthouse | 2-3 hari |
| 8. QA & launch | Uji lintas perangkat, uji beban, pindah DNS, kirim sitemap | 3 hari |

Total sekitar 4-6 minggu kerja satu developer. Urutan yang disarankan: **halaman statis dan SEO dulu** (nilai terbesar, risiko terkecil), lalu pendaftaran.

## 13. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Peringkat SEO turun setelah pindah | Trafik berkurang | Redirect 301 lengkap, kirim ulang sitemap, pantau Search Console 4-8 minggu |
| Spam / pendaftaran palsu | Data kotor | Turnstile, validasi server (CHECK constraint), verifikasi pembayaran manual |
| Kebocoran data pelajar | Pelanggaran privasi | RLS ketat, bucket privat, tidak ada SELECT anon, kebijakan privasi |
| Lonjakan trafik di akhir gelombang | Form lambat/gagal | CDN, Supabase paket Pro saat musim daftar, uji beban sebelum launch |
| Admin non-teknis kesulitan | Konten tidak ter-update | Panel admin sederhana + panduan singkat; opsi Opsi A rebuild otomatis |
| Free tier Supabase pause saat tidak aktif | Situs/formulir error | Gunakan paket berbayar menjelang periode pendaftaran, atau ping berkala |
| Pergantian harga/gelombang salah | Tagihan keliru | Harga dibaca dari tabel `waves` + `prices`, bukan hardcode |

## 14. Pertanyaan Terbuka (perlu dikonfirmasi)

1. Apakah pembayaran akan tetap transfer manual, atau ingin payment gateway sejak awal?
2. Nomor WhatsApp mana yang resmi: 3 admin di widget atau nomor di tombol "Chat admin"?
3. Apa isi dan format form pendaftaran di `/p/kka.html` saat ini (field apa saja)? Perlu disalin agar sama.
4. Apakah ada konten blog atau pengumuman lama yang ingin dibawa ke website baru?
5. Siapa yang akan mengelola admin harian, dan berapa orang?
6. Apakah hasil lomba/pengumuman juga akan ditampilkan di website?
7. Berapa perkiraan jumlah pendaftar tahun ini (tahun lalu 5.633)? Menentukan paket Supabase.
8. Apakah ada ketentuan privasi dari Jawa Pos Radar Kediri yang harus dicantumkan?
9. Spreadsheet: satu file dengan tab per wilayah, atau per jenjang? Guru mana saja yang perlu akses (email Google)?
10. Apakah ada catatan dari pembimbing yang perlu dimasukkan ke PRD ini?

## 15. Definition of Done (Launch)

- [ ] Semua halaman publik tayang dengan konten final
- [ ] Pendaftaran mandiri dan kolektif berfungsi end-to-end
- [ ] Admin bisa verifikasi pembayaran dan export data
- [ ] Lighthouse mobile: Performance 90+, SEO 100, Accessibility 90+
- [ ] URL Blogspot lama yang penting sudah di-redirect 301 dan diuji
- [ ] Sitemap terkirim ke Google Search Console
- [ ] RLS diuji (anon tidak bisa membaca data peserta)
- [ ] Backup database terjadwal
- [ ] Kebijakan privasi dan persetujuan di form tersedia
