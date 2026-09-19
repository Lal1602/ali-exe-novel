import { StoryNode } from '@/types/game';

export const STORY_NODES: Record<string, StoryNode> = {
  // ==========================================
  // BOOT SCREEN / INITIALIZATION
  // ==========================================
  'boot-init': {
    id: 'boot-init',
    phase: 'boot',
    location: 'system-void',
    speaker: 'System',
    textType: 'narration',
    text: 'INITIALIZING ANOMALY SYSTEM V.2026...\n\nMemuat data arsip kenangan 26 Juli — 16 Agustus 2026...',
    systemBox: {
      title: 'PLAYER INITIALIZATION',
      lines: [
        { label: 'NAME', value: 'ALI' },
        { label: 'AGE', value: '23' },
        { label: 'MAIN CLASS', value: 'MOBILE LEGENDS PLAYER / CUEK' },
        { label: 'SECONDARY CLASS', value: 'MARVEL ENJOYER / GENTLE' },
        { label: 'STATUS', value: 'TARGET OF AFFECTION' },
        { label: 'HIDDEN TRAIT', value: '████████████' },
      ],
      accentColor: 'cyan',
    },
    affection: 0,
    bgmMood: 'ambient',
    transitionOut: 'glitch',
    onNext: 'boot-welcome',
  },

  'boot-welcome': {
    id: 'boot-welcome',
    phase: 'boot',
    location: 'system-void',
    speaker: 'System',
    textType: 'narration',
    text: 'WELCOME, ALI.\n\nKamu telah terpilih untuk sebuah misi rekonsiliasi memori yang sangat berharga.\n\nTugasmu: Menelusuri kembali setiap anomali yang mengubah kepribadianmu dari seorang rekan kerja yang dingin... menjadi seseorang yang teramat penting.',
    systemBox: {
      title: 'PRIMARY MISSION OBJECTIVE',
      lines: [
        { label: 'OBJECTIVE', value: 'Cari tahu apa yang sebenarnya terjadi padamu.' },
        { label: 'DIFFICULTY', value: 'PERSONAL & HEARTFELT' },
        { label: 'STATUS', value: 'READY TO START' },
      ],
      accentColor: 'green',
    },
    affection: 0,
    transitionOut: 'fade-black',
    onNext: 'prologue-1',
  },

  // ==========================================
  // PROLOGUE — BEFORE THE ANOMALY (Latar: KANTOR)
  // ==========================================
  'prologue-1': {
    id: 'prologue-1',
    phase: 'prologue',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    isChapterStart: true,
    chapterMeta: {
      title: 'PROLOGUE',
      subtitle: 'BEFORE THE ANOMALY',
      date: 'Awal 2026',
      location: 'Kantor Abadi Jaya, Surabaya',
      affection: 0,
    },
    speaker: 'Cegil',
    speakerTitle: 'Player 2',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Sebelum semuanya menjadi rumit dan penuh perasaan seperti sekarang, kita sebenarnya cuma teman kerja biasa.',
    narration: [
      'Bahkan mungkin kata teman terasa terlalu akrab untuk situasi saat itu.',
      'Kita sudah bekerja bersama selama kurang lebih delapan bulan di kantor ini.',
      'Tapi selama delapan bulan itu, kita hampir tidak pernah benar-benar berbicara lebih dari urusan berkas.',
    ],
    systemBox: {
      title: 'LOCATION LOG',
      lines: [
        { label: 'YEAR', value: '2026' },
        { label: 'LOCATION', value: 'WORKPLACE / KANTOR' },
        { label: 'ENVIRONMENT', value: 'FLUORESCENT LIGHTS & MONITORS' },
      ],
      accentColor: 'cyan',
    },
    affection: 0,
    bgmMood: 'office',
    onNext: 'prologue-2',
  },

  'prologue-2': {
    id: 'prologue-2',
    phase: 'prologue',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerTitle: 'Player 2',
    speakerAvatar: 'cegil',
    textType: 'dialogue', // Spoken Dialogue (with quotes)
    text: '“Selamat pagi, Mas Ali.”',
    systemBox: {
      title: 'RELATIONSHIP DATABASE',
      lines: [
        { label: 'ALI ↕ CEGIL', value: 'WORK COLLEAGUES' },
        { label: 'INTERACTION LEVEL', value: '4%', progress: 4 },
        { label: 'OUTSIDE WORK', value: '0%', progress: 0 },
        { label: 'ROMANTIC INTEREST', value: 'NOT DETECTED' },
      ],
      accentColor: 'amber',
    },
    affection: 0,
    onNext: 'prologue-2-ali',
  },

  'prologue-2-ali': {
    id: 'prologue-2-ali',
    phase: 'prologue',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Ali',
    speakerTitle: 'Player 1',
    speakerAvatar: 'ali',
    textType: 'dialogue', // Spoken Dialogue (with quotes)
    text: '“Pagi.”',
    systemBox: {
      title: 'RELATIONSHIP DATABASE',
      lines: [
        { label: 'ALI ↕ CEGIL', value: 'WORK COLLEAGUES' },
        { label: 'INTERACTION LEVEL', value: '4%', progress: 4 },
        { label: 'OUTSIDE WORK', value: '0%', progress: 0 },
        { label: 'ROMANTIC INTEREST', value: 'NOT DETECTED' },
      ],
      accentColor: 'amber',
    },
    affection: 0,
    onNext: 'prologue-2-reflection',
  },

  'prologue-2-reflection': {
    id: 'prologue-2-reflection',
    phase: 'prologue',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerTitle: 'Player 2',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Selesai. Sesederhana dan sekaku itu.',
    narration: [
      'Tidak ada chat random di luar jam kantor.',
      'Tidak ada cerita tentang masa lalu, hobi, atau apa yang kamu sukai.',
      'Kalau waktu itu ada yang bilang aku bakal jatuh hati sama kamu, aku pasti ketawa paling keras.',
    ],
    systemBox: {
      title: 'RELATIONSHIP DATABASE',
      lines: [
        { label: 'ALI ↕ CEGIL', value: 'WORK COLLEAGUES' },
        { label: 'INTERACTION LEVEL', value: '4%', progress: 4 },
        { label: 'OUTSIDE WORK', value: '0%', progress: 0 },
        { label: 'ROMANTIC INTEREST', value: 'NOT DETECTED' },
      ],
      accentColor: 'amber',
    },
    affection: 0,
    onNext: 'prologue-3',
  },

  'prologue-3': {
    id: 'prologue-3',
    phase: 'prologue',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Waktu itu, di mataku kamu cuma sosok pendiam yang suka memakai jaket gelap dan headphone.',
    narration: [
      'Orang yang kelihatan sangat cuek dengan sekitar.',
      'Fokus di depan komputermu, menyelesaikan pekerjaan tanpa banyak suara.',
      'Kamu punya benteng yang tinggi, dan aku sama sekali tidak berniat mendekat.',
    ],
    systemBox: {
      title: 'TARGET PROFILE: ALI',
      lines: [
        { label: 'ATTITUDE', value: 'COLD / DETACHED' },
        { label: 'DEFENSE MATRIX', value: '100%', progress: 100 },
        { label: 'ACCESSIBILITY', value: 'RESTRICTED' },
      ],
      accentColor: 'cyan',
    },
    affection: 0,
    onNext: 'prologue-4',
  },

  'prologue-4': {
    id: 'prologue-4',
    phase: 'prologue',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Panggilanku kepadamu saat itu sangat formal: Mas Ali. Bukan Masli. Bukan Sayang. Dan jelas bukan Bocilku.',
    narration: [
      'Dua kata yang sangat datar dan menjaga jarak aman.',
      'Tapi roda takdir rupanya senang bercanda dengan hal-hal yang sepele...',
    ],
    systemBox: {
      title: 'ANOMALY SCANNER',
      lines: [
        { label: 'CALLSIGN', value: 'Mas Ali' },
        { label: 'ANOMALY STATUS', value: '0% — PENDING CATALYST' },
      ],
      accentColor: 'cyan',
    },
    affection: 0,
    transitionOut: 'wipe-right',
    onNext: 'quest01-1',
  },

  // ==========================================
  // QUEST 01 — COFFEE BREAK (Latar: KANTOR)
  // ==========================================
  'quest01-1': {
    id: 'quest01-1',
    phase: 'quest01',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    isChapterStart: true,
    chapterMeta: {
      title: 'QUEST 01',
      subtitle: 'COFFEE BREAK',
      date: 'Juli 2026',
      location: 'Pantry Kantor, Surabaya',
      affection: 1,
    },
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Semua anomali ini berawal dari hal yang sangat klise: secangkir kopi di jam istirahat kantor.',
    narration: [
      'Suatu siang, rasa kantukku sudah tidak tertolong lagi.',
      'Dan kebetulan, kamu sedang bersiap turun untuk membeli kopi di kedai bawah gedung kantor.',
    ],
    systemBox: {
      title: 'QUEST 01: COFFEE BREAK',
      lines: [
        { label: 'CATALYST DETECTED', value: 'COFFEE RUN' },
        { label: 'ACTION', value: 'NITIP KOPI KE ALI' },
      ],
      accentColor: 'green',
    },
    affection: 1,
    bgmMood: 'cozy',
    onNext: 'quest01-pantry',
  },

  'quest01-pantry': {
    id: 'quest01-pantry',
    phase: 'quest01',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'dialogue', // Spoken Dialogue (with quotes)
    text: '“Masli, nitip kopi dong!”',
    narration: [
      'Itu pertama kalinya lidahku terpeleset memanggilmu Masli alih-alih Mas Ali.',
      'Pilih pesanan kopi untuk Masli di bawah ini:',
    ],
    interactionType: 'coffee-order',
    affection: 1,
    onNext: 'quest01-after-order',
  },

  'quest01-after-order': {
    id: 'quest01-after-order',
    phase: 'quest01',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Ali',
    speakerTitle: 'Player 1',
    speakerAvatar: 'ali',
    textType: 'dialogue', // Spoken Dialogue (with quotes)
    text: '“Ini kopinya.”',
    systemBox: {
      title: 'AFFECTION EVENT',
      lines: [
        { label: 'ITEM DELIVERED', value: 'COLD BREWED COFFEE' },
        { label: 'DELIVERY GUY', value: 'ALI (IN PERSON)' },
      ],
      accentColor: 'green',
    },
    affection: 1,
    onNext: 'quest01-cegil-thanks',
  },

  'quest01-cegil-thanks': {
    id: 'quest01-cegil-thanks',
    phase: 'quest01',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerTitle: 'Player 2',
    speakerAvatar: 'cegil',
    textType: 'dialogue', // Spoken Dialogue (with quotes)
    text: '“Makasih banyak ya, Masli!”',
    affection: 1,
    onNext: 'quest01-coffee-reaction',
  },

  'quest01-coffee-reaction': {
    id: 'quest01-coffee-reaction',
    phase: 'quest01',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerTitle: 'Player 2',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Dua puluh menit kemudian, kamu kembali dan meletakkan cangkir kopi itu tepat di samping keyboard-ku.',
    narration: [
      'Kamu cuma bilang singkat lalu kembali ke mejamu.',
      'Sederhana. Tidak ada obrolan panjang. Tapi entah kenapa, rasa kantukku langsung hilang seketika.',
    ],
    systemBox: {
      title: 'AFFECTION EVENT',
      lines: [
        { label: 'ITEM RECEIVED', value: 'COLD BREWED COFFEE' },
        { label: 'CALLSIGN UPDATED', value: 'MASLI (PERMANENT)' },
        { label: 'AFFECTION GAIN', value: '+1% (SEED SOWN)' },
      ],
      accentColor: 'green',
    },
    affection: 1,
    onNext: 'quest01-habit',
  },

  'quest01-habit': {
    id: 'quest01-habit',
    phase: 'quest01',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerTitle: 'Player 2',
    speakerAvatar: 'cegil',
    textType: 'dialogue', // Spoken Dialogue (with quotes)
    text: '“Masli, nitip kopi yang kemarin lagi ya.”',
    affection: 1,
    onNext: 'quest01-habit-ali',
  },

  'quest01-habit-ali': {
    id: 'quest01-habit-ali',
    phase: 'quest01',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Ali',
    speakerTitle: 'Player 1',
    speakerAvatar: 'ali',
    textType: 'dialogue', // Spoken Dialogue (with quotes)
    text: '“Iya, rasa yang kemarin kan? Nanti sekalian kubeliin pas turun.”',
    affection: 1,
    onNext: 'quest01-habit-reflection',
  },

  'quest01-habit-reflection': {
    id: 'quest01-habit-reflection',
    phase: 'quest01',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerTitle: 'Player 2',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Seminggu berikutnya, hal itu berubah dari kebetulan menjadi sebuah rutinitas kecil.',
    narration: [
      'Aku mulai pura-pura kehabisan kopi di jam dua siang hanya untuk punya alasan bicara padamu.',
    ],
    systemBox: {
      title: 'BEHAVIORAL ANOMALY',
      lines: [
        { label: 'COFFEE CONSUMPTION', value: '+300%' },
        { label: 'TRUE REASON', value: 'WANTING TO TALK TO ALI' },
      ],
      accentColor: 'amber',
    },
    affection: 1,
    onNext: 'quest01-coworker',
  },

  'quest01-coworker': {
    id: 'quest01-coworker',
    phase: 'quest01',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Sampai suatu hari rekan kerja sebelah meletup dengan nada menggoda: kamu sering banget nitip ke Mas Ali akhir-akhir ini, ada apa nih?',
    narration: [
      'Mukaku langsung terasa panas.',
      '“Enggak kok! Kebetulan aja dia sering turun beli!” sergahku cepat.',
      'Bohong. Aku jelas tahu aku berbohong pada diriku sendiri.',
    ],
    systemBox: {
      title: 'PANIC METER',
      lines: [
        { label: 'EXPOSURE RISK', value: '75%', progress: 75, color: 'red' },
        { label: 'DENIAL REACTION', value: 'TOO LOUD' },
      ],
      accentColor: 'pink',
    },
    affection: 1,
    onNext: 'quest01-end',
  },

  'quest01-end': {
    id: 'quest01-end',
    phase: 'quest01',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Aku mulai menyadari sesuatu: Aku bukan menunggu rasa kopinya. Aku menunggu orang yang membawakannya ke mejaku.',
    narration: [
      'Ada pergeseran kecil di dalam dadaku.',
      'Sangat kecil, tapi perlahan-lahan mulai mengubah cara duniaku berputar.',
    ],
    systemBox: {
      title: 'QUEST 01 COMPLETED',
      lines: [
        { label: 'QUEST', value: 'COFFEE BREAK ✓' },
        { label: 'ALI AFFECTION', value: '1%', progress: 1 },
        { label: 'STATUS', value: 'BARELY NOTICEABLE ANOMALY' },
      ],
      accentColor: 'cyan',
    },
    affection: 1,
    transitionOut: 'wipe-right',
    onNext: 'quest02-1',
  },

  // ==========================================
  // QUEST 02 — THE OTHER GIRL (Latar: KANTOR)
  // ==========================================
  'quest02-1': {
    id: 'quest02-1',
    phase: 'quest02',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    isChapterStart: true,
    chapterMeta: {
      title: 'QUEST 02',
      subtitle: 'THE OTHER GIRL',
      date: 'Pertengahan Juli 2026',
      location: 'Kantin Kantor, Surabaya',
      affection: 1,
    },
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Tapi tentu saja, perjalanan perasaan ini tidak pernah semulus jalan tol.',
    narration: [
      'Kita punya seorang rekan kerja perempuan di divisi sebelah.',
      'Dia orang yang ramah, asyik, dan sebenarnya sama sekali tidak punya salah apa-apa.',
      'Kamu juga murni menganggapnya sebagai teman mengobrol kerja yang wajar.',
      'Tapi logikaku tidak sejalan dengan apa yang dirasakan hatiku...',
    ],
    systemBox: {
      title: 'QUEST 02: THE OTHER GIRL',
      lines: [
        { label: 'NPC INTRODUCED', value: '[ FEMALE COWORKER ]' },
        { label: 'STATUS', value: 'CASUAL CONVERSATION' },
        { label: 'THREAT LEVEL', value: 'CRITICAL (IN CEGIL\'S MIND)' },
      ],
      accentColor: 'amber',
    },
    affection: 1,
    bgmMood: 'office',
    onNext: 'quest02-canteen',
  },

  'quest02-canteen': {
    id: 'quest02-canteen',
    phase: 'quest02',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Siang itu di kantin. Dari meja tempatku duduk, aku melihat kalian berdua tertawa santai membicarakan sesuatu.',
    narration: [
      'Rasanya seperti ada jarum kecil yang menusuk ulu hati tanpa peringatan.',
      'Kenapa kamu bisa tertawa selepas itu dengannya?',
      'Kenapa aku yang tidak punya hak apa-apa ini merasa begitu sesak?',
    ],
    interactionType: 'jealousy',
    affection: 1,
    onNext: 'quest02-denial',
  },

  'quest02-denial': {
    id: 'quest02-denial',
    phase: 'quest02',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Malam harinya di kamar, aku melewati tiga fase penyangkalan yang konyol.',
    narration: [
      'Fase pertama: Wajar sesama teman ngobrol, aku cuma lagi lapar aja.',
      'Fase kedua: Masli bukan siapa-siapaku, ngapain aku peduli?',
      'Fase ketiga: Tapi kenapa dia harus tertawa selepas itu sih?!',
    ],
    systemBox: {
      title: 'INTERNAL DENIAL METER',
      lines: [
        { label: 'STAGE 1: RATIONALIZATION', value: 'FAILED' },
        { label: 'STAGE 2: INDIFFERENCE', value: 'FAILED' },
        { label: 'STAGE 3: PURE JEALOUSY', value: '100%', progress: 100, color: 'red' },
      ],
      accentColor: 'pink',
    },
    affection: 1,
    onNext: 'quest02-google',
  },

  'quest02-google': {
    id: 'quest02-google',
    phase: 'quest02',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Pukul satu dini hari, layar HP-ku menyala dengan pencarian Google paling memalukan: cara membedakan rasa cemburu biasa atau beneran suka sama rekan kerja.',
    narration: [
      'Semua artikel internet menyimpulkan hal yang sama persis:',
      'Kalau kamu sudah tidak tahan melihatnya dekat dengan orang lain, itu bukan lagi sekadar penasaran.',
      'Masalahnya bukan perempuan itu. Masalahnya adalah: Aku sudah jatuh cinta pada Masli.',
    ],
    systemBox: {
      title: 'SELF-DIAGNOSIS COMPLETE',
      lines: [
        { label: 'DIAGNOSIS', value: 'FALLING IN LOVE' },
        { label: 'SYMPTOMS', value: 'JEALOUSY, LOSS OF FOCUS, HEART FLUTTERS' },
        { label: 'CURE', value: 'CONFRONTATION' },
      ],
      accentColor: 'red',
    },
    affection: 1,
    transitionOut: 'wipe-right',
    onNext: 'quest03-1',
  },

  // ==========================================
  // QUEST 03 — SAY IT OR KEEP IT (Latar: KANTOR)
  // ==========================================
  'quest03-1': {
    id: 'quest03-1',
    phase: 'quest03',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    isChapterStart: true,
    chapterMeta: {
      title: 'QUEST 03',
      subtitle: 'SAY IT OR KEEP IT',
      date: '24–25 Juli 2026',
      location: 'Ruang Kerja, Surabaya',
      affection: 1,
    },
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Aku dihadapkan pada dua persimpangan jalan yang sama-sama menakutkan.',
    narration: [
      'Jalan pertama: Tetap diam, pura-pura tidak punya perasaan apa-apa, dan menelan cemburu itu sendirian setiap hari.',
      'Jalan kedua: Mengatakannya secara terbuka, mempertaruhkan rasa malu seumur hidup di hadapan teman sekantor.',
      'Tapi memendam rasa ini rasanya sudah jauh lebih menyiksa daripada ditolak.',
    ],
    systemBox: {
      title: 'QUEST 03: SAY IT OR KEEP IT',
      lines: [
        { label: 'CHOICE A', value: 'DIAM & MENDERITA SENDIRI' },
        { label: 'CHOICE B', value: 'BERKATA JUJUR APAPUN HASILNYA' },
        { label: 'CHANCE OF REGRET', value: '100% EITHER WAY' },
      ],
      accentColor: 'red',
    },
    affection: 1,
    bgmMood: 'office',
    onNext: 'quest03-draft',
  },

  'quest03-draft': {
    id: 'quest03-draft',
    phase: 'quest03',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Malam itu, aku memberanikan diri mengirim pesan padamu untuk mengajak bertemu di luar jam kantor.',
    narration: [
      'Pilih draft pesan WhatsApp yang dikirimkan ke Masli:',
    ],
    interactionType: 'draft-message',
    affection: 1,
    onNext: 'quest03-ready',
  },

  'quest03-ready': {
    id: 'quest03-ready',
    phase: 'quest03',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Pesan sudah terkirim. Dan kamu membalas dengan santai: oke, besok sore di Cafe Little Cave ya.',
    narration: [
      'Tidak ada jalan mundur lagi.',
      'Besok adalah tanggal 26 Juli 2026 — hari di mana segalanya akan dimulai.',
    ],
    systemBox: {
      title: 'DESTINATION LOCKED',
      lines: [
        { label: 'LOCATION', value: 'CAFE LITTLE CAVE' },
        { label: 'DATE', value: '26 JULY 2026' },
        { label: 'OPERATION', value: 'THE CONFESSION' },
      ],
      accentColor: 'green',
    },
    affection: 1,
    transitionOut: 'fade-black',
    onNext: 'chapter01-1',
  },

  // ==========================================
  // CHAPTER 01 — THE BEGINNING OF ANOMALY (Latar: CAFE LITTLE CAVE)
  // ==========================================
  'chapter01-1': {
    id: 'chapter01-1',
    phase: 'chapter01',
    location: 'cafe-little-cave',
    bgImage: '/assets/bg-cafe.jpg',
    isChapterStart: true,
    chapterMeta: {
      title: 'CHAPTER 01',
      subtitle: 'THE BEGINNING OF ANOMALY',
      date: '26 Juli 2026',
      location: 'Cafe Little Cave, Surabaya',
      affection: 0,
    },
    speaker: 'Narator',
    textType: 'narration', // Narasi (no quotes)
    text: '26 Juli 2026 — Kafe Little Cave, Surabaya.',
    narration: [
      'Sore itu, suasana Kafe Little Cave terasa sangat bersahabat.',
      'Lampu bohlam Edison temaram menggantung di atas meja kayu rustic.',
      'Aroma espresso dan hembusan pendingin ruangan mengisi celah-celah percakapan.',
      'Dua orang yang biasanya hanya bertegur sapa soal pekerjaan, kini duduk berhadapan tanpa ada sekat pembatas.',
    ],
    systemBox: {
      title: 'CHAPTER 01: LITTLE CAVE',
      lines: [
        { label: 'DATE', value: '26 JULY 2026' },
        { label: 'LOCATION', value: 'CAFE LITTLE CAVE' },
        { label: 'ALI AWARENESS', value: '0% — COMPLETELY CLUELESS' },
      ],
      accentColor: 'amber',
    },
    affection: 0,
    bgmMood: 'cozy',
    onNext: 'chapter01-explore',
  },

  'chapter01-explore': {
    id: 'chapter01-explore',
    phase: 'chapter01',
    location: 'cafe-little-cave',
    bgImage: '/assets/bg-cafe.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Kamu duduk di depanku dengan tampang santai tanpa curiga sedikit pun. Sementara di dalam kepalaku, ada perang saudara yang sedang meletus.',
    narration: [
      'Periksa benda-benda di sekitar meja kafe sebelum aku memulai percakapan ini:',
    ],
    interactionType: 'cafe-explore',
    affection: 0,
    onNext: 'chapter01-confess',
  },

  'chapter01-confess': {
    id: 'chapter01-confess',
    phase: 'chapter01',
    location: 'cafe-little-cave',
    bgImage: '/assets/bg-cafe.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'dialogue', // Spoken Dialogue out loud (with quotes)
    text: '“Jadi gimana, Mas?\n\nKamu kan udah tau aku suka kamu, nah yaudah, gausah dibawa pusing.\nApa yang aku rasakan itu bukan urusanmu.\n\nToh aku suka kamu juga ngga ada harapan untuk dibalas sama kamu kok.\nJadi anggep aja gaada apa-apa. Jangan bingung sendiri.”',
    narration: [
      'Kata-kata itu meluncur dengan intonasi yang kuusahakan se-santai mungkin, meskipun tanganku di bawah meja meremas celana dengan sangat kuat.',
      'Waktu seakan membeku selama beberapa detik di Little Cave.',
    ],
    systemBox: {
      title: 'THE CONFESSION',
      lines: [
        { label: 'SPEAKER', value: 'CEGIL' },
        { label: 'TYPE', value: 'UNCONDITIONAL CONFESSION' },
        { label: 'DEMAND', value: 'NONE' },
      ],
      accentColor: 'pink',
    },
    affection: 0,
    onNext: 'chapter01-choice',
  },

  'chapter01-choice': {
    id: 'chapter01-choice',
    phase: 'chapter01',
    location: 'cafe-little-cave',
    bgImage: '/assets/bg-cafe.jpg',
    speaker: 'System',
    textType: 'narration',
    text: 'Sebagai Ali, bagaimana respon pikiranmu saat mendengar kalimat pengakuan yang begitu jujur dan tidak menuntut ini?',
    systemBox: {
      title: 'INPUT PROMPT FOR ALI',
      lines: [
        { label: 'INCOMING STATEMENT', value: 'UNCONDITIONAL CONFESSION' },
        { label: 'ALI STATUS', value: 'PROCESSING FEELINGS...' },
      ],
      accentColor: 'cyan',
    },
    choices: [
      {
        id: 'opt-bingung',
        text: '“Aku bingung...”',
        reaction: 'Kamu terdiam menatap cangkir kopi. Jawaban jujur dari seseorang yang mendadak disodorkan sebuah perasaan besar tanpa tuntutan balasan.',
      },
      {
        id: 'opt-kenapa',
        text: '“Kenapa kamu ngomong begini?”',
        reaction: 'Pertanyaan itu membuatmu menatap perempuan di hadapanmu lebih lekat, menyadari betapa besarnya keberanian yang dia butuhkan untuk bicara.',
      },
      {
        id: 'opt-pikirin',
        text: '“Aku pikirin dulu.”',
        reaction: 'Kamu tidak menolak dan tidak juga buru-buru mengiyakan. Kamu butuh waktu — dan itu adalah sebuah bentuk penghargaan atas kejujurannya.',
      },
    ],
    affection: 0,
    onNext: 'chapter01-after',
  },

  'chapter01-after': {
    id: 'chapter01-after',
    phase: 'chapter01',
    location: 'cafe-little-cave',
    bgImage: '/assets/bg-cafe.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Di perjalanan pulang sore itu, rasanya seperti ada beban sepuluh kilogram yang baru saja terangkat dari dadaku.',
    narration: [
      'Aku tidak tahu apa yang akan terjadi selanjutnya.',
      'Apakah kita akan menjadi canggung di kantor? Apakah kamu akan menjauhiku?',
      'Tapi setidaknya, satu hal sudah pasti: Aku sudah tidak lagi menyimpan rahasia sendirian.',
    ],
    systemBox: {
      title: 'POST-CONFESSION STATUS',
      lines: [
        { label: 'RELIEF LEVEL', value: '100%', progress: 100 },
        { label: 'AWKWARDNESS RISK', value: '50%', progress: 50 },
        { label: 'ALI AFFECTION', value: '0%', progress: 0 },
      ],
      accentColor: 'amber',
    },
    affection: 0,
    onNext: 'chapter01-result',
  },

  'chapter01-result': {
    id: 'chapter01-result',
    phase: 'chapter01',
    location: 'cafe-little-cave',
    bgImage: '/assets/bg-cafe.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Dan ternyata... pengakuan di Little Cave sore itu bukan akhir dari cerita. Itu baru permulaan dari semua anomali ini.',
    narration: [
      'Sebuah titik awal yang perlahan tapi pasti membawa kita ke tempat-tempat yang tidak terduga.',
    ],
    systemBox: {
      title: 'STATUS UPDATE',
      lines: [
        { label: 'OLD STATUS', value: 'WORK COLLEAGUES' },
        { label: 'NEW STATUS', value: 'COMPLICATED & CURIOUS' },
        { label: 'TIMELINE', value: 'ENTERING AUGUST 2026' },
      ],
      accentColor: 'green',
    },
    affection: 0,
    transitionOut: 'wipe-right',
    onNext: 'chapter02-1',
  },

  // ==========================================
  // CHAPTER 02 — THE APPROACH (Latar: KANTOR)
  // ==========================================
  'chapter02-1': {
    id: 'chapter02-1',
    phase: 'chapter02',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    isChapterStart: true,
    chapterMeta: {
      title: 'CHAPTER 02',
      subtitle: 'THE APPROACH',
      date: '26 Juli — 8 Agustus 2026',
      location: 'Kantor Abadi Jaya, Surabaya',
      affection: 5,
    },
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: '26 Juli sampai 8 Agustus 2026. Dua minggu yang aneh dan mendebarkan di kantor.',
    narration: [
      'Dunia tidak mendadak berubah menjadi drama musikal.',
      'Tidak ada tombol ajaib yang membuat seseorang langsung jatuh cinta dalam semalam.',
      'Tapi ada sesuatu yang bergeser dalam interaksi kita berdua.',
    ],
    systemBox: {
      title: 'CHAPTER 02: THE APPROACH',
      lines: [
        { label: 'TIMELINE', value: '26 JULY — 8 AUGUST 2026' },
        { label: 'PHASE', value: 'GRADUAL APPROACH' },
        { label: 'STRATEGY', value: 'BE NATURAL, BE PATIENT' },
      ],
      accentColor: 'cyan',
    },
    affection: 2,
    bgmMood: 'office',
    onNext: 'chapter02-kantin-obrolan',
  },

  'chapter02-kantin-obrolan': {
    id: 'chapter02-kantin-obrolan',
    phase: 'chapter02',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Kita mulai makan siang bareng secara sengaja. Bukan lagi karena kebetulan meja kantin penuh.',
    narration: [
      'Obrolan yang awalnya kaku perlahan mulai mencair.',
      'Aku mulai tahu karakter hero favoritmu di Mobile Legends, film Marvel kesukaanmu, dan bagaimana caramu memandang masa depan.',
    ],
    systemBox: {
      title: 'COMMON TOPICS DISCOVERED',
      lines: [
        { label: 'GAMING INTERESTS', value: 'MOBILE LEGENDS' },
        { label: 'POP CULTURE', value: 'MARVEL CINEMATIC UNIVERSE' },
        { label: 'CONVERSATION LENGTH', value: '45 MINUTES' },
      ],
      accentColor: 'green',
    },
    affection: 3,
    onNext: 'chapter02-chat',
  },

  'chapter02-chat': {
    id: 'chapter02-chat',
    phase: 'chapter02',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Lalu untuk pertama kalinya, notifikasi WhatsApp dari namamu muncul di luar jam kantor.',
    narration: [
      'Ketuk layar untuk membalas chat Masli di bawah ini:',
    ],
    interactionType: 'chat-tapper',
    affection: 5,
    onNext: 'chapter02-teasing',
  },

  'chapter02-teasing': {
    id: 'chapter02-teasing',
    phase: 'chapter02',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Kamu mulai suka bercanda dan melempar ledekan-ledekan kecil yang membuatku tersenyum sendiri di meja kerja.',
    narration: [
      'Sisi dirimu yang cuek dan dingin perlahan mulai memperlihatkan celah kecil.',
      'Celah yang hangat, sedikit jahil, dan sangat menyenangkan.',
    ],
    systemBox: {
      title: 'TRAIT DETECTED',
      lines: [
        { label: 'PLAYFUL TEASING', value: 'UNLOCKED' },
        { label: 'SMILE COUNTER', value: '+12 / DAY' },
      ],
      accentColor: 'pink',
    },
    affection: 5,
    onNext: 'chapter02-montage',
  },

  'chapter02-montage': {
    id: 'chapter02-montage',
    phase: 'chapter02',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Dan mungkin tanpa kusadari saat itu... aku bukan satu-satunya orang yang mulai melangkah maju.',
    narration: [
      'Benih itu sudah tertanam. Tinggal menunggu waktu sampai ia tumbuh menjadi sesuatu yang lebih besar.',
    ],
    systemBox: {
      title: 'DAILY EVENT COUNTER',
      lines: [
        { label: 'COFFEE SHARED', value: '+14 CUPS' },
        { label: 'LUNCHES TOGETHER', value: '+8 DAYS' },
        { label: 'OUTSIDE CHATS', value: 'FREQUENT' },
        { label: 'INITIAL AFFECTION', value: 'READY FOR NEXT LEAP' },
      ],
      accentColor: 'green',
    },
    affection: 5,
    transitionOut: 'fade-black',
    onNext: 'chapter03-1',
  },

  // ==========================================
  // CHAPTER 03 — 50% AFFECTION (Latar: TROPODO)
  // ==========================================
  'chapter03-1': {
    id: 'chapter03-1',
    phase: 'chapter03',
    location: 'tropodo',
    bgImage: '/assets/bg-tropodo.jpg',
    isChapterStart: true,
    chapterMeta: {
      title: 'CHAPTER 03',
      subtitle: '50% AFFECTION (MEET THE PARENTS)',
      date: '8 Agustus 2026',
      location: 'Rumah Cegil, Tropodo, Sidoarjo',
      affection: 50,
    },
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: '8 Agustus 2026 — Rumah orang tuaku di Tropodo, Sidoarjo.',
    narration: [
      'Hari itu, kamu memberanikan diri untuk datang main ke rumahku.',
      'Sebelum kamu datang, lewat pesan singkat kamu sempat mengaku perasaamu saat itu sudah sekitar 50%.',
    ],
    systemBox: {
      title: 'CHAPTER 03: 50% AFFECTION',
      lines: [
        { label: 'LOCATION', value: 'TROPODO, SIDOARJO' },
        { label: 'INITIAL AFFECTION', value: '50%', progress: 50 },
        { label: 'EVENT', value: 'VISITING CEGIL\'S HOME' },
      ],
      accentColor: 'amber',
    },
    affection: 50,
    affectionChangeText: '50% AFFECTION UNLOCKED',
    bgmMood: 'home',
    onNext: 'chapter03-arrive-home',
  },

  'chapter03-arrive-home': {
    id: 'chapter03-arrive-home',
    phase: 'chapter03',
    location: 'tropodo',
    bgImage: '/assets/bg-tropodo.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Kamu duduk di ruang tamu keluarga kami dengan lantai tegel klasik, toples camilan di meja, dan kipas angin yang berputar pelan.',
    narration: [
      'Kupikir kamu bakal kaku dan bingung menghadapi orang tuaku.',
      'Tapi ternyata dugaanku salah besar.',
    ],
    systemBox: {
      title: 'HOME ENVIRONMENT',
      lines: [
        { label: 'ATMOSPHERE', value: 'WARM & COZY' },
        { label: 'NERVOUSNESS', value: 'LOW' },
        { label: 'NATURAL CHARM', value: 'ACTIVE' },
      ],
      accentColor: 'green',
    },
    affection: 50,
    onNext: 'chapter03-meet-parents',
  },

  'chapter03-meet-parents': {
    id: 'chapter03-meet-parents',
    phase: 'chapter03',
    location: 'tropodo',
    bgImage: '/assets/bg-tropodo.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Kamu bisa mengobrol santai dan sopan dengan kedua orang tuaku seolah-olah kamu sudah sering bertamu ke sini.',
    narration: [
      'Caramu menjawab pertanyaan papa, caramu tersenyum ramah pada mama...',
      'Tidak ada kepura-puraan. Kamu hadir sebagai dirimu sendiri yang apa adanya.',
    ],
    systemBox: {
      title: 'PARENTAL IMPRESSION',
      lines: [
        { label: 'PAPA\'S EVALUATION', value: 'SOPAN & TANGGUNG JAWAB' },
        { label: 'MAMA\'S EVALUATION', value: 'ANAKNYA BAIK & GA NEKO-NEKO' },
        { label: 'APPROVAL RATING', value: 'HIGH' },
      ],
      accentColor: 'green',
    },
    affection: 55,
    onNext: 'chapter03-surge',
  },

  'chapter03-surge': {
    id: 'chapter03-surge',
    phase: 'chapter03',
    location: 'tropodo',
    bgImage: '/assets/bg-tropodo.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Dan setelah kamu pamit pulang sore itu...',
    narration: [
      'Entah bagaimana sistem algoritma perasaan manusia bekerja...',
      'Tapi kamu bilang perasaamu langsung naik menjadi 60%!',
      'Ternyata bertemu orang tua seseorang memberikan bonus instan +10% affection!',
    ],
    systemBox: {
      title: 'AFFECTION SURGE DETECTED',
      lines: [
        { label: 'BEFORE MEETING', value: '50%', progress: 50 },
        { label: 'AFTER MEETING', value: '60%', progress: 60 },
        { label: 'BONUS MULTIPLIER', value: '+10%' },
        { label: 'REASON', value: 'MEETING THE PARENTS' },
      ],
      accentColor: 'green',
    },
    affection: 60,
    affectionChangeText: '50% → 60% AFFECTION (+10%)',
    onNext: 'chapter03-reflection',
  },

  'chapter03-reflection': {
    id: 'chapter03-reflection',
    phase: 'chapter03',
    location: 'tropodo',
    bgImage: '/assets/bg-tropodo.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Malam itu di kamarku di Tropodo, aku tersenyum memandangi pesanmu: udah 60% nih.',
    narration: [
      '60% berarti ada kemungkinan besar.',
      'Tapi kita masih butuh satu tempat istimewa lagi untuk menyempurnakannya menjadi seratus persen...',
    ],
    systemBox: {
      title: 'DESTINATION QUEUED',
      lines: [
        { label: 'NEXT DESTINATION', value: 'MALANG' },
        { label: 'TARGET DATE', value: '16 AUGUST 2026' },
      ],
      accentColor: 'cyan',
    },
    affection: 60,
    transitionOut: 'fade-black',
    onNext: 'chapter04-1',
  },

  // ==========================================
  // CHAPTER 04 — MALANG (JADIAN RESMI)
  // ==========================================
  'chapter04-1': {
    id: 'chapter04-1',
    phase: 'chapter04',
    location: 'malang',
    bgImage: '/assets/bg-malang.jpg',
    isChapterStart: true,
    chapterMeta: {
      title: 'CHAPTER 04',
      subtitle: 'MALANG (THE ANOMALY CONFIRMED)',
      date: '16 Agustus 2026',
      location: 'Viewpoint Bukit Malang, Jawa Timur',
      affection: 60,
    },
    speaker: 'Narator',
    textType: 'narration', // Narasi (no quotes)
    text: '16 Agustus 2026 — Perjalanan ke Malang.',
    narration: [
      'Malam itu di Malang, udara pegunungan begitu sejuk dan menyegarkan.',
      'Dari ketinggian bukit, pemandangan lampu-lampu kota terbentang luas seperti karpet bintang yang berkilauan.',
      'Dan di tanggal 16 Agustus ini, sesuatu yang tadinya berupa anomali kecil akhirnya menemukan kepastian.',
    ],
    systemBox: {
      title: 'CHAPTER 04: MALANG (SPECIAL EVENT)',
      lines: [
        { label: 'DATE', value: '16 AUGUST 2026' },
        { label: 'LOCATION', value: 'MALANG VIEWPOINT' },
        { label: 'ATMOSPHERE', value: 'COOL BREEZE & STARRY LIGHTS' },
      ],
      accentColor: 'cyan',
    },
    affection: 60,
    bgmMood: 'romantic',
    onNext: 'chapter04-explore',
  },

  'chapter04-explore': {
    id: 'chapter04-explore',
    phase: 'chapter04',
    location: 'malang',
    bgImage: '/assets/bg-malang.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Kita berdiri bersebelahan memandangi pemandangan malam kota Malang.',
    narration: [
      'Buka dan nikmati pemandangan di sekitar bukit sebelum momen penting itu tiba:',
    ],
    interactionType: 'malang-explore',
    affection: 70,
    onNext: 'chapter04-buildup',
  },

  'chapter04-buildup': {
    id: 'chapter04-buildup',
    phase: 'chapter04',
    location: 'malang',
    bgImage: '/assets/bg-malang.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Ada hening yang begitu damai di antara kita berdua. Bukan hening yang canggung seperti dulu di Little Cave, tapi hening yang hangat.',
    narration: [
      'Lalu kamu menoleh ke arahku. Menatapku dengan pandangan yang paling tenang yang pernah kulihat.',
      'Dan kata-kata itu akhirnya keluar dari bibirmu...',
    ],
    systemBox: {
      title: 'EVENT COUNTDOWN',
      lines: [
        { label: 'MOMENT', value: 'IMMINENT' },
        { label: 'HEART RATE', value: '140 BPM' },
      ],
      accentColor: 'pink',
    },
    affection: 80,
    onNext: 'chapter04-ali-iloveyou',
  },

  'chapter04-ali-iloveyou': {
    id: 'chapter04-ali-iloveyou',
    phase: 'chapter04',
    location: 'malang',
    bgImage: '/assets/bg-malang.jpg',
    speaker: 'Ali',
    speakerTitle: 'Player 1',
    speakerAvatar: 'ali',
    textType: 'dialogue', // Spoken Dialogue out loud (with quotes)
    text: '“I love you.”',
    affection: 85,
    onNext: 'chapter04-cegil-ask',
  },

  'chapter04-cegil-ask': {
    id: 'chapter04-cegil-ask',
    phase: 'chapter04',
    location: 'malang',
    bgImage: '/assets/bg-malang.jpg',
    speaker: 'Cegil',
    speakerTitle: 'Player 2',
    speakerAvatar: 'cegil',
    textType: 'dialogue', // Spoken Dialogue out loud (with quotes)
    text: '“I love you sebagai apa nih?”',
    affection: 85,
    onNext: 'chapter04-ali-aswhat',
  },

  'chapter04-ali-aswhat': {
    id: 'chapter04-ali-aswhat',
    phase: 'chapter04',
    location: 'malang',
    bgImage: '/assets/bg-malang.jpg',
    speaker: 'Ali',
    speakerTitle: 'Player 1',
    speakerAvatar: 'ali',
    textType: 'dialogue', // Spoken Dialogue out loud (with quotes)
    text: '“Gatau sebagai apa.”',
    affection: 90,
    onNext: 'chapter04-cegil-official',
  },

  'chapter04-cegil-official': {
    id: 'chapter04-cegil-official',
    phase: 'chapter04',
    location: 'malang',
    bgImage: '/assets/bg-malang.jpg',
    speaker: 'Cegil',
    speakerTitle: 'Player 2',
    speakerAvatar: 'cegil',
    textType: 'dialogue', // Spoken Dialogue out loud (with quotes)
    text: '“Sekalian di-official-in ga sih?”',
    affection: 90,
    onNext: 'chapter04-ali-pacaran',
  },

  'chapter04-ali-pacaran': {
    id: 'chapter04-ali-pacaran',
    phase: 'chapter04',
    location: 'malang',
    bgImage: '/assets/bg-malang.jpg',
    speaker: 'Ali',
    speakerTitle: 'Player 1',
    speakerAvatar: 'ali',
    textType: 'dialogue', // Spoken Dialogue out loud (with quotes)
    text: '“Iya, ayo di-official-in. Ayo pacaran.”',
    affection: 95,
    onNext: 'chapter04-freeze',
  },

  'chapter04-freeze': {
    id: 'chapter04-freeze',
    phase: 'chapter04',
    location: 'malang',
    bgImage: '/assets/bg-malang.jpg',
    speaker: 'System',
    textType: 'narration',
    text: 'SYSTEM ERROR: PLAYER 2 RESPONSE NOT FOUND.\n\nCegil membeku beberapa detik di bawah gemerlap malam kota Malang. Jantung berdetak di luar batas wajar...',
    systemBox: {
      title: 'SYSTEM OVERLOAD: RELATIONSHIP UNLOCKED',
      lines: [
        { label: 'DECLARATION', value: '“I LOVE YOU”' },
        { label: 'RESPONSE', value: '“AYO OFFICIAL”' },
        { label: 'STATUS', value: 'OFFICIALLY TOGETHER' },
      ],
      accentColor: 'pink',
    },
    affection: 95,
    onNext: 'chapter04-ali-100',
  },

  'chapter04-ali-100': {
    id: 'chapter04-ali-100',
    phase: 'chapter04',
    location: 'malang',
    bgImage: '/assets/bg-malang.jpg',
    speaker: 'Ali',
    speakerTitle: 'Player 1',
    speakerAvatar: 'ali',
    textType: 'dialogue', // Spoken Dialogue out loud (with quotes)
    text: '“Aku bohong nek ga suka.\nUdah 100% ini.”',
    affection: 100,
    onNext: 'chapter04-cegil-100',
  },

  'chapter04-cegil-100': {
    id: 'chapter04-cegil-100',
    phase: 'chapter04',
    location: 'malang',
    bgImage: '/assets/bg-malang.jpg',
    speaker: 'Cegil',
    speakerTitle: 'Player 2',
    speakerAvatar: 'cegil',
    textType: 'dialogue', // Spoken Dialogue out loud (with quotes)
    text: '“He em! Ayok pol!”',
    affection: 100,
    affectionChangeText: '★ 100% AFFECTION UNLOCKED ★',
    specialEffect: 'confetti',
    transitionIn: 'flash-white',
    onNext: 'chapter04-celebration',
  },

  'chapter04-celebration': {
    id: 'chapter04-celebration',
    phase: 'chapter04',
    location: 'malang',
    bgImage: '/assets/bg-malang.jpg',
    speaker: 'Cegil',
    speakerTitle: 'Player 2',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Dari 0% di Little Cave pada 26 Juli, naik ke 50% lalu 60% di Tropodo, dan malam ini di Malang: 100% Affection tercapai sepenuhnya!',
    systemBox: {
      title: 'ANOMALY CONFIRMED: 100% REACHED',
      lines: [
        { label: 'WORK COLLEAGUES', value: 'COMPLETED ✓' },
        { label: 'FRIENDS', value: 'COMPLETED ✓' },
        { label: 'BOYFRIEND & GIRLFRIEND', value: 'ACTIVE & OFFICIAL ✓' },
        { label: 'AFFECTION LEVEL', value: '100% (MAXIMUM)', progress: 100 },
      ],
      accentColor: 'pink',
    },
    affection: 100,
    onNext: 'chapter05-hub',
  },

  // ==========================================
  // CHAPTER 05 — MEMORY INVESTIGATION
  // ==========================================
  'chapter05-hub': {
    id: 'chapter05-hub',
    phase: 'chapter05',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    isChapterStart: true,
    chapterMeta: {
      title: 'CHAPTER 05',
      subtitle: 'THE EVIDENCE (MEMORY INVESTIGATION)',
      date: 'Agustus 2026 & Seterusnya',
      location: 'Arsip Kenangan',
      affection: 100,
    },
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Menjadi pacarmu memberiku akses ke sisi-sisi dirimu yang tidak pernah dilihat orang lain.',
    narration: [
      'Orang luar mungkin melihatmu sebagai sosok yang cuek dan irit bicara.',
      'Tapi aku tahu persis betapa lembut, lucu, dan perhatiannya kamu di balik semua itu.',
      'Silakan investigasi 11 rekaman memori anomali kepribadian Ali di bawah ini:',
    ],
    systemBox: {
      title: 'CHAPTER 05: MEMORY ARCHIVE',
      lines: [
        { label: 'ACCESS LEVEL', value: 'UNRESTRICTED (GIRLFRIEND)' },
        { label: 'FRAGMENTS AVAILABLE', value: '11 EVIDENCE RECORDS' },
      ],
      accentColor: 'cyan',
    },
    affection: 100,
    isMemoryHub: true,
    bgmMood: 'investigation',
    onNext: 'chapter06-1',
  },

  // ==========================================
  // CHAPTER 06 — BOCIL MATANG
  // ==========================================
  'chapter06-1': {
    id: 'chapter06-1',
    phase: 'chapter06',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    isChapterStart: true,
    chapterMeta: {
      title: 'CHAPTER 06',
      subtitle: 'BOCIL MATANG',
      date: '2026',
      location: 'Kantor & Keseharian',
      affection: 100,
    },
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Kamu adalah bocilku. Secara angka di KTP memang lebih muda, tapi dalam banyak hal penting caramu bersikap justru jauh lebih matang.',
    narration: [
      'Di balik sifat cuekmu, ada ketenangan dan rasa tanggung jawab yang selalu membuatku merasa aman.',
    ],
    systemBox: {
      title: 'CLASS IDENTIFIER: ALI',
      lines: [
        { label: 'CHOSEN CLASS', value: 'BOCIL MATANG' },
        { label: 'CORE TRAITS', value: 'RESPONSIBILITY, CALMNESS, SWEETNESS' },
      ],
      accentColor: 'green',
    },
    affection: 100,
    bgmMood: 'cozy',
    onNext: 'chapter06-board',
  },

  'chapter06-board': {
    id: 'chapter06-board',
    phase: 'chapter06',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Aku mengumpulkan bukti-bukti otentik mengapa kamu layak menyandang gelar Bocil Matang.',
    narration: [
      'Buka semua arsip bukti di bawah ini:',
    ],
    interactionType: 'evidence-board',
    affection: 100,
    onNext: 'chapter07-1',
  },

  // ==========================================
  // CHAPTER 07 — THE GIRL HE LETS BE A CHILD (Latar: TROPODO)
  // ==========================================
  'chapter07-1': {
    id: 'chapter07-1',
    phase: 'chapter07',
    location: 'tropodo',
    bgImage: '/assets/bg-tropodo.jpg',
    isChapterStart: true,
    chapterMeta: {
      title: 'CHAPTER 07',
      subtitle: 'THE GIRL HE LETS BE A CHILD',
      date: '2026',
      location: 'Ruang Hati Paling Rapuh',
      affection: 100,
    },
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Ada bagian kecil dalam diriku yang selama bertahun-tahun terbiasa menjaga dirinya sendiri. Tapi sejak kamu ada, aku merasa aman seutuhnya.',
    narration: [
      'Anak kecil yang terlalu lama berdiri tegak di tengah badai, yang belajar menyembunyikan rasa takutnya dan menahan manjanya.',
      'Bersamamu, aku tidak perlu lagi berpura-pura menjadi perempuan serba kuat setiap detik.',
    ],
    systemBox: {
      title: 'INNER CHILD ENCOUNTER',
      lines: [
        { label: 'STATE', value: 'LONG GUARDED' },
        { label: 'CURRENT STATUS', value: 'SAFE AT LAST' },
      ],
      accentColor: 'pink',
    },
    affection: 100,
    isInnerChildUnlock: true,
    bgmMood: 'quiet',
    onNext: 'chapter08-1',
  },

  // ==========================================
  // CHAPTER 08 — NO GUARANTEES
  // ==========================================
  'chapter08-1': {
    id: 'chapter08-1',
    phase: 'chapter08',
    location: 'cafe-little-cave',
    bgImage: '/assets/bg-cafe.jpg',
    isChapterStart: true,
    chapterMeta: {
      title: 'CHAPTER 08',
      subtitle: 'NO GUARANTEES (THE PROMISE OF EFFORT)',
      date: '2026',
      location: 'Cafe Little Cave & Perjalanan Kita',
      affection: 100,
    },
    speaker: 'Ali',
    speakerTitle: 'Player 1',
    speakerAvatar: 'ali',
    textType: 'dialogue', // Spoken Dialogue out loud (with quotes)
    text: '“Siapa yang bisa jamin kita bakal jadi, sih? Ya aku mengusahakan, bukan menjamin.”',
    systemBox: {
      title: 'ALI\'S CORE PHILOSOPHY',
      lines: [
        { label: 'WORDS', value: 'MENGUSAHAKAN, BUKAN MENJAMIN' },
        { label: 'MEANING', value: 'TANGGUNG JAWAB NYATA > JANJI MANIS' },
        { label: 'RARITY', value: 'LEGENDARY' },
      ],
      accentColor: 'green',
    },
    affection: 100,
    bgmMood: 'romantic',
    onNext: 'chapter08-reflection',
  },

  'chapter08-reflection': {
    id: 'chapter08-reflection',
    phase: 'chapter08',
    location: 'cafe-little-cave',
    bgImage: '/assets/bg-cafe.jpg',
    speaker: 'Cegil',
    speakerTitle: 'Player 2',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Mungkin itu yang paling kusukai dari caramu mencintai.',
    narration: [
      'Tidak menjanjikan sesuatu di awang-awang yang belum tentu bisa ditepati.',
      'Cuma memilih untuk sungguh-sungguh mengusahakannya setiap hari.',
    ],
    affection: 100,
    onNext: 'chapter08-protect',
  },

  'chapter08-protect': {
    id: 'chapter08-protect',
    phase: 'chapter08',
    location: 'cafe-little-cave',
    bgImage: '/assets/bg-cafe.jpg',
    speaker: 'Ali',
    speakerTitle: 'Player 1',
    speakerAvatar: 'ali',
    textType: 'dialogue', // Spoken Dialogue out loud (with quotes)
    text: '“Aku gaikut ngasih makan, gaikut ngehidupi, siapa aku ngatur. Ya nanti kalo udah sah ya aku bakal protect dengan tegas. Karena udah bukan lagi soal seneng-seneng, tapi udah soal tanggung jawab.”',
    affection: 100,
    onNext: 'chapter08-conclusion',
  },

  'chapter08-conclusion': {
    id: 'chapter08-conclusion',
    phase: 'chapter08',
    location: 'cafe-little-cave',
    bgImage: '/assets/bg-cafe.jpg',
    speaker: 'Cegil',
    speakerTitle: 'Player 2',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Bagi orang lain mungkin itu terdengar sangat realistis. Tapi bagiku itu adalah kalimat paling bertanggung jawab yang pernah kudengar dari seorang pria.',
    systemBox: {
      title: 'ALI — PASSIVE SKILL UPDATED',
      lines: [
        { label: 'SKILL', value: 'RESPONSIBILITY' },
        { label: 'LEVEL', value: 'MAXIMUM (LV. 99)' },
        { label: 'EFFECT', value: 'UNCONDITIONAL SAFETY' },
      ],
      accentColor: 'cyan',
    },
    affection: 100,
    transitionOut: 'glitch',
    onNext: 'final-quiz-node',
  },

  // ==========================================
  // FINAL CHAPTER — THE ANOMALY QUIZ
  // ==========================================
  'final-quiz-node': {
    id: 'final-quiz-node',
    phase: 'final-quiz',
    location: 'system-void',
    isChapterStart: true,
    chapterMeta: {
      title: 'FINAL CHAPTER',
      subtitle: 'THE ANOMALY TEST',
      date: '24 Oktober 2026',
      location: 'Sistem Pusat ALI.EXE',
      affection: 100,
    },
    speaker: 'System',
    textType: 'narration', // Narasi (no quotes)
    text: 'SYSTEM ARCHIVE REVIEW:\n\n26 Juli — 0%\n8 Agustus — 50% → 60%\n16 Agustus — 100%\n\nPertanyaan Terakhir: Apa yang sebenarnya menyebabkan anomali kepribadian Ali?',
    systemBox: {
      title: 'THE ULTIMATE TEST',
      lines: [
        { label: 'QUESTION', value: 'APA PENYEBAB ANOMALI ALI?' },
        { label: 'CHOICE A', value: 'LITTLE CAVE' },
        { label: 'CHOICE B', value: 'MALANG' },
        { label: 'CHOICE C', value: 'KOPI' },
        { label: 'CHOICE D', value: 'CEGIL' },
      ],
      accentColor: 'cyan',
    },
    affection: 100,
    isQuiz: true,
    bgmMood: 'ambient',
    onNext: 'epilogue-sayang',
  },

  // ==========================================
  // EPILOGUE — SAYANG
  // ==========================================
  'epilogue-sayang': {
    id: 'epilogue-sayang',
    phase: 'epilogue',
    location: 'malang',
    bgImage: '/assets/bg-malang.jpg',
    isChapterStart: true,
    chapterMeta: {
      title: 'EPILOGUE',
      subtitle: 'SAYANG',
      date: 'Hari Ini & Seterusnya',
      location: 'Masa Depan Bersama',
      affection: 100,
    },
    speaker: 'Cegil',
    speakerAvatar: 'cegil',
    textType: 'inner-monologue', // Kata Hati (no quotes)
    text: 'Dulu panggilannya Mas Ali. Lalu berubah jadi Masli. Dan sekarang... ada satu panggilan yang kusimpan hanya untuk hubungan ini: Sayang.',
    narration: [
      'Aku tidak tahu bagaimana tepatnya kepribadianmu berubah.',
      'Atau mungkin sebenarnya kamu tidak pernah berubah sama sekali.',
      'Mungkin aku saja yang akhirnya cukup beruntung diberi kesempatan untuk mengenal bagian-bagian dirimu yang paling lembut.',
      'Sisi lembutmu bukan sesuatu yang bisa dilihat oleh semua orang. Dan aku sangat bersyukur menjadi orang yang boleh memilikinya.',
    ],
    systemBox: {
      title: 'NAME EVOLUTION COMPLETE',
      lines: [
        { label: 'PHASE 1', value: 'MAS ALI (FORMAL)' },
        { label: 'PHASE 2', value: 'MASLI (CATALYST)' },
        { label: 'FINAL FORM', value: 'SAYANG / BOCILKU (ETERNAL)' },
        { label: 'ANOMALY STATUS', value: 'CONFIRMED & PERMANENT ♡' },
      ],
      accentColor: 'pink',
    },
    affection: 100,
    bgmMood: 'romantic',
    onNext: 'epilogue-dialogue',
  },

  'epilogue-dialogue': {
    id: 'epilogue-dialogue',
    phase: 'epilogue',
    location: 'malang',
    bgImage: '/assets/bg-malang.jpg',
    speaker: 'Cegil',
    speakerTitle: 'Player 2',
    speakerAvatar: 'cegil',
    textType: 'dialogue', // Spoken Dialogue out loud (with quotes)
    text: '“I love you, bocilku.”',
    systemBox: {
      title: 'ANOMALY CONFIRMED',
      lines: [
        { label: 'STATUS', value: 'FOREVER TOGETHER ♡' },
        { label: 'AFFECTION', value: '100% (MAXIMUM)' },
      ],
      accentColor: 'pink',
    },
    affection: 100,
    specialEffect: 'heartburst',
    bgmMood: 'romantic',
    transitionOut: 'fade-black',
    onNext: 'save-screen-node',
  },

  // ==========================================
  // SAVE SCREEN & CREDITS
  // ==========================================
  'save-screen-node': {
    id: 'save-screen-node',
    phase: 'save-screen',
    location: 'system-void',
    speaker: 'System',
    textType: 'narration',
    text: 'SAVE DATA HAS BEEN RECORDED SUCCESSFULLY.',
    systemBox: {
      title: 'GAME SAVE STATUS',
      lines: [
        { label: 'SAVE DATE', value: '24 OKTOBER 2026' },
        { label: 'PARTY', value: 'PLAYER 1 (ALI) + PLAYER 2 (CEGIL)' },
        { label: 'RELATIONSHIP', value: 'ACTIVE & ONGOING' },
        { label: 'NEXT QUEST', value: 'ANOTHER YEAR & FOREVER' },
      ],
      accentColor: 'green',
    },
    affection: 100,
    bgmMood: 'celebration',
    onNext: 'credits-node',
  },

  'credits-node': {
    id: 'credits-node',
    phase: 'credits',
    location: 'system-void',
    speaker: 'System',
    textType: 'narration',
    text: 'ALI.EXE — CREDITS ROLL',
    affection: 100,
    bgmMood: 'romantic',
  },
};
