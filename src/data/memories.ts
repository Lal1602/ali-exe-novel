import { MemoryFragment } from '@/types/game';

export const MEMORY_FRAGMENTS: MemoryFragment[] = [
  {
    id: 'the-fall',
    number: 1,
    title: 'THE FALL',
    subtitle: '21 Agustus 2026',
    date: '21 Agustus 2026',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    previewText: 'Aku pernah jatuh dari motor karena tumpahan oli di jalan...',
    fullStory: [
      'Aku pernah jatuh dari motor karena ada tumpahan oli di jalan.',
      'Tapi ketika aku sampai, Ali masih tidur. Dan begitu dia bangun, ia membaca chatku yang mengatakan aku habis jatuh.',
      'Hal pertama yang dia lakukan adalah langsung datang ke meja kerjaku.'
    ],
    dialogue: [
      { speaker: 'Ali', text: 'Mana, liat.' },
      { speaker: 'Cegil', text: 'Cuma memar dikit kok...' },
      { speaker: 'Ali', text: 'Makanya hati-hati. Duduk dulu sini.' }
    ],
    statGain: { label: 'DAMAGE REPORT', value: 'Lutut & Siku: Ringan | Harga Diri: Rusak Parah' },
    unlocked: false,
  },
  {
    id: 'the-bottle',
    number: 2,
    title: 'THE BOTTLE',
    subtitle: 'Parkiran Kantor',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    previewText: 'Ketika aku ingin mengambil botol minum dari motor...',
    fullStory: [
      'Ketika aku ingin mengambil botol minum sendiri dari motor di parkiran...',
      'Dia menahan bahuku dengan santai supaya aku tetap duduk manis di tempat.',
      'Lalu dia berjalan keluar dan mengambilkannya sendiri untukku.'
    ],
    dialogue: [
      { speaker: 'Ali', text: 'Diem di situ. Pengen lihat motornya sekalian.' },
      { speaker: 'Cegil', text: '*(padahal mah alesannya biar aku ga capek jalan abis jatuh ini)*' }
    ],
    statGain: { label: 'CARE & PROTECTIVENESS', value: '+15 POINT' },
    unlocked: false,
  },
  {
    id: 'yang',
    number: 3,
    title: 'YANG...',
    subtitle: 'Sebuah Panggilan',
    location: 'tropodo',
    bgImage: '/assets/bg-tropodo.jpg',
    previewText: 'Layar perlahan gelap. Tidak butuh kalimat panjang...',
    fullStory: [
      'Masih di hari yang sama sehabis insiden jatuh itu...',
      'Ada sebuah jeda dan nada suara yang sangat tenang dari bibirnya.',
      'Hanya satu kata yang diulang dengan cara yang hanya dia yang tahu.'
    ],
    dialogue: [
      { speaker: 'Ali', text: 'Yang...' },
      { speaker: 'Ali', text: 'Yang.....' },
      { speaker: 'Cegil', text: '*(Player Status: 100% MELTED)*' }
    ],
    statGain: { label: 'PLAYER STATUS', value: 'MELTED COMPLETELY' },
    unlocked: false,
  },
  {
    id: 'the-cockroach',
    number: 4,
    title: 'THE COCKROACH',
    subtitle: 'Musuh Bebuyutan',
    location: 'tropodo',
    bgImage: '/assets/bg-tropodo.jpg',
    previewText: 'Ali tahu aku takut kecoa setengah mati...',
    fullStory: [
      'Ali tahu betul aku takut kecoa.',
      'Biasanya dia iseng membiarkannya mendekat dulu buat ngetes reaksiku.',
      'Tapi kali ini, tanpa banyak drama dan sebelum aku sempat teriak...'
    ],
    dialogue: [
      { speaker: 'System', text: 'ENEMY DETECTED: COCKROACH. PLAYER WEAKNESS: EXTREME.' },
      { speaker: 'System', text: 'ALI USED: [PROTECT] — Direct Sweep Defeat!' },
      { speaker: 'Ali', text: 'Udah aman. Jangan lebay.' }
    ],
    statGain: { label: 'COCKROACH HP', value: '0 HP | PLAYER SAFE' },
    unlocked: false,
  },
  {
    id: 'untung-ga-parah',
    number: 5,
    title: 'UNTUNG GA PARAH',
    subtitle: 'Malam Hari',
    location: 'tropodo',
    bgImage: '/assets/bg-tropodo.jpg',
    previewText: 'Ada orang yang bilang "I love you", tapi Ali...',
    fullStory: [
      'Malam itu, tepat sebelum aku tidur...',
      'Dengan nada suara yang sangat pelan dan tulus dari seberang:',
      '“Untung ga parah.”',
      'Bukan kata romantis berbunga-bunga, tapi caranya sendiri menunjukkan betapa dia lega.'
    ],
    dialogue: [
      { speaker: 'Ali', text: 'Untung ga parah...' },
      { speaker: 'Cegil', text: 'Iya, makasih udah ditanyain...' }
    ],
    statGain: { label: 'GENTLE SIDE', value: 'UNLOCKED (+20)' },
    unlocked: false,
  },
  {
    id: 'the-shaver',
    number: 6,
    title: 'THE SHAVER',
    subtitle: 'Penerimaan Apa Adanya',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    previewText: 'Alat cukur elektrik baru dicoba di tangan...',
    fullStory: [
      'Alat cukur elektrik baru dicoba di tangan sampai mulus bersih.',
      'Ketika ditunjukkan ke Ali dengan bangga, responnya malah khas:',
      '“Ah ngapain dicukur ituu. Ga estetik. Ga asik, ga asik.”',
      'Penerimaan tanpa syarat, apa adanya tanpa perlu dibuat-buat.'
    ],
    dialogue: [
      { speaker: 'Cegil', text: 'Lihat mas, mulus kan?' },
      { speaker: 'Ali', text: 'Ngapain dicukur ituu. Ga estetik. Ga asik, ga asik.' }
    ],
    statGain: { label: 'ACCEPTANCE', value: '100% UNCONDITIONAL' },
    unlocked: false,
  },
  {
    id: 'milikku',
    number: 7,
    title: 'MILIKKU',
    subtitle: 'Bibir Dikelopekin',
    location: 'cafe-little-cave',
    bgImage: '/assets/bg-cafe.jpg',
    previewText: 'Bibir luka kecil bekas dikelupas...',
    fullStory: [
      'Bibir luka kecil bekas tak kelopekin sendiri karena kering.',
      'Ali langsung ngeh dan menatap tajam tapi gemas.'
    ],
    dialogue: [
      { speaker: 'Ali', text: 'Kenapa itu bibirmu? Kaya luka gitu.' },
      { speaker: 'Cegil', text: 'Iya abis tak kelopekin tadi...' },
      { speaker: 'Ali', text: 'Kan, udah kuduga. Kamu ngerusak barangku. Itu udah jadi milikku, kenapa kamu rusak.' }
    ],
    statGain: { label: 'POSSESSIVENESS (CUTE)', value: '+999 DAMAGE' },
    unlocked: false,
  },
  {
    id: 'no-real-no-fake',
    number: 8,
    title: 'NO REAL, NO FAKE',
    subtitle: 'Pacarku ya Pacarku',
    location: 'cafe-little-cave',
    bgImage: '/assets/bg-cafe.jpg',
    previewText: 'Waktu digoda "Ya gini aslinya pacarmu..."',
    fullStory: [
      'Ketika digoda dengan kalimat "Ya gini aslinya pacarmu, cerewet dan random..."',
      'Jawabannya tegas, santai, dan langsung menepis semua keraguan.'
    ],
    dialogue: [
      { speaker: 'Cegil', text: 'Kalo asliku gini kamu nyesel ga?' },
      { speaker: 'Ali', text: 'Gaada yg asli, gaada yg palsu. Pacarku ya pacarku.' }
    ],
    statGain: { label: 'SECURITY LEVEL', value: 'ABSOLUTE' },
    unlocked: false,
  },
  {
    id: 'less-cursing',
    number: 9,
    title: 'LESS CURSING',
    subtitle: 'Mobile Legends Habit',
    location: 'kantor',
    bgImage: '/assets/bg-kantor.jpg',
    previewText: 'Sejak dimarahin karena misuh pas main game...',
    fullStory: [
      'Sebagai pemain Mobile Legends sejati, misuh pas kalah ranked itu refleks alami.',
      'Tapi sejak ditegur dan dimarahin...',
      'Ali beneran menahan diri dan jauh mengurangi ngomong kasar. Perubahan kecil yang tidak diminta.'
    ],
    dialogue: [
      { speaker: 'System', text: 'MOBILE LEGENDS: DEFEAT DETECTED.' },
      { speaker: 'Ali', text: '*(menarik napas panjang, nahan misuh)* ...Aman.' },
      { speaker: 'Cegil', text: '*(Pinter banget bocilku)*' }
    ],
    statGain: { label: 'SELF CONTROL', value: '+50 RESPECT' },
    unlocked: false,
  },
  {
    id: 'jogging-raincheck',
    number: 10,
    title: 'JOGGING RAINCHECK',
    subtitle: 'Rencana Ditunda',
    location: 'malang',
    bgImage: '/assets/bg-malang.jpg',
    previewText: '“Besok pengen jogging, tapi kamu ga ikut...”',
    fullStory: [
      'Ali punya rencana mau jogging pagi. Tapi waktu tahu pasangannya kebagian jatah masak dan ga bisa ikut...',
      'Dia memilih membatalkan jadwalnya.'
    ],
    dialogue: [
      { speaker: 'Ali', text: 'Besok pengen jogging, tapi kamu ga ikut. Yawes besoke lagi aja.' },
      { speaker: 'Cegil', text: 'Loh kenapa ga sendirian aja?' },
      { speaker: 'Ali', text: 'aku pengene jogging sm ayangku' }
    ],
    statGain: { label: 'TOGETHERNESS', value: '100%' },
    unlocked: false,
  },
  {
    id: 'cegilku',
    number: 11,
    title: 'CEGILKU',
    subtitle: 'Panggilan Tertinggi',
    location: 'malang',
    bgImage: '/assets/bg-malang.jpg',
    previewText: 'Panggilan level tertinggi yang pernah keluar...',
    fullStory: [
      'Bukan kata-kata puitis dari film romantis.',
      'Tapi justru panggilan yang paling nempel dan paling jujur di hatinya.'
    ],
    dialogue: [
      { speaker: 'Ali', text: 'I love you, cegilku.' },
      { speaker: 'Cegil', text: 'I love you too, bocilku.' }
    ],
    statGain: { label: 'TITLE UNLOCKED', value: 'CEGIL RESMI ALI' },
    unlocked: false,
  }
];
