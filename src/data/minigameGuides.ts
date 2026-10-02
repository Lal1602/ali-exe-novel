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
};

/**
 * Only real mini-games (timing, reflex, memory, ordering...) have a how-to-play guide.
 * Pick-one / click-through screens deliberately have none.
 */
export const getGuideKey = (node: StoryNode): string | null => {
  const key = node.interactionType;
  return key && MINIGAME_GUIDES[key] ? key : null;
};
