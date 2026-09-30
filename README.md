# Movie Finder

Aplikasi pencarian film — proyek LKPD React JS, dengan tambahan fitur
login/logout dan pilihan kategori/favorit film.

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser. Masukkan nama pengguna apa saja
untuk masuk (login demo, belum terhubung ke server sungguhan).

## Struktur komponen

- `Login.jsx` — form login sederhana, props `onLogin`.
- `Navbar.jsx` — judul aplikasi + info user & tombol logout, props `user`, `onLogout`.
- `SearchBar.jsx` — controlled input, props `value`, `onChange`, `onSearch`.
- `CategoryFilter.jsx` — tombol pilihan kategori film, props `activeLabel`, `onSelect`.
- `ViewTabs.jsx` — tab pindah tampilan "Semua Film" / "Favorit", props `activeView`, `favoritesCount`, `onChange`.
- `MovieModal.jsx` — pop-up detail film saat kartu diklik (sinopsis, sutradara, pemeran, dll), props `movie`, `isFavorite`, `onToggleFavorite`, `onClose`.
- `MovieCard.jsx` — kartu film + tombol favorit, props `poster`, `title`, `year`,
  `rating`, `isFavorite`, `onToggleFavorite`.
- `App.jsx` — menyimpan seluruh state: `user`, `movies`, `searchQuery`, `loading`,
  `error`, `activeCategory`, `activeView`, `selectedMovie`, `favorites` (disimpan sebagai objek film lengkap di localStorage). Fetch OMDB dijalankan lewat `useEffect`
  (setelah login) dan `handleSearch` / `handleSelectCategory`.

## Catatan penting untuk pengumpulan tugas

Dokumen LKPD **tidak mewajibkan** fitur login atau kategori — spesifikasi resminya
hanya: daftar film default, pencarian, kartu film, dan (opsional) loading/error state.
Fitur login & pilihan kategori di sini murni **nilai tambah kreativitas**, dilakukan
secara client-side (disimpan di localStorage), bukan autentikasi sungguhan dengan
server/database. Sebutkan ini secara jujur di jawaban Soal Diskusi bagian E, terutama
di poin "Kendala & Solusi", supaya guru tahu bagian mana yang di luar spesifikasi dasar.

## API key

Ganti nilai `API_KEY` di `src/App.jsx` dengan API key OMDB milikmu sendiri
dari https://www.omdbapi.com/apikey.aspx bila key contoh sudah tidak berlaku.
