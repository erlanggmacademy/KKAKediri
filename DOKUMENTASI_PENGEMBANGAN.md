# 📘 Jurnal Dokumentasi Pengerjaan Website KKA Jawa Pos Radar Kediri
**Mata Kuliah / Tugas**: Project MKI  
**Teknologi**: Astro 5 · Bootstrap 5.3 · Supabase (PostgreSQL, Auth, Storage) · Google Apps Script  
**Domain Target**: `kkaradarkediri.com`  
**Status**: Milestone 1 (Fondasi UI, Komponen & 17 Halaman Publik Selesai)

---

## 🎬 Panduan Narasi untuk Pembuatan Video Dokumentasi

Saat Anda merekam video presentasi / demo aplikasi, Anda dapat menggunakan urutan pembahasan berikut:
1. **Latar Belakang & Masalah**: 
   - Website KKA sebelumnya berbasis Blogspot yang kaku, memiliki form eksternal yang terpisah, dan tombol-tombol yang belum terintegrasi.
   - Rebuild ini memodernisasi performa, SEO, dan sistem registrasi terpusat.
2. **Arsitektur Stack**:
   - **Astro 5**: Menghasilkan HTML statis murni yang sangat cepat (target Lighthouse 90+ mobile & 100 SEO).
   - **Bootstrap 5.3**: Grid responsif dan styling komponen dengan palet warna resmi korporat Jawa Pos Radar Kediri.
   - **Supabase**: Penyimpanan data pendaftar terlindungi RLS, autentikasi admin panitia, dan bucket bukti transfer.
   - **Google Apps Script**: Sinkronisasi otomatis data pendaftaran ke Google Spreadsheet untuk kebutuhan operasional guru/panitia.
3. **Demo Fitur & Halaman yang Sudah Jadi**:
   - Beranda (Landing Page lengkap dengan 8 section: Hero, Counter Statistik, Mengapa KKA, 7 Wilayah, Jenjang Soal, Tabel 3 Gelombang Biaya, Testimoni, Banner CTA).
   - Halaman detail profil KKA, Regulasi juknis CBT, Informasi rekening dan FAQ, Galeri dokumentasi kilas balik, dan Kontak resmi sekretariat Radar Kediri.
   - Dynamic routing otomatis untuk 7 wilayah dan 3 jenjang pendidikan.

---

## 🗓️ Log Aktivitas Pengerjaan (Changelog)

### Tahap 1: Setup Fondasi, Arsitektur, dan Konfigurasi Dasar
* **Integrasi Astro & Sitemap**:
  - Mengonfigurasi `astro.config.mjs` dengan opsi `site: 'https://kkaradarkediri.com'` agar modul `@astrojs/sitemap` mampu menghasilkan `sitemap-index.xml` secara otomatis saat proses build.
* **Pengaturan Environment (.env)**:
  - Menyusun file `.env` dan `.env.example` untuk kredensial Supabase (`PUBLIC_SUPABASE_URL` dan `PUBLIC_SUPABASE_ANON_KEY`).
  - Mengimplementasikan helper koneksi Supabase di `src/lib/supabase.ts`.
* **Desain Sistem & Styling Modern (`src/styles/global.css`)**:
  - Mengintegrasikan CSS Bootstrap 5.3 dengan Google Font *Plus Jakarta Sans*.
  - Menetapkan variabel CSS palet korporat: *Deep Navy Blue* (`#0f2d59`), *Radar Red Accent* (`#e11d48`), *Emerald Green* (`#10b981`), dan *Amber* (`#f59e0b`).
  - Merancang komponen modern: kartu dengan efek elevasi (*box shadow*), *hero badge*, *floating WhatsApp button*, dan *sticky bottom bar* khusus pengunjung mobile.
* **Aset Logo & Favicon**:
  - Mengonversi `src/assets/images/Logo-KKA.png` menjadi `public/images/logo-kka.webp` dengan ukuran super ringan **81.13 KB** (< 100 KB target).
  - Menjadikan logo KKA sebagai Favicon browser (`public/favicon.ico` dan `public/favicon.png`) serta `apple-touch-icon`.
* **Refactor Header/Navbar Sesuai Desain Referensi**:
  - Menghapus bilah pengumuman atas (*Top announcement bar*).
  - Memasang logo resmi KKA di sisi kiri header dengan batas grid `.container` (posisi logo masuk rapi ke kanan sejajar konten).
  - Menyusun menu navigasi bersih tanpa emoji dekoratif:
    - **Beranda**
    - **Tentang KKA**
    - **Informasi ⌵** (dropdown bersih: *Pendaftaran Mandiri* dan *Pendaftaran Kolektif*)
    - **Regulasi**
    - **Galeri**
    - **Blog**
    - **Kontak**
  - Menghilangkan garis biru bawah (`border-bottom: 3.5px solid`) sesuai permintaan.
  - **Ikon Panah Dropdown Dipertebal**: Ikon panah ke bawah (*chevron*) pada menu "Informasi" diganti dengan SVG bergaris tebal (`stroke-width: 2.8`) agar tampak jelas, proporsional, dan elegan (tidak tipis/samar lagi).
  - **Standardisasi Gaya Link Aktif (Semua Halaman)**: Gaya indikator halaman aktif kini seragam 100% di semua halaman (Beranda, Tentang KKA, Regulasi, Galeri, Blog, Kontak). Link halaman aktif memiliki ketebalan teks *bold* dan garis bawah aksen kuning/emas (`#f59e0b`) yang presisi di bawah teks.
  - **Transformasi Warna Aksen: Merah Menjadi Kuning/Emas (Gold)**: Seluruh elemen beraksen merah di seluruh website (tombol CTA, badge gelombang, garis pemisah hero, border tabel biaya) telah dialihkan ke palet kuning/emas hangat (`#f59e0b` ke `#d97706`), selaras dengan pita medali pada Logo resmi KKA.
  - **Navbar Transparan pada Beranda**: Header pada halaman utama (`/`) dibuat menyatu transparan di atas background gambar Hero dengan teks putih. Ketika halaman di-scroll ke bawah, navbar otomatis bertransisi mulus menjadi bilah **putih bersih** (*solid white* dengan teks gelap `#1e293b`), bukan warna biru. Halaman dalam tetap menggunakan latar putih bersih.
* **Refactor Section Statistik (4 Metrik Data Resmi dengan Gaya Ikon Melingkar)**:
  - Menggabungkan data asli statistik resmi KKA Radar Kediri ke dalam format visual baru yang minimalis tanpa batas bingkai (*borderless*).
  - Setiap data ditampilkan dengan lingkaran ikon biru muda (`#e0f2fe`) dan ikon vektor SVG presisi:
    1. **5.633 Peserta (2025)**: Ikon grafik tren pertumbuhan  *"Meningkat dari 4.920 peserta di 2024"*.
    2. **7 Wilayah Kompetisi**: Ikon pin wilayah/geografis  *"Kota & Kabupaten Se-Karesidenan Kediri"*.
    3. **350+ Sekolah**: Ikon topi edukasi/kelulusan  *"Jenjang SD, SMP, MTs, SMA, SMK, dan MA"*.
    4. **Medali & Hadiah**: Ikon medali pita penghargaan  *"Tabungan pembinaan & piagam resmi"*.
* **Penyesuaian Dimensi Hero Section**:
  - Menambah tinggi Hero menjadi `min-height: 700px` dan memperbesar *padding-top* (`160px`) agar teks dan tombol CTA tampak sedikit lebih ke bawah, lebih lega, dan proporsional terhadap navbar transparan.
* **Refactor Hero Section Sesuai Desain Referensi**:
  - Mengonversi `src/assets/images/hero.png` menjadi `public/images/hero.webp` dengan ukuran super hemat **91.36 KB** (di bawah batas 100 KB).
  - Mengubah tampilan Hero menjadi format *full-width banner* terpusat (*centered layout*) dengan *dark overlay* sinematik.
  - Menampilkan judul utama tebal `Kompetisi Kompetensi Akademik (KKA) 2026`, garis aksen **kuning/gold** (`#f59e0b`) horizontal di bawah judul, dan deskripsi ringkas yang jelas.
  - Menempatkan 2 tombol aksi berbentuk kapsul/pill: **Daftar Mandiri** (warna aksen gradasi **kuning/gold** `#f59e0b` ke `#d97706` sesuai palet pita logo) dan **Daftar Kolektif** (outline transparan dengan efek *backdrop blur*).
  - Menghilangkan fitur panah slider (kanan-kiri) dan titik paginasi agar halaman statis, bersih, dan memuat dalam hitungan milidetik.

* **Refactor Section Wilayah Sesuai Desain Referensi & Konversi Gambar Logo ke WebP (< 100 KB)**:
  - **Konversi 7 Lambang Daerah Resmi ke WebP**:
    - Seluruh gambar lambang daerah dari folder `src/assets/images/` berhasil dikonversi ke format `.webp` berkualitas tinggi dan ditempatkan di `public/images/wilayah/`:
      - `kota-kediri.webp`: **18.90 KB** (dari JPG 33 KB)
      - `kabupaten-kediri.webp`: **19.96 KB** (dari GIF 40 KB)
      - `kabupaten-nganjuk.webp`: **24.22 KB** (dari PNG 250 KB)
      - `kabupaten-tulungagung.webp`: **21.41 KB** (dari PNG 484 KB)
      - `kabupaten-blitar.webp`: **15.91 KB** (dari PNG 55 KB)
      - `kota-blitar.webp`: **23.42 KB** (dari PNG 198 KB)
      - `kabupaten-trenggalek.webp`: **18.28 KB** (dari PNG 190 KB)
    - Semua file berukuran jauh di bawah batas maksimal 100 KB (rata-rata hanya 18-24 KB), memastikan pemuatan kartu instan.
  - **Tata Letak Kartu Sesuai Mockup (4 Atas & 3 Bawah Tengah)**:
    - Baris pertama: 4 kartu wilayah (`Kota Kediri`, `Kabupaten Kediri`, `Kabupaten Nganjuk`, `Kabupaten Tulungagung`).
    - Baris kedua: 3 kartu wilayah (`Kabupaten Blitar`, `Kota Blitar`, `Kabupaten Trenggalek`) diposisikan sejajar di tengah (*centered*) menggunakan grid `justify-content-center`.
  - **Struktur Kartu Modern (`RegionCard.astro`)**:
    - Bagian kepala kartu memuat kotak lambang daerah (*emblem box*) dengan latar putih bersudut lengkung 12px, nama daerah tebal, dan badge biru `KKA 2026`.
    - Deskripsi wilayah disusun menggunakan bahasa Indonesia natural tanpa simbol em-dash (``) dan tanpa emoji AI.
    - Menampilkan 2 kotak jenjang pendidikan dengan ikon toga sarjana vektor SVG: kotak `SD/MI · SMP/MTs` dan kotak `SMA / MA / SMK`.
    - **Dual Call-to-Action (CTA)**: Tetap mempertahankan dua tombol pendaftaran sesuai ketentuan:
      - **Daftar Mandiri** (Solid Royal Blue `#0f52ba`)
      - **Daftar Kolektif** (Aksen Emas/Kuning Hangat `#f59e0b` ke `#d97706`)
  - **Pembersihan Total Emoji & Simbol Em-Dash**:
    - Menghapus seluruh emoji (🏆, 📅, 📍, ⏰, ✉️, 🎯, 🚀, 📸, 🔥, 💬, 🖨️) dan menggantikannya dengan ikon SVG presisi profesional.

