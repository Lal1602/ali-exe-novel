import { StoryNode } from '@/types/game';

export type GuideAccent = 'amber' | 'pink' | 'cyan' | 'green' | 'purple';

export interface MiniGameGuideData {
  icon: string;
  title: string;
  accent: GuideAccent;
  goal: string;
  steps: string[];
  controls: string;
  tip?: string;
}

export const MINIGAME_GUIDES: Record<string, MiniGameGuideData> = {
  // ---------- Mini-game lama ----------
  'coffee-order': {
    icon: '☕',
    title: 'PESAN KOPI',
    accent: 'amber',
    goal: 'Pilih kopi yang dipesan Cegil dari pantry.',
    steps: [
      'Baca ketiga pilihan menu kopi.',
      'Klik satu menu untuk memilihnya.',
      'Tekan tombol konfirmasi untuk memesan.',
    ],
    controls: 'Klik / ketuk',
    tip: 'Tidak ada jawaban salah. Tiap pilihan punya reaksi yang berbeda.',
  },
  jealousy: {
    icon: '💢',
    title: 'REAKSI CEMBURU',
    accent: 'pink',
    goal: 'Tentukan bagaimana Cegil menyikapi rasa tidak nyaman di kantor.',
    steps: [
      'Baca tiga kemungkinan reaksi.',
      'Klik satu reaksi untuk melihat apa yang terjadi di kepalanya.',
      'Lanjutkan cerita setelah membaca.',
    ],
    controls: 'Klik / ketuk',
    tip: 'Pilihan hanya mengubah narasi, bukan alur cerita.',
  },
  'draft-message': {
    icon: '✉️',
    title: 'DRAFT PESAN',
    accent: 'cyan',
    goal: 'Pilih draft pesan ajakan yang akan dikirim ke Ali.',
    steps: [
      'Baca tiga draft pesan.',
      'Klik draft yang paling terasa pas.',
      'Tekan KIRIM.',
    ],
    controls: 'Klik / ketuk',
    tip: 'Draft C adalah pilihan final di cerita aslinya, tapi bebas dicoba semuanya.',
  },
  'cafe-explore': {
    icon: '🔍',
    title: 'EKSPLORASI LITTLE CAVE',
    accent: 'amber',
    goal: 'Baca isi pikiran Cegil sebelum ia mengucapkan pengakuan.',
    steps: [
      'Klik objek-objek di meja kafe.',
      'Baca pikiran yang muncul di setiap objek.',
      'Periksa minimal 2 objek agar tombol lanjut terbuka.',
    ],
    controls: 'Klik / ketuk',
  },
  'chat-tapper': {
    icon: '💬',
    title: 'BALAS CHAT',
    accent: 'cyan',
    goal: 'Ikuti obrolan pertama di luar jam kantor.',
    steps: [
      'Ketuk layar chat untuk memunculkan pesan berikutnya.',
      'Ulangi sampai semua pesan terbaca.',
    ],
    controls: 'Klik / ketuk',
  },
  'malang-explore': {
    icon: '🌃',
    title: 'JELAJAH MALANG',
    accent: 'purple',
    goal: 'Kumpulkan kenangan di tiga titik perjalanan Malang.',
    steps: [
      'Klik setiap titik lokasi.',
      'Baca cuplikan yang muncul.',
      'Kunjungi ketiga titik untuk melanjutkan.',
    ],
    controls: 'Klik / ketuk',
  },
  'evidence-board': {
    icon: '📌',
    title: 'PAPAN BUKTI',
    accent: 'amber',
    goal: 'Buktikan kenapa Ali disebut "bocil matang".',
    steps: [
      'Klik setiap kartu bukti untuk membukanya.',
      'Buka semua kartu untuk lanjut ke bab berikutnya.',
    ],
    controls: 'Klik / ketuk',
  },
  'memory-hub': {
    icon: '🗂️',
    title: 'MEMORY INVESTIGATION',
    accent: 'cyan',
    goal: 'Ungkap fragmen kenangan yang menjelaskan anomali Ali.',
    steps: [
      'Klik kartu fragmen untuk membaca ceritanya (bebas urutan).',
      'Beberapa fragmen punya mini-game kecil di dalamnya.',
      'Buka minimal 8 fragmen untuk membuka tombol lanjut.',
    ],
    controls: 'Klik / ketuk',
    tip: 'Fragmen yang sudah dibuka bisa dibaca ulang kapan saja.',
  },
  quiz: {
    icon: '❓',
    title: 'KUIS ANOMALI',
    accent: 'pink',
    goal: 'Tebak apa penyebab anomali kepribadian Ali.',
    steps: [
      'Pilih jawaban mana saja.',
      'Coba semua opsi. Sistem akan memberi tahu kenapa masing-masing belum tepat.',
      'Setelah semua dicoba, jawaban sebenarnya terungkap.',
    ],
    controls: 'Klik / ketuk',
    tip: 'Memang sengaja semuanya "salah". Santai saja.',
  },
  'inner-child': {
    icon: '🔓',
    title: 'BUKA INNER CHILD',
    accent: 'purple',
    goal: 'Buka kunci sisi kecil Cegil yang selama ini terkunci.',
    steps: [
      'Tekan tombol buka kunci.',
      'Tunggu sebentar. Rasa aman tidak bisa dipaksa cepat.',
    ],
    controls: 'Klik / ketuk',
  },

  // ---------- Batch 1 ----------
  'ml-last-hit': {
    icon: '⚔️',
    title: 'ML LAST HIT',
    accent: 'cyan',
    goal: 'Dapatkan 5 last hit sambil tetap membalas chat Cegil.',
    steps: [
      'Tiap minion punya bar HP yang terus turun.',
      'Tap minion saat HP-nya masuk zona merah (tulisan SEKARANG!).',
      'Kalau tap terlalu cepat, HP minion naik lagi.',
      'Kalau ada chat dari Cegil, ketuk untuk membalas. Tidak wajib, tapi manis.',
    ],
    controls: 'Klik / ketuk',
    tip: 'Tidak ada game over. Minion yang terlewat akan muncul lagi.',
  },
  'daily-match': {
    icon: '🃏',
    title: 'DAILY QUEST MATCH',
    accent: 'green',
    goal: 'Cocokkan 5 pasang momen kecil dari hari-hari pendekatan.',
    steps: [
      'Klik kartu untuk membaliknya.',
      'Balik dua kartu yang sama untuk mengambil pasangannya.',
      'Kartu 🙈 DENIAL tidak punya pasangan. Balik lagi dan abaikan.',
    ],
    controls: 'Klik / ketuk',
    tip: 'Ingat posisi kartu yang sudah terbuka.',
  },
  'glitch-debug': {
    icon: '⚠️',
    title: 'DEBUG ERROR 404',
    accent: 'pink',
    goal: 'Reboot modul respons Cegil yang error.',
    steps: [
      'Blok yang rusak akan berkedip merah dengan simbol acak.',
      'Klik blok itu sebelum menghilang.',
      'Perbaiki 8 blok sampai REBOOT 100%.',
    ],
    controls: 'Klik / ketuk',
    tip: 'Blok yang terlewat hanya hilang. Tidak ada hukuman.',
  },
  'emotion-welcome': {
    icon: '🧸',
    title: 'SAMBUT 4 RASA',
    accent: 'purple',
    goal: 'Sambut empat emosi sisi kecil Cegil dengan cara yang membuatnya aman.',
    steps: [
      'Baca emosi yang muncul (marah, riang, ingin, nakal).',
      'Pilih respons yang terasa paling hangat.',
      'Kalau kurang tepat, akan ada petunjuk lembut dan kamu bisa memilih lagi.',
    ],
    controls: 'Klik / ketuk',
  },
  'birthday-candles': {
    icon: '🎂',
    title: 'TIUP LILIN',
    accent: 'pink',
    goal: 'Make a wish, lalu tiup kelima lilinnya sekaligus.',
    steps: [
      'TAHAN tombol TIUP untuk menarik napas. Bar napas akan terisi.',
      'Lepas tombol dan napasnya turun lagi, jadi tahan terus sampai semua lilin padam.',
    ],
    controls: 'Tahan tombol di layar, atau tahan [SPACE]',
    tip: 'Bisa juga ditahan dengan jari di layar sentuh.',
  },

  // ---------- Batch 2 ----------
  'pretend-busy': {
    icon: '🖥️',
    title: 'PURA-PURA SIBUK',
    accent: 'pink',
    goal: 'Terlihat sibuk dengan Excel, sambil diam-diam menguping.',
    steps: [
      'Ketik apa saja (atau ketuk tombol KETIK) agar bar PROFESIONAL naik.',
      'Arahkan kursor atau tahan jari di bubble obrolan untuk menguping. Bar TELINGA ikut naik.',
      'Isi bar TELINGA sampai 100%. Bar profesional pelan-pelan turun kalau kamu berhenti mengetik, dan telinga hanya naik selama profesional masih ada.',
    ],
    controls: 'Keyboard untuk mengetik, arahkan kursor / tahan jari di bubble',
    tip: 'Tidak ada game over. Kalau profesionalnya habis, cukup mengetik lagi.',
  },
  'breath-send': {
    icon: '🌬️',
    title: 'TARIK NAPAS, KIRIM',
    accent: 'cyan',
    goal: 'Kumpulkan keberanian, lalu kirim pesan ajakannya.',
    steps: [
      'Lingkaran akan membesar dan mengecil seperti napas.',
      'Klik lingkaran saat ia berada di cincin target (hijau).',
      'Isi bar CONFIDENCE sampai 100%. Tombol SIAP akan berhenti kabur-kaburan dan bisa diklik.',
    ],
    controls: 'Klik / ketuk, atau tekan [SPACE]',
    tip: 'Klik meleset hanya mengurangi sedikit confidence.',
  },
  'polite-simon': {
    icon: '🍵',
    title: 'SOPAN SANTUN SIMON',
    accent: 'amber',
    goal: 'Tunjukkan sikap yang sopan saat bertemu orang tua Cegil.',
    steps: [
      'Perhatikan urutan sikap yang menyala satu per satu.',
      'Ulangi urutan itu dengan menekan tombol yang sama.',
      'Urutan makin panjang di tiap ronde. Selesaikan 4 ronde.',
    ],
    controls: 'Klik / ketuk',
    tip: 'Salah urutan? Urutannya diputar ulang, kamu bisa coba lagi.',
  },
  'character-build': {
    icon: '🛠️',
    title: 'CHARACTER BUILD',
    accent: 'green',
    goal: 'Atur status karakter Ali sebagai "Bocil Matang".',
    steps: [
      'Kamu punya 9 poin untuk dibagikan.',
      'Tekan + dan − pada RESPONSIBILITY, PROTECTIVENESS, dan COMMON SENSE.',
      'Habiskan semua poin untuk membuka passive GENTLE SIDE.',
    ],
    controls: 'Klik / ketuk',
    tip: 'Tidak ada build yang salah.',
  },
  'timeline-sort': {
    icon: '🗓️',
    title: 'SUSUN TIMELINE',
    accent: 'purple',
    goal: 'Urutkan tiga tanggal penting dari arsip sistem.',
    steps: [
      'Kartu tanggal tampil dalam urutan acak.',
      'Tekan ▲ / ▼ pada kartu untuk menggesernya.',
      'Susun dari yang paling awal sampai paling akhir, lalu tekan PERIKSA.',
    ],
    controls: 'Klik / ketuk',
    tip: 'Petunjuk: affection naik 0% → 60% → 100%.',
  },
  'name-evolution': {
    icon: '🔤',
    title: 'NAME EVOLUTION',
    accent: 'pink',
    goal: 'Susun huruf menjadi panggilan yang berevolusi: MAS ALI → MASLI → SAYANG.',
    steps: [
      'Huruf-huruf tersedia secara acak di bawah.',
      'Klik huruf secara berurutan untuk menyusun nama yang diminta.',
      'Salah huruf? Tekan HAPUS untuk mundur satu langkah.',
    ],
    controls: 'Klik / ketuk',
  },

  // ---------- Fragmen Memory Hub ----------
  'frag-cockroach': {
    icon: '🪳',
    title: 'THE COCKROACH',
    accent: 'amber',
    goal: 'Lindungi Cegil dari kecoa sebelum mereka mendekat.',
    steps: [
      'Kecoa merayap dari atas menuju Cegil di bawah.',
      'Ketuk atau klik kecoa untuk menyapunya.',
      'Sapu 8 kecoa.',
    ],
    controls: 'Klik / ketuk',
    tip: 'Kalau ada yang lolos, ia kembali merayap dari awal. Tidak ada game over.',
  },
  'frag-triage': {
    icon: '🩹',
    title: 'THE FALL: SCAN LUKA',
    accent: 'pink',
    goal: 'Periksa luka Cegil seperti Ali: "Mana, liat."',
    steps: [
      'Ketuk bagian tubuh yang bisa diperiksa.',
      'Temukan 3 area luka: lutut, siku, dan pinggang.',
      'Bagian yang sehat akan dinyatakan aman.',
    ],
    controls: 'Klik / ketuk',
  },
};

/**
 * Which guide (if any) applies to a story node.
 * Interaction type wins; otherwise the special-screen flags.
 */
export const getGuideKey = (node: StoryNode): string | null => {
  if (node.interactionType) return node.interactionType;
  if (node.isMemoryHub) return 'memory-hub';
  if (node.isQuiz) return 'quiz';
  if (node.isInnerChildUnlock) return 'inner-child';
  return null;
};
