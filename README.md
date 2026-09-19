<div align="center">

# 🎮 ALI.EXE : Anomali Pengubah Kepribadian
### ✦ A Special 23rd Birthday Interactive Visual Novel ✦

![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![CSS3](https://img.shields.io/badge/Style-Retro_Pixel_Art-ff79c6?style=for-the-badge)

<p align="center">
  Sebuah game visual novel interaktif berbasis web dengan estetika retro pixel art dan sistem mini-games dinamis. Dirancang khusus sebagai arsip rekonsiliasi memori yang personal dan penuh kejutan.
</p>

[Fitur Utama](#-fitur-game) • [Mini-Games](#-mini-games--interaksi) • [Teknologi](#-teknologi) • [Cara Menjalankan](#-cara-menjalankan-secara-lokal) • [Struktur Proyek](#-struktur-direktori)

---

</div>

## 📖 Sinopsis

> *"INITIALIZING ANOMALY SYSTEM V.2026... Memuat data arsip kenangan 26 Juli — 16 Agustus 2026."*

Pemain berperan sebagai **Ali (23)**, seorang rekan kerja yang awalnya dikenal dingin dan berkarakter cuek. Namun serangkaian anomali perlahan mengubah dinamika relasi menjadi sesuatu yang teramat penting. Telusuri kembali setiap potongan memori, buat keputusan krusial, dan selesaikan berbagai investigasi untuk membuka rahasia di balik perubahan tersebut!

---

## ✨ Fitur Game

- **🕹️ Retro Pixel Art & CRT Atmosphere**: Tampilan bergaya game retro lengkap dengan efek *CRT scanline*, efek transisi glitch, dan floating particle visuals.
- **💬 Interactive Dialogue Engine**: Teks bergaya mesin tik *(typewriter)*, dialog dinamis, potret karakter dengan berbagai ekspresi (*Ali, Cegil, with/without glasses*).
- **❤️ Affection System & Live HUD**: Pilihan dialog mempengaruhi poin *Affection* secara real-time dengan notifikasi toast dan progress bar animasi.
- **💾 Save & Load System**: Penyimpanan progress otomatis dan manual memanfaatkan browser `localStorage`.
- **🔊 Dynamic Web Audio Engine**: Efek suara sintetis (SFX) retro 8-bit yang dihasilkan langsung melalui Web Audio API tanpa ketergantungan audio eksternal berat.
- **🎉 Confetti & Celebration**: Efek perayaan dinamis menggunakan `canvas-confetti` pada momen-momen klimaks cerita.

---

## 🎲 Mini-Games & Interaksi

Game ini tidak sekadar membaca cerita, tetapi dilengkapi berbagai interaksi imersif:

| Mini-Game / Interaksi | Deskripsi |
| :--- | :--- |
| **☕ Coffee Order Puzzle** | Racik pesanan kopi yang tepat sesuai preferensi karakter untuk membuka jalan cerita baru. |
| **📱 Chat Tapper & Draft Message** | Simulasi obrolan chat larut malam di mana pemain mengetik pesan dan memilih draft respon terbaik. |
| **🔍 Memory Investigation & Evidence Board** | Mode detektif untuk menghubungkan bukti-bukti anomali dan mengungkap kenangan tersembunyi. |
| **💔 Jealousy Mini-Game** | Mini-game pengetes respons emosional saat dinamika kecemburuan muncul. |
| **🗺️ Point & Click Exploration** | Eksplorasi interaktif pada latar Cafe dan suasana kota Malang. |
| **🧠 Interactive Quiz & Inner Child Unlock** | Pertanyaan seputar momen penting untuk membuka memori inti (*Inner Child*). |

---

## 🛠️ Teknologi

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Pure CSS / Vanilla CSS Variables dengan dukungan custom pixel font & tema cyberpunk/retro
- **Effects & SFX**: `canvas-confetti` & HTML5 Web Audio API Synth

---

## 🚀 Cara Menjalankan Secara Lokal

Pastikan kamu sudah menginstal [Node.js](https://nodejs.org/) (versi 18.x atau yang lebih baru).

```bash
# 1. Clone repository
git clone https://github.com/Lal1602/ali-exe-novel.git

# 2. Masuk ke direktori proyek
cd ali-exe-novel

# 3. Instal dependensi
npm install

# 4. Jalankan server development
npm run dev
```

Buka browser dan akses **`http://localhost:3000`** untuk memainkan game.

---

## 📁 Struktur Direktori

```text
novel/
├── public/
│   └── assets/           # Background art, potret karakter, & audio
├── src/
│   ├── app/              # Next.js App Router (layout, globals.css, page.tsx)
│   ├── components/       # Komponen UI utama (DialogueBox, HUD, TitleScreen, dll)
│   │   └── interactions/ # Komponen mini-games (Cafe, Malang, Jealousy, Chat, Puzzle)
│   ├── data/             # Script narasi skenario (scenes.ts, memories.ts)
│   ├── hooks/            # Custom React hooks (animasi angka, audio, state)
│   ├── types/            # Definisi TypeScript interface cerita & game
│   └── utils/            # Web Audio API synthesizer & helper function
├── package.json
└── tsconfig.json
```

---

<div align="center">
  <sub>Made with ❤️ for a special 23rd birthday celebration.</sub>
</div>