---

### Tahap 2: Manajemen Data Bisnis & Modul Kalkulasi
* **Data Referensi (`src/data/competition.ts`)**:
  - **7 Wilayah**: Kota Kediri, Kab. Kediri (Region 1); Nganjuk, Kab. Blitar, Kota Blitar (Region 2); Tulungagung, Trenggalek (Region 3) lengkap dengan path `logoUrl` masing-masing wilayah.
  - **3 Jenjang & Silabus**: SD/MI (Kelas IV-VI), SMP/MTs (Kelas VIII-IX), SMA/MA/SMK (Kelas XI-XII dengan pilihan 2 mapel peminatan).
  - **3 Gelombang Biaya**:
    - Gelombang I (Early Bird: SD 25rb, SMP 35rb, SMA 50rb)
    - Gelombang II (Reguler: SD 30rb, SMP 40rb, SMA 60rb)
    - Gelombang III (Last Call: SD 40rb, SMP 50rb, SMA 75rb)
  - Data rekening panitia (BRI & BCA) serta kontak resmi WhatsApp panitia.
* **Helper Tarif Dinamis (`src/lib/pricing.ts`)**:
  - Fungsi `getActiveWave()` untuk mendeteksi gelombang aktif secara otomatis berdasarkan tanggal sistem.
  - Fungsi `formatRupiah()` untuk format mata uang standar Indonesia.

---

### Tahap 3: Pembuatan Komponen & Halaman Publik (19 Halaman Statis Awal)
* **Komponen Modular**:
  - `BaseLayout.astro`: Layout induk terintegrasi SEO, font preconnect, dan navigasi.
  - `Navbar.astro`: Header responsif dengan info gelombang aktif dan tombol pendaftaran.
  - `Footer.astro`: Footer informatif memuat navigasi lengkap, legalitas UU PDP, dan direktori wilayah.
  - `Seo.astro`: Dukungan meta tag, canonical URL, OpenGraph Facebook, Twitter Card, dan JSON-LD schema (`Event` & `FAQPage`).
  - `PricingTable.astro`: Komponen tabel tarif 3 gelombang.
  - `RegionCard.astro`: Komponen kartu interaktif wilayah berdesain modern sesuai referensi mockup.
  - `WhatsAppFab.astro`: Tombol pintas chat WhatsApp panitia.
* **Daftar Halaman Publik**:
  1. `/` (`src/pages/index.astro`): Beranda lengkap.
  2. `/tentang-kka` (`src/pages/tentang-kka.astro`): Profil, visi, dan misi KKA.
  3. `/informasi` (`src/pages/informasi.astro`): Biaya, jadwal, rekening resmi bank, hadiah juara, dan FAQ.
  4. `/regulasi` (`src/pages/regulasi.astro`): Juknis, syarat peserta, dan tata tertib CBT.
  5. `/kontak` (`src/pages/kontak.astro`): Alamat sekretariat Radar Kediri, kontak WA panitia, dan form pesan.
  6. `/galeri` (`src/pages/galeri.astro`): Dokumentasi kegiatan.
  7. `/blog` (`src/pages/blog.astro`): Blog berita dan pengumuman.
  8. `/artikel` (`src/pages/artikel.astro`): Artikel edukatif dan tips belajar.
  9. `/404` (`src/pages/404.astro`): Halaman error 404 kustom.
  10. `/wilayah/[slug]` (7 halaman dinamis untuk Kota Kediri, Kab. Kediri, Nganjuk, Kab. Blitar, Kota Blitar, Tulungagung, Trenggalek).
  11. `/jenjang/[slug]` (3 halaman dinamis untuk SD/MI, SMP/MTs, SMA/MA/SMK).
  12. `public/_redirects`: Aturan 301 redirect URL Blogspot lama ke URL baru.
  13. `public/robots.txt`: Aturan indexing search engine.

---

### Tahap 4: Sistem Pendaftaran Khusus Wilayah (14 Halaman Dinamis + Template Excel & Parser Otomatis)
* **Pemisahan Jalur Pendaftaran per Kabupaten/Kota (7 x 2 = 14 Halaman Khusus)**:
  - **7 Halaman Pendaftaran Mandiri (`/daftar/mandiri/[slug]`)**:
    - `/daftar/mandiri/kota-kediri/`
    - `/daftar/mandiri/kabupaten-kediri/`
    - `/daftar/mandiri/kabupaten-nganjuk/`
    - `/daftar/mandiri/kabupaten-blitar/`
    - `/daftar/mandiri/kota-blitar/`
    - `/daftar/mandiri/kabupaten-tulungagung/`
    - `/daftar/mandiri/kabupaten-trenggalek/`
    - Fitur: Validasi NISN 10 digit, selector jenjang pendidikan dengan kalkulasi biaya live, pilihan 2 mapel peminatan SMA, upload bukti transfer, pembuatan kode pendaftaran unik (`KKA26-M-KDR-xxxx`), dan konfirmasi langsung ke WhatsApp Panitia.
  - **7 Halaman Pendaftaran Kolektif Sekolah (`/daftar/kolektif/[slug]`)**:
    - `/daftar/kolektif/kota-kediri/`
    - `/daftar/kolektif/kabupaten-kediri/`
    - `/daftar/kolektif/kabupaten-nganjuk/`
    - `/daftar/kolektif/kabupaten-blitar/`
    - `/daftar/kolektif/kota-blitar/`
    - `/daftar/kolektif/kabupaten-tulungagung/`
    - `/daftar/kolektif/kabupaten-trenggalek/`
    - Fitur:
      1. **Unduh Template Resmi Excel**: Disediakan file `template-pendaftaran-kolektif-kka-2026.xlsx` dengan struktur persis sesuai referensi pengguna:
         - Sheet: `Daftar Pendaftar` dan `Petunjuk Pengisian`
         - Kolom A: `Wilayah Sekolah`
         - Kolom B: `Kecamatan`
         - Kolom C: `Jenjang Pendidikan`
         - Kolom D: `Nama Sekolah`
         - Kolom E: `No WhatsApp PIC`
         - Kolom F: `Nama Siswa`
         - Kolom G: `NISN`
         - Kolom H: `Gender`
         - Kolom I: `Kelas`
      2. **Automated Live Excel Parser (SheetJS)**: Guru hanya perlu mengunggah spreadsheet yang telah diisi. Sistem di browser langsung mendeteksi header secara dinamis, membaca data siswa, menghitung total peserta & tagihan gelombang aktif, menampilkan tabel preview lengkap, dan mengisi otomatis data sekolah jika masih kosong.
      3. **Bukti Pembayaran & Notifikasi**: Upload bukti transfer kolektif dan generator kode unik registrasi kolektif (`KKA26-K-xxx-xxxx`) yang siap dikonfirmasi ke panitia via WhatsApp.
  - **3 Halaman Portal Hub**:
    - `/daftar/`: Portal utama pemilihan jalur pendaftaran.
    - `/daftar/mandiri/`: Halaman direktori pemilihan wilayah untuk jalur mandiri.
    - `/daftar/kolektif/`: Halaman direktori pemilihan wilayah untuk jalur kolektif sekolah + link unduh template.
  - **Perbaikan Bug Garis Aktif Navbar pada Menu Dropdown (`Navbar.astro`)**:
    - Mengatasi tabrakan styling antara `::after` default Bootstrap caret (`border-top: .3em solid`) dan garis bawah aktif kuning (`background-color: #f59e0b`).
  - **Resolusi Error Import Path Alias Vite (`@/layouts/BaseLayout.astro`)**:
    - **Penyebab**: Penggunaan alias `@/` pada halaman-halaman pendaftaran baru gagal di-resolve oleh Vite dev server yang sedang berjalan aktif.
    - **Solusi Komprehensif**:
      1. Menstandarisasi seluruh modul import pada `src/pages/daftar/*` menggunakan path relatif standar (`../../../layouts/BaseLayout.astro`, `../../../data/competition`, `../../../lib/pricing`) sehingga dijamin 100% stabil di semua environment tanpa bergantung pada cache alias Vite.
      2. Mendaftarkan alias `@` secara eksplisit pada `astro.config.mjs` (`vite.resolve.alias`) dan `tsconfig.json` (`compilerOptions.paths`).
  - **Penggantian Section Skema Biaya Menjadi Section Interaktif Detail KKA 2026 (`src/components/DetailKKA.astro`)**:
    - Mengintegrasikan 5 tab interaktif sesuai referensi desain pengguna:
      1. **KKA 2026** (Mengapa KKA Penting?): Daftar 8 poin alasan esensial mengikuti kompetisi + foto asli pelaksanaan ujian KKA Radar Kediri (`kka-square-02.webp`).
      2. **Peserta** (Pendaftar & Materi KKA): 3 kartu jenjang (SD/MI, SMP/MTs, SMA/SMK) + foto peserta (`hero.webp`).
      3. **Alur Kompetisi** (Cara Daftar KKA): 4 langkah mudah alur registrasi + foto kegiatan ujian.
      4. **Biaya** (Pendaftaran KKA 2026): Tabel ringkasan 3 gelombang pendaftaran bergradasi rapi + foto dokumentasi.
      5. **Hadiah** (Penghargaan Terbaik): 3 kartu hadiah utama (Uang Pembinaan, Medali Prestasi, Sertifikat Resmi) + foto penyerahan piala di panggung juara KKA (`kka-square-01.webp`).
    - Desain layout dua kolom (teks informasi di sisi kiri dan foto dokumentasi resmi dari folder assets di sisi kanan) dengan sudut rounded modern, bayangan halus, dan transisi tab yang responsif di desktop maupun mobile.
    - **Standardisasi Bobot Judul DETAIL KKA 2026**: Menyelaraskan kelas judul menggunakan `h2 class="fw-bold text-kka-primary mb-2 text-uppercase"` agar seimbang dan serasi 100% dengan judul section pendaftaran wilayah dan section utama lainnya.
  - **Refactor Section Materi Soal KKA 2026 (`src/pages/index.astro`) Sesuai Referensi**:
    - Mengganti tampilan lama menjadi 3 kartu putih bersih yang simetris dan rapi:
      1. **Jenjang SD/MI**: Ikon buku biru terbuka, deskripsi seleksi SMP unggulan via jalur prestasi, kotak info materi (*Matematika & Bahasa Indonesia*), dan tombol CTA *Daftar Sekarang*.
      2. **Jenjang SMP/MTs**: Ikon buku biru terbuka, deskripsi seleksi SMA favorit, kotak info materi (*Matematika & Bahasa Indonesia*), dan tombol CTA *Daftar Sekarang*.
      3. **Jenjang SMA/MA/SMK**: Ikon buku biru terbuka, deskripsi seleksi PTN via jalur prestasi akademik, kotak info materi (*Matematika, B. Indonesia, B. Inggris + 2 Mapel Pilihan Jurusan*), dan tombol CTA *Daftar Sekarang*.
  - **Carousel Slider Testimoni dengan Navigasi Panah Kanan-Kiri (`src/pages/index.astro`)**:
    - Menambahkan data ulasan realistis menjadi 7 testimoni mencakup siswa juara SD, SMP, SMA, guru pembina, koordinator CBT, dan wali murid dari berbagai kabupaten/kota se-Karesidenan Kediri.
    - Mengubah tampilan grid statis menjadi carousel slider interaktif dengan dukungan *touch swipe* (mobile) dan tombol panah navigasi bulat (*prev/next button*).
    - Menerapkan CSS *scroll snap* (`scroll-snap-type: x mandatory; scroll-behavior: smooth`) tanpa scrollbar yang mengganggu visual, serta kalkulasi jarak geser otomatis berbasis lebar kartu aktif.
  - **Penyederhanaan Footer Bersih 4 Kolom Simetris (`src/components/Footer.astro`) Sesuai Referensi**:
    - Menghilangkan ikon-ikon dekoratif berlebih dan menyusun 4 kolom simetris yang sangat rapi dan proporsional:
      1. **Kolom 1 (Brand)**: Logo resmi KKA + paragraf deskripsi ringkas ajang KKA 2026.
      2. **Kolom 2 (Navigasi)**: Garis aksen emas (`#f59e0b`) di bawah judul + daftar 6 link navigasi penting dengan chevron sederhana (`›`).
      3. **Kolom 3 (Wilayah)**: Garis aksen emas (`#f59e0b`) di bawah judul + daftar 7 kabupaten/kota se-Karesidenan Kediri dengan chevron sederhana (`›`) tanpa badge berlebih.
      4. **Kolom 4 (Hubungi Kami)**: Teks ajakan ramah + 3 kartu kontak admin resmi WhatsApp (*Pak Endro Admin 1*, *Mas Fajar Admin 2*, *Mas Wildan Admin 3*) berlatar kartu gelap rapi (`#121c2a`).
    - Bilah hak cipta minimalis di bawah dengan pemisah border tipis elegan.
  - **Integrasi Nomor WhatsApp Resmi Admin KKA 2026 Sesuai Referensi Pengguna**:
    - Memperbarui data kontak WhatsApp terpusat pada `src/data/competition.ts`:
      1. **WhatsApp Admin 1**: `0812-3550-8957 (Pak Endro)` (URL: `https://wa.me/6281235508957`, Bidang: Pendaftaran & Teknis)
      2. **WhatsApp Admin 2**: `0813-5913-8251 (Mas Fajar)` (URL: `https://wa.me/6281359138251`, Bidang: Verifikasi Pembayaran)
      3. **WhatsApp Admin 3**: `0815-5897-90831 (Mas Wildan)` (URL: `https://wa.me/62815589790831`, Bidang: Informasi Umum & Sekolah)
    - **Penyelarasan Desain Kartu Kontak**:
      - Mengadaptasi ikon WhatsApp lingkaran biru solid (`#0066ff`/`#0d6efd`) dengan logo telepon putih bersih sesuai tangkapan layar referensi pengguna.
      - Pada **Footer** (`src/components/Footer.astro`): Label admin `WhatsApp Admin 1/2/3` jelas terbaca dengan nomor telepon biru menyala (`#38bdf8`) dan nomor terformat lengkap.
      - Pada **Halaman Kontak** (`src/pages/kontak.astro`): Kartu putih bersih dengan border halus, ikon lingkaran biru, judul `WhatsApp Admin 1/2/3`, nomor telepon beraksen biru tebal `0812-3550-8957 (Pak Endro)`, badge peran tugas, dan tombol aksi `Chat`.
  - **Optimalisasi Tata Letak Footer Menjadi 3 Kolom Lega & Pemisahan Kartu Admin**:
    - **Menghapus Kolom Wilayah**: Mengeliminasi kolom wilayah pada footer untuk menghilangkan kesan sempit (*kerapetan*). Footer kini memiliki 3 kolom yang proporsional dan memiliki *breathing room* yang sangat nyaman:
      1. **Kolom 1 (Brand & Deskripsi)**: `col-lg-4` dengan logo dan deskripsi ajang.
      2. **Kolom 2 (Navigasi)**: `col-lg-3` dengan 6 tautan utama dan jarak vertikal antar tautan 12px.
      3. **Kolom 3 (Hubungi Kami)**: `col-lg-4` dengan 3 kartu WhatsApp Admin.
    - **Pemberian Jarak Vertikal Antar Kartu Admin**:
      - Membungkus kartu admin dengan class khusus `.footer-wa-list` yang memiliki `gap: 14px`.
      - Kartu tidak lagi menempel vertikal satu sama lain, melainkan memiliki batas kartu yang tegas, rapi, dan mudah diklik (*clickable target area*).

---

  - **Transformasi Widget WhatsApp Menjadi Live Support Interaktif & Tombol Go To Top (`WhatsAppFab.astro`)**:
    - **Pembaruan Teks & Posisi Tombol FAB**:
      - Mengubah teks tombol mengambang dari *"Chat Panitia"* menjadi *"Live Support"* dengan ikon resmi WhatsApp.
      - Menurunkan posisi floating widget dari semula terlalu tinggi (`bottom: 84px`) menjadi posisi standar yang nyaman di sudut kanan bawah (`bottom: 24px; right: 24px` pada desktop, dan `bottom: 68px; right: 16px` pada mobile).
    - **Penyematan Tombol "Go To Top" (Kembali ke Atas)**:
      - Menambahkan tombol melingkar elegan (`#btnScrollTop`) tepat di atas tombol Live Support.
      - Dilengkapi animasi transisi halus (`opacity` dan `transform`), otomatis muncul saat pengguna menggulir ke bawah (`window.scrollY > 250`), dan menyajikan efek *smooth scroll* kembali ke puncak halaman saat ditekan.
    - **Modal Popup Live Support Sesuai Desain Referensi Pengguna**:
      - Saat tombol *Live Support* diklik, muncul modal popup elegan di sudut kanan bawah:
        1. **Header Biru Gradien**: Menampilkan ikon WhatsApp, judul *"Admin Support KKA"*, indikator status hijau *"● Online"*, dan tombol silang penutup (*close button* `✕`).
        2. **Instruksi Pengguna**: *"Halo! Silakan pilih Admin yang ingin Anda hubungi, lalu ketik pesan Anda di bawah:"*.
        3. **3 Kartu Pilihan Admin**: Radio card interaktif dengan indikator titik hijau saat aktif:
           - **Pak Endro**: *Admin Wilayah Kabupaten Kediri*
           - **Mas Fajar**: *Admin Wilayah Kota Kediri*
           - **Mas Wildan**: *Admin Wilayah Nganjuk & Blitar*
        4. **Kotak Teks Pesan Kustom**: Textarea ber-placeholder *"Ketik pesan Anda di sini..."* yang otomatis fokus saat modal terbuka.
        5. **Tombol "Kirim"**: Tombol hijau berikon pesawat kertas (*send icon*) yang langsung merangkai pesan dan membuka tab WhatsApp sesuai admin terpilih.
      - Mendukung penutupan popup via tombol silang, klik di luar modal (*outside click*), maupun tombol `Escape`.

  - **Penerapan Sistem Breadcrumbs di Seluruh Halaman (`Breadcrumb.astro`)**:
    - **Komponen Universal `src/components/Breadcrumb.astro`**:
      - Mendukung tema gelap (*dark theme*) untuk disematkan di section header biru navy (`bg-gradient-navy`), dan tema terang (*light theme*) untuk latar belakang terang.
      - Dilengkapi ikon Beranda (Home SVG), pemisah chevron bersih (`›`), styling tautan dengan aksen emas saat hover (`#f59e0b`), dan teks aktif putih tebal.
      - Otomatis menginjeksi metadata terstruktur **Schema.org BreadcrumbList (JSON-LD)** untuk optimasi SEO dan rich snippets di hasil pencarian Google.
    - **Penyematan di Seluruh Halaman**:
      - **Informasi & Biaya**: `Beranda › Informasi Utama`
      - **Tentang KKA**: `Beranda › Tentang KKA`
      - **Regulasi & Juknis**: `Beranda › Petunjuk Teknis & Regulasi`
      - **Galeri Foto**: `Beranda › Galeri Kegiatan`
      - **Artikel & Berita**: `Beranda › Artikel & Berita`
      - **Kontak Panitia**: `Beranda › Hubungi Panitia`
      - **Portal Pendaftaran**: `Beranda › Pendaftaran`
      - **Direktori Wilayah Mandiri**: `Beranda › Pendaftaran › Pendaftaran Mandiri`
      - **Formulir Mandiri (7 Wilayah)**: `Beranda › Pendaftaran › Pendaftaran Mandiri › [Nama Wilayah]`
      - **Direktori Wilayah Kolektif**: `Beranda › Pendaftaran › Pendaftaran Kolektif`
      - **Formulir Kolektif (7 Wilayah)**: `Beranda › Pendaftaran › Pendaftaran Kolektif › [Nama Wilayah]`
      - **Halaman Khusus Wilayah**: `Beranda › Wilayah Kompetisi › [Nama Wilayah]`
      - **Halaman Jenjang Pendidikan**: `Beranda › Jenjang Pendidikan › [SD / SMP / SMA]`
      - **Halaman 404**: `Beranda › Halaman Tidak Ditemukan (404)`
    - **Penyelarasan & Reposisi Tata Letak Breadcrumbs (Presisi & Rapi)**:
      - Sesuai arahan, posisi breadcrumbs yang sebelumnya berada di sudut kiri atas header telah **dipindahkan ke bawah teks deskripsi/subjudul halaman** agar tampak menyatu, simetris, dan rapi dalam satu kesatuan hierarki visual (Badge → Judul Utama → Subjudul/Deskripsi → Breadcrumb).
      - Menambahkan properti fleksibel `align?: 'left' | 'center' | 'right'` pada `Breadcrumb.astro` dengan nilai bawaan `'center'`.
      - Pada halaman informasi umum (`tentang-kka`, `informasi`, `regulasi`, `galeri`, `artikel`, `kontak`, `daftar`, `wilayah`, `jenjang`, `404`), breadcrumb diposisikan tepat di bawah paragraf pembuka secara **terpusat (*center-aligned*)**.
      - Pada halaman form pendaftaran per wilayah (`/daftar/mandiri/[slug]` dan `/daftar/kolektif/[slug]`), breadcrumb diposisikan tepat di bawah deskripsi form dengan posisi rata kiri (*left-aligned*) serasi dengan kotak lambang emblem daerah.

  - **Pembersihan & Penghapusan Halaman Redundan (`informasi.astro`)**:
    - Sesuai arahan agar tidak terjadi duplikasi informasi (*"biar ga double double dan enak aja"*), file `src/pages/informasi.astro` resmi dihapus karena seluruh konten jadwal kompetisi, biaya per gelombang, alur pendaftaran, dan FAQ sudah tersaji lengkap dan terintegrasi di Beranda (`index.astro`) dan form pendaftaran.
    - **Penyelarasan Tautan & Navigasi**:
      - `src/components/Footer.astro`: Mengganti tautan navigasi *Informasi Utama* menjadi tautan *Beranda* (`/`).
      - `src/components/Navbar.astro`: Menghapus pemeriksaan `/informasi` pada `isInfoActive` dropdown menu.
      - `src/pages/tentang-kka.astro`: Mengalihkan tombol kedua pada section CTA ke *Daftar Kolektif* (`/daftar/kolektif`).
      - `public/_redirects`: Menambahkan aturan pengalihan bersih `/informasi / 301` untuk mencegah broken link dari mesin pencari atau histori browser pengguna.

  - **Redesain Section Konten Halaman Tentang KKA (`tentang-kka.astro`)**:
    - Mengikuti referensi layout bernuansa akademis-profesional yang bersih (*clean & educational*):
      - **Kolom Kiri**: Menampilkan judul *"Kompetisi Kompetensi Akademik (KKA) 2026"* dan 2 paragraf pengantar mengenai transformasi kurikulum, evaluasi TKA Nasional, serta penjembatanan soal Higher Order Thinking Skills (HOTS).
      - **Baris Statistik Utama (*Stat Counters*)**: 3 metrik kuantitatif kepesertaan:
        1. **362+** *Lembaga peserta* (dengan garis aksen biru)
        2. **5.633** *Peserta terdaftar* (dengan garis aksen biru)
        3. **7** *Wilayah kompetisi* (dengan garis aksen biru)
      - **Kolom Kanan**: Card visual resmi logo KKA 2026 (`/images/logo-kka.webp`) berbingkai putih modern dengan bayangan halus (*soft shadow*) dan sudut melengkung elegan (`rounded-4`).
      - **Kartu Sorotan (*Feature Cards*)**: 3 kartu keunggulan kompetisi berikon SVG biru minimalis:
        1. **Dari KKA Menuju PTN Favorit** (Ikon Trofi)  *"Bukan sekadar kompetisi  KKA adalah batu loncatan nyata."*
        2. **Bukti Nyata** (Ikon Medali Roset)  *"Prestasi di KKA bukan akhir perjalanan, melainkan awal dari pencapaian yang lebih besar."*
        3. **Standar Soal Teruji** (Ikon Buku & Centang)  *"Disusun bersama Neutron Yogyakarta berstandar TKA dan penalaran analitis HOTS."*
      - **Visi & Misi Terpadu**: Diposisikan di bawahnya dengan card minimalis yang serasi, menonjolkan kredibilitas institusi bagi sekolah dan pendidik.
    - **Penambahan Section Penyelenggara & Mitra**:
      - Ditempatkan di bawah Visi & Misi dengan latar belakang *slate subtle* (`#f8fafc`) yang lembut.
      - **Kolom Kiri**: Keterangan penyelenggaraan resmi oleh **Jawa Pos Radar Kediri**, kemitraan dengan **Neutron Yogyakarta** (official partner penyusun soal & sistem ujian), serta dukungan dari Cabdindik Jawa Timur dan Kemenag wilayah, dilengkapi tombol pill *"Daftar Sekarang"*.
      - **Kolom Kanan (Grid 2x2 Rekam Jejak/Milestones)**:
        1. **KKA dari Tahun ke Tahun** (Ikon Aktivitas)  *"KKA tumbuh bersama antusiasme pelajar dan kepercayaan sekolah se-Karesidenan Kediri."*
        2. **KKA 2024** (Ikon Perisai)  *"3 wilayah · 4.920 peserta · 225 finalis"*
        3. **KKA 2025** (Ikon Trofi)  *"7 wilayah · 5.633 peserta · 525 finalis"*
        4. **KKA 2026** (Ikon Tim/Users & Badge "Edisi 2026")  *"7 wilayah · Target lebih besar, lebih kompetitif!"*
    - **Penyelarasan Banner CTA Final (Seragam dengan Beranda)**:
      - Mengganti CTA lama menjadi section *navy gradient* bertekstur premium (`bg-gradient-navy`), dilengkapi badge *"KKA Radar Kediri 2026"*, judul *"Tertarik Menguji Kemampuanmu di KKA 2026?"*, dan dua tombol aksi utama: `btn-kka-red` (*Daftar Mandiri*) dan `btn-outline-light` (*Daftar Kolektif Sekolah*).

  - **Redesain Menyeluruh Halaman Regulasi Kompetisi (`regulasi.astro`)**:
    - **Header & Breadcrumb**: Badge oranye resmi *"ATURAN RESMI"*, judul *"Regulasi Kompetisi KKA 2026"*, deskripsi panduan integritas, serta breadcrumb terpusat di bawahnya.
    - **Notice Box (*Penting Untuk Diketahui*)**: Kartu beraksen garis biru tebal di sisi kiri (`border-start: 4.5px solid #0d6efd`) dan ikon perisai seru biru, menegaskan pentingnya pemahaman aturan sebelum mendaftar.
    - **10 Kartu Regulasi Terstruktur dengan Ikon & Nomor Lingkaran (*Numbered Badges*)**:
      1. **Ketentuan Pendaftaran** (Ikon Clipboard)  5 poin aturan registrasi & validasi.
      2. **Ketentuan Peserta** (Ikon Pengguna)  4 poin persyaratan jenjang SD/SMP/SMA & kejujuran data.
      3. **Peraturan Pelaksanaan** (Ikon CBT)  5 poin pelaksanaan online & tanggung jawab pengawasan sekolah.
      4. **Peraturan Grand Final** (Ikon Trofi)  6 poin kehadiran tatap muka, seragam resmi, & ketepatan waktu.
      5. **Materi & Soal Kompetisi** (Ikon Buku)  5 poin standar TKA Kemendikdasmen & kerahasiaan bank soal.
      6. **Penilaian & Pengumuman Hasil** (Ikon Grafik)  4 poin sistem scoring terpusat & rilis 22 September 2026.
      7. **Dokumentasi & Publikasi** (Ikon Kamera)  4 poin peliputan resmi & etika media massa.
      8. **Reward & Penghargaan** (Ikon Medali)  4 poin apresiasi trofi, tabungan tunai, dan e-sertifikat.
      9. **Hak Panitia** (Ikon Perisai)  4 poin hak diskualifikasi & adaptasi teknis demi keadilan kompetisi.
      10. **Persetujuan Peserta** (Ikon Centang)  4 poin komitmen integritas peserta & sekolah.
    - **Tampilan Bersih Langsung ke Modul**: Bar *Status Dokumen & Cetak Dokumen* dihapus sesuai arahan pengguna agar halaman langsung fokus dan bersih pada kartu *Penting Untuk Diketahui* dan 10 modul regulasi.
    - **CTA Banner Final**: Dilengkapi banner penutup serasi berlatar *navy gradient* dengan tombol *Daftar Mandiri* dan *Daftar Kolektif Sekolah*.

  - **Pembaruan Galeri Foto Dokumentasi Resmi KKA (`galeri.astro`)**:
    - **Penerapan 12 Foto Asli Teroptimasi WebP (Maksimal <= 100 KB)**:
      - Seluruh foto asli dari folder `public/images/galeri/` telah dikonversi secara otomatis ke format modern **.webp** dengan kompresi tingkat lanjut sehingga ukuran setiap file berada di bawah 100 KB (berkisar antara 27 KB - 86 KB) tanpa mengurangi kejernihan visual:
        1. `KKA 2025 Square 29.webp` (60.8 KB): Ratusan Finalis di Hall Utama Grand Final KKA.
        2. `KKA 2025 Square 24.webp` (69.4 KB): Penganugerahan Juara Jenjang SD/MI se-Karesidenan Kediri.
        3. `KKA 2025 Square 25.webp` (67.0 KB): Penganugerahan Juara Jenjang SMP/MTs di Panggung Utama.
        4. `KKA 2025 Square 26.webp` (70.3 KB): Penganugerahan Juara Jenjang SMA/MA/SMK bersama Radar Kediri & Neutron.
        5. `KKA 2025 Square 03.webp` (56.5 KB): Penyerahan Piagam Juara 1 SMA Kabupaten Nganjuk.
        6. `KKA 2025 Square 27.webp` (55.9 KB): Peraih Juara 1 & 3 SMA Kota Kediri.
        7. `KKA 2025 Square 04.webp` (84.4 KB): Semarak Meja Registrasi Ulang Peserta Finalis KKA.
        8. `KKA 2025 Square 05.webp` (47.7 KB): Verifikasi Berkas & Pembagian Kartu Peserta Ujian.
        9. `KKA 2025 Square 10.webp` (34.1 KB): Konsentrasi Peserta Mengerjakan Ujian CBT Grand Final.
        10. `KKA 2025 Square 23.webp` (39.2 KB): Khidmat Seremoni Menyanyikan Lagu Indonesia Raya.
        11. `KKA 2025 Square 08.webp` (34.8 KB): Pendalaman Materi & Kisi-Kisi Soal Neutron.
        12. `KKA 2025 Square 28.webp` (27.9 KB): Kesiapan Mental Siswa Mempersiapkan Strategi Ujian.
      - File lama `.jpg` telah dibersihkan sehingga repositori tetap ramping dan efisien.
    - **Fitur Filter Kategori Interaktif**: Tombol pill (*Semua Foto*, *Grand Final*, *Juara & Penghargaan*, *Pelaksanaan Ujian*, *Registrasi & Suasana*) untuk memilah foto secara instan.
    - **Modal Lightbox Foto (Pop-up Zoom)**: Setiap kartu foto dapat diklik untuk membuka foto dalam ukuran besar disertai judul, kategori, dan deskripsi detail.
    - **CTA Banner Final**: Dilengkapi banner penutup *navy gradient* serasi beranda dengan tombol *Daftar Mandiri* dan *Daftar Kolektif Sekolah*.

  - **Penyelarasan Kartu Pengumuman Regulasi Menjadi "Competition Regulations" (`src/pages/regulasi.astro`)**:
    - Mengganti kotak pemberitahuan *"Penting Untuk Diketahui"* menjadi kartu terpusat (*centered card*) bersih dan modern sesuai referensi pengguna:
      - **Judul Utama**: `Competition Regulations` dengan warna teks merah tegas (`#dc2626` / `text-danger`), font tebal, dan letter-spacing rapi.
      - **Subjudul / Keterangan**: *"Pastikan Anda memahami seluruh ketentuan sebelum mendaftarkan peserta."* dengan warna teks sekunder yang nyaman dibaca.
      - **Aksen Visual**: Mengganti border samping biru menjadi aksen garis atas merah elegan (`border-top: 3.5px solid #dc2626`) dengan latar putih berbayang halus (`shadow-sm`) dan sudut melengkung modern (`rounded-4`).

  - **Penyelarasan Modal Preview Foto Menjadi Full-Screen Dark Overlay Bersih (`src/pages/galeri.astro`)**:
    - Merombak total tampilan modal preview foto (*lightbox*) sesuai dengan tangkapan layar referensi pengguna:
      - **Overlay Gelap Penuh**: Menggunakan backdrop gelap transparan (`rgba(0, 0, 0, 0.88)`) yang menutupi layar secara mulus tanpa batas kartu modal putih.
      - **Tombol Tutup (Close Button)**: Tombol silang putih minimalis (`✕`) di pojok kanan atas (`position: fixed; top: 20px; right: 24px`) dengan efek hover halus.
      - **Tampilan Foto Terpusat**: Gambar ditampilkan besar di tengah layar dengan rasio aslinya (`max-height: 76vh; object-fit: contain;`) dengan sudut halus dan bayangan lembut (`box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6)`).
      - **Keterangan Foto Tunggal**: Teks deskripsi foto terpusat tepat di bawah gambar berwarna putih (`color: rgba(255, 255, 255, 0.95)`), bersih tanpa kotak/card putih berlebih.
      - **Interaksi Fleksibel**: Dapat ditutup dengan mengklik tombol silang, mengklik latar belakang gelap, atau menekan tombol `Escape`.

  - **Penyederhanaan Tampilan Halaman Kontak Menjadi 2 Kolom Bersih (`src/pages/kontak.astro`)**:
    - Merombak halaman kontak sesuai tangkapan layar referensi pengguna menjadi tata letak yang ringkas, bersih, dan fungsional:
      - **Banner Peringatan Penipuan (Notice Card)**: Kartu putih melengkung modern dengan aksen garis merah kiri tebal (`border-left: 4.5px solid #dc2626`), ikon segitiga seru merah, dan pesan tegas mengenai rekening dan nomor kontak resmi KKA.
      - **Kolom Kiri - Layanan Informasi**: Kartu putih dengan ikon headset biru, judul *"Layanan Informasi"*, dan 4 kotak kontak rapi (*WhatsApp Admin 1*, *WhatsApp Admin 2*, *WhatsApp Admin 3*, *Website Resmi*) dengan nomor telepon biru menyala yang dapat langsung diklik menuju WhatsApp.
      - **Kolom Kanan - Metode Pembayaran**: Kartu putih dengan ikon dompet/kartu biru, judul *"Metode Pembayaran"*, serta kotak informasi Bank BRI Cabang Kediri (`No. Rek: 0033-0100-3455-560 a.n Heri Muda Setiawan`) berlogo resmi BRI, disertai catatan kaki unggah bukti transfer.
      - **CTA Banner Final Seragam**: Penutup ajakan daftar bernuansa navy gradient dengan tombol pendaftaran mandiri dan kolektif sekolah.

  - **Penyederhanaan Judul "Competition Regulations" Tanpa Bingkai Kartu (`src/pages/regulasi.astro`)**:
    - Menghilangkan kontainer kotak/kartu putih pada teks *Competition Regulations*, sehingga tampil langsung sebagai heading teks bersih dan terpusat (*direct typography*):
      - **Judul**: `Competition Regulations` berwarna merah tegas (`#dc2626`), tebal, terpusat.
      - **Keterangan**: *"Pastikan Anda memahami seluruh ketentuan sebelum mendaftarkan peserta."* berwarna abu-abu netral terpusat di bawah judul.

  - **Penyelarasan Teks Banner Header Kontak (`src/pages/kontak.astro`)**:
    - Memperbarui komponen banner header kontak:
      - **Badge Kategori**: Menyematkan badge merah elegan `<span class="badge bg-danger rounded-pill px-3 py-1 mb-2">Hubungi Kami</span>`.
      - **Judul Utama**: `Kontak Resmi KKA Radar Kediri 2026`.
      - **Subjudul Lengkap**: *"Kontak resmi kegiatan Kompetisi Kompetensi Akademik (KKA) Jawa Pos Radar Kediri. Silakan hubungi kami untuk informasi kerja sama, sponsor, atau kendala pendaftaran."*
      - **Navigasi Breadcrumb**: Terletak rapi tepat di bawah subjudul (`Beranda › Kontak Resmi`).

  - **Konversi dan Integrasi Logo Bank BRI Resmi (`public/images/bri.webp` & `src/pages/kontak.astro`)**:
    - Mengonversi aset `public/images/bri.png` menjadi format WebP modern ultra-ringan:
      - **Ukuran File**: Berhasil dikonversi menjadi **5.45 KB** (jauh di bawah batas toleransi 80 KB).
      - **Kualitas & Transparansi**: Mode RGBA dengan preservasi transparansi penuh dan kualitas optimal 90.
      - **Penerapan di Halaman Kontak**: Disematkan pada kartu *Metode Pembayaran* sebagai `img` berukuran proporsional (`62px x 62px`), tajam, dan responsif.

  - **Penyelarasan Dimensi Tombol CTA Hero Beranda Menjadi Lebih Ramping (`src/pages/index.astro`)**:
    - Menyesuaikan ukuran tombol *Daftar Mandiri* dan *Daftar Kolektif* pada hero section beranda agar terlihat lebih ramping, ramping, dan modern:
      - Menghapus kelas bulky `btn-lg` dan padding utility Bootstrap `py-3 px-4` yang sebelumnya membuat pil tombol tampak terlalu tebal/gemuk.
      - Menetapkan padding presisi `padding: 10px 24px` dan ukuran font proporsional `1rem` pada `.btn-hero-cta` dan `.btn-hero-outline`.
      - Menjaga bentuk kapsul melengkung penuh (`border-radius: 9999px`) dengan efek interaktif hover yang responsif.

  - **Perbaikan Masalah Layar Mobile Bergeser Horizontal (*Horizontal Overflow / Dragging Bug*)**:
    - Memperbaiki akar penyebab halaman yang dapat digeser ke samping (*horizontal bouncing*) pada tampilan layar ponsel:
      1. **Proteksi Root & Body**: Menambahkan `overflow-x: hidden; width: 100%; max-width: 100%;` pada tag `html`, `body`, dan `main` di `global.css` serta `BaseLayout.astro`.
      2. **Pembatasan Tab Navigasi & Carousel**: Memberikan `width: 100%; max-width: 100%;` pada `.detail-tab-nav` (`DetailKKA.astro`) dan `.testimoni-slider-track` (`index.astro`) agar flex child yang panjang tidak meregangkan container melampaui lebar layar.
      3. **Penyempurnaan Dialog Pop-up Live Support**: Menambahkan `display: none;` saat tidak aktif pada modal `.wa-support-popup` di `WhatsAppFab.astro` agar tidak menciptakan ruang tak kasat mata di luar batas kanan layar, serta membatasi `max-width: calc(100% - 32px)`.
      4. **Bilah Sticky Bawah Mobile**: Memastikan `.mobile-sticky-cta` memiliki `width: 100%; max-width: 100%; box-sizing: border-box;` tanpa margin negatif.

  - **Redesain Bilah Aksi Bawah Mobile Menjadi Bottom Navigation Bar Biru 3 Tombol (`WhatsAppFab.astro` & `global.css`)**:
    - Merombak bilah sticky bawah pada tampilan ponsel sesuai tangkapan layar referensi pengguna:
      - **Warna & Tampilan**: Berlatar biru solid (`#1d72f2`) penuh yang elegan, melekat di dasar layar ponsel dengan shadow halus (`box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.12)`).
      - **3 Menu Aksi Presisi**:
        1. **Daftar Kolektif**: Ikon grup/pengguna putih + label teks `Daftar kolektif` menuju `/daftar/kolektif`.
        2. **Daftar Mandiri**: Ikon toga/kelulusan putih + label teks `Daftar mandiri` menuju `/daftar/mandiri`.
        3. **Chat Admin**: Ikon WhatsApp putih + label teks `Chat admin` yang langsung memicu/membuka modal Live Support pilihan admin WhatsApp.
      - **Integrasi Responsif**: Pada perangkat seluler, tombol floating WhatsApp otomatis disembunyikan karena sudah terintegrasi rapi pada slot ketiga bilah bawah, menjaga layar tetap lega dan bebas gangguan visual.

  - **Perbaikan Navbar Sticky Pada Halaman Selain Beranda (`src/components/Navbar.astro`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`)**:
    - **Penyebab Masalah**:
      - Pada halaman Beranda (`/`), navbar menggunakan mekanisme JavaScript yang mengubah posisi elemen menjadi `position: fixed` saat di-scroll lebih dari 40px, sehingga tetap melayang di atas.
      - Pada halaman lain (seperti `/tentang-kka`, `/regulasi`, `/kontak`, `/galeri`, dsb.), navbar menggunakan Bootstrap class `.sticky-top` (`position: sticky`).
      - Penggunaan `overflow-x: hidden` pada elemen `body` atau `html` sebelumnya memicu perilaku standar browser di mana container scroll terpotong (*overflow clipping*), yang secara otomatis mematikan fungsi `position: sticky` pada seluruh elemen anaknya. Akibatnya navbar pada halaman-halaman tersebut ikut terseret ke atas dan hilang saat di-scroll.
    - **Solusi yang Diterapkan**:
      1. **Migrasi `overflow-x: hidden` ke `overflow-x: clip`**: Mengganti `overflow-x: hidden` pada `html`, `body`, dan `main` di `global.css` dan `BaseLayout.astro` dengan `overflow-x: clip`. Properti modern ini mencegah halaman tergeser ke samping (*horizontal drag*) tanpa menciptakan clipping context yang merusak `position: sticky`.
      2. **Deklarasi Eksplisit `.header-kka.navbar-solid`**: Menambahkan deklarasi tegas `position: -webkit-sticky; position: sticky !important; top: 0 !important; left: 0; right: 0; width: 100%; z-index: 1030 !important; background-color: rgba(255, 255, 255, 0.98) !important; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);` pada `Navbar.astro`.
      3. **Penyelarasan Scroll Listener**: Memperbarui event listener scroll di `Navbar.astro` agar berjalan di seluruh halaman dan menambahkan kelas `.scrolled` untuk elevasi bayangan yang halus (*smooth shadow elevation*).

  - **Pembaruan Total Formulir Pendaftaran Mandiri (`src/components/FormPendaftaranMandiri.astro`, `src/data/schools.ts`, `src/pages/daftar/mandiri/`)**:
    - **Sesuai Referensi Visual & Spesifikasi Pengguna**:
      1. **Bagian 1 (Data Sekolah & Penanggung Jawab)**:
         - **Wilayah Sekolah**: Dropdown otomatis 7 Kabupaten/Kota se-Karesidenan Kediri (Kab. Nganjuk, Kota Kediri, Kab. Kediri, Kota Blitar, Kab. Blitar, Kab. Tulungagung, Kab. Trenggalek).
         - **Kecamatan Sekolah**: Dropdown dinamis berjenjang (*cascade*) yang langsung menyajikan seluruh kecamatan resmi sesuai wilayah yang dipilih (misal: memilih Nganjuk memunculkan 20 kecamatan di Nganjuk).
         - **Jenjang Pendidikan**: Dropdown pilihan jenjang SD/MI, SMP/MTs, dan SMA/MA/SMK.
         - **Asal Sekolah / Madrasah**: Dropdown dinamis berdasarkan kombinasi Kecamatan + Jenjang, plus opsi `+ Sekolah Lainnya (Ketik Manual)` dengan kolom isian teks otomatis jika sekolah belum terdata.
         - **Nomor WhatsApp Aktif**: Kolom input nomor telepon/WhatsApp siswa/wali/penanggung jawab.
      2. **Bagian 2 (Data Peserta Dinamis)**:
         - Tampilan kartu peserta berbingkai rapi (`Peserta #1`).
         - Kolom isian: **Nama Siswa**, **NISN (10 Digit)**, **Gender (Dropdown)**, dan **Kelas (Dropdown)**.
         - Opsi kelas otomatis beradaptasi dengan Jenjang yang dipilih (SD: Kelas 4–6, SMP: Kelas 7–9, SMA: Kelas 10–12).
         - Tombol **`+ Tambah Siswa`**: Menambahkan blok kartu siswa baru (`Peserta #2`, `Peserta #3`, dst.) secara dinamis di sisi klien.
         - Tombol **`🗑 Hapus`**: Menghapus peserta terkait dan melakukan re-indeks penomoran serta kalkulasi biaya otomatis.
      3. **Bagian 3 (Pembayaran & Kalkulasi Instan)**:
         - Banner info nomor rekening resmi Panitia KKA Radar Kediri (Bank BRI & Bank BCA).
         - **Kalkulasi Biaya Instan**: Menampilkan tarif per jenjang (Early Bird Gelombang 1) x jumlah siswa terdaftar secara otomatis dan *real-time*.
         - Input unggah bukti transfer pembayaran (maks. 2MB).
         - Tombol submit `✔ Daftar` berukuran penuh berwarna biru sesuai desain referensi.
  - **Pembaruan Total Formulir Pendaftaran Kolektif (`src/components/FormPendaftaranKolektif.astro`, `src/pages/daftar/kolektif/`)**:
    - **Sesuai 2 Status Tampilan (*State*) Referensi Pengguna**:
      1. **Tampilan Sebelum Unggah Excel (State 1)**:
         - Bingkai kartu bergaris biru royal tegas (`border: 2px solid #2563eb`).
         - Judul bagian bergaris vertikal biru: `| 1. Unggah Berkas Pendaftaran (Excel)`.
         - Tombol `📥 Unduh Template Excel` format `.xlsx` resmi.
         - Kotak area seret & lepas (*drag and drop zone*) bergaris putus-putus dengan ikon file Excel biru dan tombol `📁 Pilih Berkas`.
         - Kotak hijau hasil pembacaan serta kartu `Rincian Biaya` disembunyikan (*hidden*) sampai file dipilih.
         - Bagian `| 2. Pembayaran & Konfirmasi` menampilkan info rekening panitia, kolom unggah bukti transfer, dan tombol `☁ Kirim Pendaftaran Kolektif`.
      2. **Tampilan Sesudah Unggah Excel (State 2)**:
         - SheetJS secara otomatis membaca file Excel di sisi klien (*client-side parsing*).
         - Kotak validasi hijau muncul: `✔ Berkas Valid & Berhasil Dibaca!`.
         - Ekstraksi metadata sekolah 2 kolom: **Nama Sekolah**, **WhatsApp PIC**, **Wilayah Sekolah**, **Kecamatan Sekolah**, dan **Jenjang Pendidikan**.
         - Tabel daftar peserta siswa (`#`, `Nama Siswa`, `NISN`, `Gender`, `Kelas`) dengan sticky header.
         - Kartu **`📋 Rincian Biaya`** otomatis muncul dan mengkalkulasi tarif:
           - Menampilkan Jumlah Peserta (cth: `1 Siswa`).
           - Tarif per siswa sesuai jenjang (Early Bird Gelombang 1).
           - Garis putus-putus pembatas dan **Total Pembayaran** berwarna biru tebal.
      3. **Struk Rangkuman & Konfirmasi WhatsApp**:
         - Setelah pendaftaran dikirimkan, terbit struk kode registrasi kolektif (cth: `KKA26-K-NGJ-9124`) dengan tombol kirim konfirmasi langsung ke WhatsApp panitia.
      4. **Struktur Alur**:
         - `/daftar/kolektif`: Halaman pemilihan 7 kartu wilayah.
         - `/daftar/kolektif/[slug]`: Halaman formulir pendaftaran kolektif interaktif berbasis Excel.

  - **Integrasi Penuh Database Supabase & Google Apps Script (`src/lib/registrationService.ts`, `src/lib/supabase.ts`, `scripts/google_apps_script.js`)**:
    - **Penyimpanan Ganda Transaksional (*Dual-Sync Engine*)**:
      1. **Supabase Storage**: Mengunggah file gambar/PDF struk bukti transfer ke bucket `bukti-transfer` dan menghasilkan public URL.
      2. **Supabase Database (PostgreSQL)**:
         - Menyimpan data transaksi induk ke tabel `registrations` (kode registrasi, tipe, wilayah, kecamatan, nama sekolah, nomor WhatsApp, total biaya, status bayar).
         - Menyimpan relasi seluruh siswa ke tabel `participants` (nama lengkap, NISN, gender, kelas) dengan foreign key `registration_id`.
      3. **Google Apps Script (Spreadsheet Sync)**:
         - Mengirim payload pendaftaran via HTTP POST ke Webhook Google Apps Script.
         - Spreadsheet otomatis mencatat baris data baru ke tab master **"Semua Pendaftar"** dan tab spesifik per **Wilayah** (cth: "Kabupaten Nganjuk").
         - Dilengkapi `LockService` untuk mencegah tumpang tindih data saat pendaftaran serentak (*concurrency protection*).
      4. **Indikator Loading Pengguna**:
         - Tombol submit formulir mandiri dan kolektif menampilkan animasi *spinner* `Menyimpan ke Database & Spreadsheet...` sehingga pengguna mendapatkan umpan balik visual yang jelas selama proses penyimpanan berlangsung.

   - **Fitur Cek Status Pendaftaran Berbasis Kode Registrasi (`src/pages/daftar/status.astro`, `src/pages/cek-status.astro`, `src/components/Navbar.astro`)**:
     - **Navigasi & Akses Cepat**:
       - Menambahkan menu **"Cek Status Pendaftaran"** dengan ikon pencarian dan garis pembatas di dalam menu dropdown **Informasi** pada [Navbar.astro](file:///d:/TUGAS%20KULIAH/Project%20MKI/Astro/KKARadarKediri/src/components/Navbar.astro) dan [Footer.astro](file:///d:/TUGAS%20KULIAH/Project%20MKI/Astro/KKARadarKediri/src/components/Footer.astro).
       - Menyediakan rute pintas `/cek-status` yang otomatis mengarahkan ke `/daftar/status`.
       - Menambahkan tombol aksi cepat **"Cek Status Pendaftaran Saya"** pada struk konfirmasi sukses di [FormPendaftaranMandiri.astro](file:///d:/TUGAS%20KULIAH/Project%20MKI/Astro/KKARadarKediri/src/components/FormPendaftaranMandiri.astro) dan [FormPendaftaranKolektif.astro](file:///d:/TUGAS%20KULIAH/Project%20MKI/Astro/KKARadarKediri/src/components/FormPendaftaranKolektif.astro) dengan parameter query otomatis `?kode=...`.
     - **Mesin Pencarian Real-Time Supabase**:
       - Menggunakan pencarian case-insensitive `ilike` pada kolom `registrations.kode`.
       - Mengambil data relasional peserta dari tabel `participants` sesuai `registration_id`.
     - **Indikator Status Visual**:
       - Status **`menunggu`**: Banner kuning/amber (*Menunggu Verifikasi Pembayaran maksimal 1x24 jam*).
       - Status **`lunas`**: Banner hijau (*Pembayaran Terverifikasi Resmi*).
       - Status **`ditolak`**: Banner merah (*Pendaftaran Ditolak / Butuh Konfirmasi Catatan Panitia*).
     - **Lembar Bukti Pendaftaran Resmi A4 & Format Cetak Dokumen (`src/pages/daftar/cetak.astro`)**:
       - Mengganti fungsi cetak bawaan halaman web biasa dengan **Lembar Dokumen Resmi Berstandar Cetak/PDF**:
         1. **Kop Surat Resmi Panitia**: Logo KKA Jawa Pos Radar Kediri, nama instansi, alamat Graha Pena Radar Kediri Jl. Brawijaya 27D Kota Kediri, kontak telepon, website, dan garis pembatas ganda (*double border*) khas surat resmi.
         2. **Nomor Registrasi & Stempel Resmi**: Kotak nomor registrasi font monospace tebal, stempel status badge (`★ TERVERIFIKASI / LUNAS ★` atau `★ MENUNGGU VERIFIKASI PEMBAYARAN ★`).
         3. **Tabel Data Sekolah & Siswa**: Format tabel rapi berisi asal sekolah, wilayah, kecamatan, jenjang, WhatsApp penanggung jawab, waktu pendaftaran, dan tabel seluruh siswa peserta lengkap dengan kolom paraf.
         4. **Ketentuan & Tata Tertib Peserta**: Panduan resmi kedatangan 30 menit sebelum tes, seragam sekolah, dan kartu identitas.
         5. **Pengesahan & Tanda Tangan Panitia**: Dilengkapi stempel bulat digital panitia, titi mangsa Kediri, tanda tangan Ketua Panitia Pelaksana (*Drs. H. Endro Purwanto*), dan QR Code validasi keaslian dokumen ke server Radar Kediri.
       - **Pratinjau Nyata & Responsif**:
         - Tampilan pratinjau lembar A4 dengan floating toolbar (*Cetak Lembar Resmi / Simpan PDF*, *Cek Status Live*, dan *Tutup*).
         - Aturan `@media print`: Seluruh toolbar, tombol, dan elemen browser disembunyikan otomatis, hanya mencetak lembar dokumen resmi tanpa margin terpotong atau background berantakan.
       - **Integrasi Tombol Cetak**:
         - Tersedia di halaman [status.astro](file:///d:/TUGAS%20KULIAH/Project%20MKI/Astro/KKARadarKediri/src/pages/daftar/status.astro) melalui tombol **"Cetak Lembar Bukti Resmi (PDF)"**.
         - Tersedia langsung pada struk konfirmasi sukses [FormPendaftaranMandiri.astro](file:///d:/TUGAS%20KULIAH/Project%20MKI/Astro/KKARadarKediri/src/components/FormPendaftaranMandiri.astro) dan [FormPendaftaranKolektif.astro](file:///d:/TUGAS%20KULIAH/Project%20MKI/Astro/KKARadarKediri/src/components/FormPendaftaranKolektif.astro).

   - **Pencarian Status Alternatif via No. WhatsApp PJ & Hasil Jamak (`src/pages/daftar/status.astro`)**:
     - Menambahkan *toggle button* mode pencarian: **🏷️ Cari via Kode Registrasi** dan **📱 Cari via No. WhatsApp PJ**.
     - Membantu pendaftar yang lupa atau kehilangan kode registrasi dengan cukup memasukkan nomor WhatsApp yang digunakan saat mendaftar.
     - Jika sebuah nomor WhatsApp memiliki lebih dari satu pendaftaran (misal mendaftarkan beberapa anak atau pendaftaran terpisah), sistem menampilkan daftar kartu pendaftaran (*multiple results selection*) yang dapat dipilih untuk membuka rincian lengkapnya.

   - **Seksi FAQ Interaktif & Schema.org FAQPage di Beranda (`src/pages/index.astro`)**:
     - Menambahkan seksi **Pertanyaan yang Sering Diajukan (FAQ)** tepat di bawah seksi Testimoni menggunakan sistem interaktif *pure Vanilla JavaScript* mandiri (tanpa ketergantungan library luar) sehingga dapat dibuka-tutup (*expand/collapse*) secara mulus dengan animasi rotasi pan chevron.
     - Memuat 6 pertanyaan paling esensial (kriteria peserta, perbedaan mandiri vs kolektif, materi TKA Neutron CBT, cara cek status, kartu ujian, dan validitas sertifikat untuk PPDB).
     - Menghapus banner kartu helpdesk di bawah accordion agar tampilan tetap bersih dan fokus.
     - Dilengkapi *Structured Data* JSON-LD `FAQPage` dari Schema.org untuk meningkatkan peringkat SEO dan memicu *rich snippet accordion* di hasil pencarian Google.

   - **Optimalisasi Pratinjau Tautan WhatsApp & Open Graph (`src/components/Seo.astro`, `public/images/og-kka-2026.jpg`)**:
     - Menghadirkan aset visual banner resmi beresolusi tinggi 1200x675 berlatar belakang *navy blue & gold* dengan tipografi resmi *Kompetisi Kompetensi Akademik 2026 - Jawa Pos Radar Kediri*.
     - Menambahkan meta tag lengkap: `og:image:secure_url`, `og:image:width`, `og:image:height`, `og:image:type`, `og:image:alt`, `<link rel="image_src">`, dan `<meta name="theme-color">`.
     - **Pembaruan Konten Visi & Misi Resmi (`src/pages/tentang-kka.astro`)**:
     - Menyelaraskan kartu Visi dan Misi dengan draf resmi panitia:
       - **Visi KKA**:
         1. Menjadi sarana try-out dan asah kemampuan akademik yang representatif  mengenalkan siswa pada model soal seleksi masuk jenjang pendidikan selanjutnya sebelum hari-H yang sesungguhnya.
         2. Menjadi alat ukur dan evaluasi kesiapan siswa dalam menghadapi seleksi jalur prestasi, sekaligus mendongkrak nama baik sekolah melalui raihan prestasi di tingkat regional.
       - **Misi Kami**: Meningkatkan mutu dan standar nilai akademik pelajar di wilayah Kediri dan sekitarnya, agar mampu bersaing di tingkat provinsi maupun nasional.

    - **Peningkatan Proporsi Kotak FAQ Beranda (`src/pages/index.astro`)**:
      - Memperlebar kontainer ke `max-w-4xl` (~940px) agar tidak terlihat sempit dan terisolasi di layar monitor lebar.
      - Meningkatkan ketebalan vertikal dan ruang klik kartu dengan padding `22px 28px` (desktop) dan `16px 18px` (mobile).
      - Menghadirkan badge nomor kotak `44x44px` berlatar biru lembut transparan (`01`, `02`, dst.) dengan border halus, yang berubah menjadi biru pekat berpijar saat pertanyaan dibuka.
      - Mempertegas tipografi pertanyaan ke ukuran `1.12rem` dengan bobot `font-weight: 700` dan warna navy institusional (`#0f2d59`).
      - Menempatkan ikon chevron panah di dalam bubble lingkaran `40x40px` dengan animasi rotasi 180° yang mulus.
      - Memberikan jarak antar kartu `gap: 16px` dengan sudut `border-radius: 18px`, bayangan lembut, dan efek *hover lift* (`translateY(-2px)`).
      - Ruang jawaban (`.faq-answer-inner`) berjarak lega dengan indentasi kiri `88px` pada desktop sehingga sejajar di bawah teks pertanyaan.

    - **Pembangunan Portal & Dashboard Panitia KKA Radar Kediri 2026 (`/admin`)**:
      - **Layout Admin Khusus (`src/layouts/AdminLayout.astro`)**:
        - Sidebar navigasi profesional bernuansa Dark Navy Jawa Pos Radar Kediri dengan logo resmi, status koneksi Supabase real-time, menu utama (*Dashboard*, *Data Pendaftaran*), akses cepat publik (*Cek Status*, *Web Beranda*), info akun panitia, dan tombol logout.
        - Proteksi autentikasi *client-side guard* berbasis `sessionStorage`/`localStorage` (`kka_admin_auth`).
        - Header atas responsif dengan hamburger drawer untuk layar HP/tablet dan tombol penyegar data (*Global Refresh*).
      - **Halaman Login Panitia (`src/pages/admin/login.astro`)**:
        - Desain portal keamanan eksklusif berlatar *gradient navy* dengan form login username & password.
        - Fitur tampil/sembunyikan sandi (*toggle eye*), *remember me*, validasi kredensial resmi, dan kredensial default cepat pengujian (`admin` / `kka2026`).
      - **Dashboard Overview KPI & Statistik (`src/pages/admin/index.astro`)**:
        - 4 Kartu KPI: Total Transaksi Pendaftar, Jumlah Pendaftaran Menunggu Verifikasi, Pembayaran Terverifikasi (Lunas), dan Akumulasi Estimasi Kas Registrasi.
        - Visualisasi persebaran peserta di 7 kabupaten/kota se-Karesidenan Kediri dengan progress bar persentase.
        - Komposisi jenjang pendidikan (SD/MI, SMP/MTs, SMA/MA/SMK) dan rasio jalur pendaftaran (Mandiri vs Kolektif Sekolah).
        - Tabel live 10 pendaftaran terbaru langsung tersinkronisasi dari database Supabase dengan status badge dan tombol kelola cepat.
      - **Pusat Manajemen Data Pendaftaran & Verifikasi (`src/pages/admin/pendaftaran.astro`)**:
        - Multi-filter dinamis real-time (Cari teks, Filter Status, Filter Wilayah 7 Daerah, Filter Jenjang, Filter Tipe Pendaftaran).
        - Modal Detail & Verifikasi Pembayaran Interaktif:
          - Menampilkan preview foto bukti transfer pembayaran langsung.
          - Menampilkan tabel rincian peserta siswa (Nama, NISN, Gender, Kelas).
          - Tombol aksi panitia 1-klik: **"Setujui Pembayaran (LUNAS)"** (otomatis update status ke database Supabase).
          - Tombol **"Tolak / Minta Revisi"** (update status ke database Supabase).
          - Tombol **"Cetak Bukti Resmi (PDF)"** yang langsung membuka `/daftar/cetak?kode=...`.
          - Tombol **"Hubungi WA"** langsung menuju kontak WhatsApp Penanggung Jawab dengan pesan otomatis panitia.
        - Fitur **Ekspor ke CSV / Excel**: Menghasilkan spreadsheet lengkap data peserta, sekolah, nomor WhatsApp PJ, total biaya, dan status verifikasi untuk tim CBT Neutron dan panitia verifikasi fisik.
      - **Redesain Modern Sidebar Admin Tema Terang Sesuai Referensi Pengguna (`src/layouts/AdminLayout.astro`)**:
        - Mengadaptasi desain referensi: Latar putih bersih (`#ffffff`), border kanan halus (`#e9edf4`), dan tipografi gelap modern (`#1e293b`).
        - Header brand: Logo glyph biru segitiga KKA + judul *"KKA Dashboard"* dan subjudul tracking *"ADMIN SUITE"*.
        - Item menu aktif: Berwarna Royal Blue solid (`#2563eb`), teks putih tebal, sudut rounded `12px`, bayangan biru lembut, serta bar indikator vertikal aktif di tepi kiri.
        - Item menu non-aktif: Kotak ikon rounded persegi berlatar abu-abu lembut (`#f1f5f9`) dengan teks slate gelap yang responsif saat hover.
* **Integrasi Penuh Template Resmi AppDashboard-pro (Bootstrap 5.3 Admin Suite)**:
  - **Penyalinan Aset**: Memindahkan folder aset resmi template dari `AppDashboard-pro` ke dalam direktori terisolasi `public/admin-assets/` (`css/main.css`, `js/main.js`, `vendor/bootstrap/`, `vendor/bootstrap-icons/`, `vendor/remixicon/`, dll.) sehingga tidak mengganggu kecepatan dan file aset publik.
  - **Arsitektur Layout Standar Industri**:
    - **Top Header (`.header`)**: Logo resmi KKA Radar Kediri di kiri atas, tombol hamburger toggle sidebar (`.sidebar-toggle`), indikator status live koneksi database Supabase, tombol refresh realtime, dan **Dropdown Profil Pengguna Resmi** di pojok kanan atas.
    - **Menu Logout Proporsional**: Tombol **Keluar (Logout)** ditempatkan di dalam dropdown profil pengguna pojok kanan atas sesuai standar template admin modern internasional, menyelesaikan masalah tombol logout yang sebelumnya terhimpit di bawah sidebar.
    - **Sidebar Ramping & Fleksibel (`.sidebar`)**: Sidebar khusus menu navigasi dengan lebar proporsional (`292px` normal, `76px` collapsed, dan offcanvas di perangkat mobile) dengan ikon resmi *Bootstrap Icons*.
  - **Pengembangan Suite Admin Lengkap: CMS Berita, CMS Galeri, Kelola Wilayah & Kuota, serta Gelombang & Biaya**:
    - **Header Sidebar Permanen & Tata Letak Rapi (`src/layouts/AdminLayout.astro`)**:
      - Memperbaiki hilangnya header sidebar di layar desktop dengan menghapus selector pembatas `d-xl-none`. Logo KKA, judul *"KKA Dashboard"*, dan subjudul *"ADMIN SUITE"* kini selalu tampil elegan di sudut kiri atas baik pada desktop maupun mobile.
      - Menambahkan menu navigasi lengkap dengan badge status aktif untuk 6 modul utama:
        1. **Dashboard Overview** (`/admin`)
        2. **Data Pendaftaran** (`/admin/pendaftaran`)
        3. **Kelola Wilayah & Kuota** (`/admin/wilayah`)
        4. **CMS Berita & Artikel** (`/admin/cms`)
        5. **CMS Galeri Foto** (`/admin/galeri`)
        6. **Gelombang & Biaya** (`/admin/pengaturan`)
    - **Modul Kelola Wilayah & Kuota (`src/pages/admin/wilayah.astro`)**:
      - Mengelola 7 Wilayah Ujian (Kota Kediri, Kab Kediri, Kab Nganjuk, Kota Blitar, Kab Blitar, Kab Tulungagung, Kab Trenggalek) dan 3 Region Koordinasi (Kediri Raya, Blitar Raya, Tulungagung & Trenggalek).
      - Dilengkapi kartu ringkasan kuota total, rasio pendaftar terverifikasi, dan status pembukaan per wilayah.
      - Modal interaktif *"Ubah Data Wilayah & Lokasi CBT"*: Admin dapat memperbarui lokasi/gedung ujian CBT, kuota maksimal peserta, nomor WhatsApp PIC panitia lokal, status registrasi (Buka, Kuota Menipis, Penuh, Tutup), serta narasi deskripsi publik.
      - **Sinkronisasi Langsung ke Halaman Publik**: Perubahan tersimpan secara lokal dan otomatis tercermin pada halaman pengguna `src/pages/wilayah/[slug].astro` di seksi *Lokasi Babak Penyisihan*.
    - **Modul CMS Berita & Publikasi (`src/pages/admin/cms.astro`)**:
      - Menyediakan manajemen artikel berita resmi Radar Kediri, tips belajar TKA Neutron, dan catatan prestasi peserta.
      - Metrik penerbitan: Total Publikasi, Artikel Terbit (Aktif), Konsep/Draft, dan Jumlah Kategori Konten.
      - Fitur pencarian instan, filter status, tabel artikel terstruktur, serta tombol aksi Ubah dan Hapus.
      - Modal interaktif *"Tulis / Edit Artikel"*: Pengisian judul, pembuatan slug otomatis, pemilihan kategori (Berita, Edukasi, Prestasi, CBT), nama penulis, tanggal terbit, ringkasan, isi konten lengkap, dan status publikasi.
      - **Integrasi Dua Arah dengan Halaman Publik (`src/pages/artikel.astro`)**: Artikel yang diterbitkan admin langsung ditampilkan di portal artikel publik lengkap dengan modal baca detail interaktif.
    - **Modul CMS Galeri Foto Dokumentasi (`src/pages/admin/galeri.astro`)**:
      - Manajemen visual foto kegiatan: Grand Final, Juara & Penghargaan, Pelaksanaan Ujian, dan Registrasi & Suasana.
      - Filter kategori berbasis tombol pills interaktif dan kartu galeri visual dengan thumbnail, tag kategori, dan caption ringkas.
      - Modal interaktif *"Tambah / Edit Foto Galeri"*: Input tautan/nama file gambar, judul foto, kategori, dan deskripsi/caption lengkap.
      - **Integrasi Langsung dengan Halaman Publik (`src/pages/galeri.astro`)**: Foto baru atau pembaruan yang disimpan admin langsung muncul pada galeri publik dan dapat dibuka dalam modal lightbox resolusi penuh.
    - **Modul Pengaturan Gelombang & Biaya (`src/pages/admin/pengaturan.astro`)**:
      - Manajemen 3 periode gelombang kompetisi: *Early Bird*, *Reguler*, dan *Last Call / Perpanjangan*.
      - Formulir penetapan tanggal buka-tutup dan tarif pendaftaran per jenjang (SD/MI, SMP/MTs, SMA/MA/SMK) dengan tombol aktivasi gelombang utama (*Active Wave Toggle*).
      - Pengaturan rekening bank pembayaran panitia (BCA, Mandiri, BRI, BNI, Jatim) dan kontak WhatsApp Hotline resmi.
    - **Pusat Kontrol Saklar Status Pendaftaran (Mandiri & Kolektif)**:
      - **Lokasi Panel**: Ditempatkan secara mencolok di bagian atas halaman [Pengaturan Gelombang & Biaya](file:///d:/TUGAS%20KULIAH/Project%20MKI/Astro/KKARadarKediri/src/pages/admin/pengaturan.astro).
      - **Kemampuan Kontrol**:
        1. **Saklar Jalur Mandiri (Toggle Switch On/Off)**: Mengaktifkan atau menonaktifkan pendaftaran perseorangan secara seketika. Dilengkapi pilihan status kondisi (*Buka Normal*, *Kuota Telah Terpenuhi*, *Event Selesai / Ditutup*, dan *Pemeliharaan Sistem*), kustomisasi judul banner pengumuman, serta kustomisasi pesan penjelasan untuk pengunjung.
        2. **Saklar Jalur Kolektif (Toggle Switch On/Off)**: Mengaktifkan atau menonaktifkan pendaftaran rombongan sekolah secara independen beserta kustomisasi pesan penutupannya.
      - **Sinkronisasi Otomatis di Halaman Pengguna**:
        - **Portal Pendaftaran (`/daftar`)**: Badge jalur otomatis berubah menjadi *KUOTA PENUH* atau *DITUTUP*, tombol diarahkan ke status nonaktif, serta muncul banner peringatan resmi.
        - **Direktori Wilayah Mandiri & Kolektif (`/daftar/mandiri` & `/daftar/kolektif`)**: Memunculkan kotak alert merah penutupan resmi dan mengubah seluruh tombol daftar 7 wilayah menjadi label *Ditutup* / *Kuota Penuh*.
        - **Formulir Pendaftaran (`FormPendaftaranMandiri.astro` & `FormPendaftaranKolektif.astro`)**: Menyembunyikan form pengisian dan menampilkan kartu penutupan elegan (*Closed State Card*) lengkap dengan tombol pintas cek status pendaftaran dan bantuan panitia.
    - **Sistem Catatan Penolakan Pendaftaran & Notifikasi di Halaman Cek Status**:
      - **Modal Catatan Penolakan di Admin (`src/pages/admin/pendaftaran.astro`)**:
        - Saat admin menekan tombol *"Tolak / Minta Revisi"*, sistem tidak lagi langsung mengubah status tanpa penjelasan, melainkan memunculkan dialog modal khusus: **"Beri Catatan Penolakan / Permintaan Revisi"**.
        - Dilengkapi **Template Alasan Cepat** (pilihan preset: Bukti transfer buram/terpotong, Nominal transfer kurang, Transaksi belum teridentifikasi di mutasi bank, Data siswa/NISN tidak valid, Ketidaksesuaian jenjang/wilayah) dan textarea untuk instruksi kustom panitia.
        - Menyimpan kolom `status: 'ditolak'` beserta teks alasan pada kolom `catatan` di Supabase.
        - **Integrasi WhatsApp Otomatis**: Setelah status ditolak disimpan, sistem langsung menawarkan konfirmasi untuk membuka WhatsApp pendaftar dengan pesan terformat otomatis yang memuat kode registrasi dan catatan penolakan dari admin.
        - Menampilkan kotak alert catatan penolakan pada modal verifikasi admin dan pratinjau catatan di tabel pendaftaran.
      - **Seksi Khusus Penolakan di Halaman Cek Status (`src/pages/daftar/status.astro`)**:
        - Jika status pendaftaran terdeteksi `ditolak`, sistem memunculkan kartu peringatan tegas berwarna merah: **"Pemberitahuan Resmi Panitia KKA - Pendaftaran Butuh Perbaikan / Revisi"**.
        - Menampilkan **Kotak Catatan Resmi Admin Panitia** (`#rejectionNoteText`) yang menyajikan alasan penolakan secara jelas dan transparan.
        - Menampilkan petunjuk 3 langkah tindak lanjut bagi peserta agar tidak panik (pendaftaran tidak langsung hangus).
        - Tombol aksi langsung: **"Kirim Perbaikan via WhatsApp Panitia"** (`#btnRejectionWaHelp`) yang otomatis merangkai pesan WhatsApp berisi kode registrasi, nama sekolah, dan catatan penolakan untuk memudahkan verifikasi ulang.

---

## 📊 Hasil Uji Build Terkini
- Perintah: `npm run build`
- Total Halaman Ter-generate: **45 halaman HTML statis + 1 file sitemap XML**
- Waktu Build: **4.06 detik**
- Status: **Berhasil 100% (0 Error, 0 Warning)**
- Validasi Terminal: Seluruh sistem verifikasi penolakan dengan catatan admin dan seksi peringatan status pendaftar terkompilasi sempurna tanpa kendala.























