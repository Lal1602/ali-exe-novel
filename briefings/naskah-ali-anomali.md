# ALI : ANOMALI PENGUBAH KEPRIBADIAN
### Naskah Lengkap — Visual Novel / Game Interaktif

---

## KONTEKS PROYEK (baca dulu sebelum membangun)

Ini adalah **hadiah ulang tahun** dari seorang perempuan untuk pacarnya yang bernama **Ali** (23 tahun). Ceritanya diambil dari kisah nyata hubungan mereka, ditulis ulang dengan gaya "game RPG" — lengkap dengan panel status ala sistem game, meter affection, dan istilah-istilah gaming.

**Poin penting soal sudut pandang:**
Yang akan **memainkan** game ini adalah **Ali sendiri**. Jadi:
- **Player / karakter yang dikontrol = Ali.**
- Perempuan yang menulis diary ini (pacarnya) muncul sebagai karakter lain di dalam cerita — sebut saja **"Cegil"** atau **"Player 2"** — bukan yang dikontrol.
- Konsepnya: Ali sedang "memainkan game tentang dirinya sendiri" untuk mencari tahu "apa yang menyebabkan anomali pada kepribadiannya" — dan di akhir, dia sadar bahwa game ini sebenarnya adalah rekaman perjalanan hubungan mereka berdua, dilihat dari sisi bagaimana pacarnya mengenalnya.
- Sepanjang cerita, ada dua "lapisan": (1) Ali merasa sedang memainkan game misterius, (2) sebenarnya dia sedang mengalami ulang momen-momen nyata bersama pacarnya.

**Nada/gaya penulisan:**
- Ada dua jenis teks yang harus dibedakan secara visual:
  1. **Teks sistem/game-UI** — ditulis seperti tampilan RPG: judul huruf besar, stat bar, angka persen, kotak status. Contoh: `RELATIONSHIP DATABASE`, `AFFECTION: +1`, `ANOMALY DETECTED`.
  2. **Teks narasi** — bahasa Indonesia yang hangat, personal, sedikit puitis, kadang menyelip bahasa Inggris untuk penekanan emosi.
- Dialog ditulis apa adanya (termasuk typo/gaya chat asli) untuk menjaga keaslian suara mereka berdua.
- Humor receh dan romantis bercampur — jangan dibuat terlalu serius/mendayu-dayu terus-menerus.

**Mekanik game yang disarankan (boleh diadaptasi ke tool apa pun):**
1. **Affection Meter** — angka 0–100% yang berubah di titik-titik cerita tertentu (lihat nilai di tiap bab di bawah), ditampilkan persisten di layar.
2. **Chapter 1 (Little Cave)** — Ali diberi 2–3 pilihan respons yang sifatnya kosmetik saja (tidak mengubah alur, cuma variasi reaksi), karena secara canon affection masih 0% di titik itu.
3. **Chapter 5 (Memory Investigation)** — galeri 11 "memory fragment" yang bisa diklik satu per satu untuk membuka isi memorinya (lihat daftar lengkap di bawah). Tidak berurutan, bebas dibuka mana dulu.
4. **Final Chapter (Kuis)** — pertanyaan "Apa yang menyebabkan anomali ini?" dengan 4 pilihan (A/B/C/D), yang SEMUANYA salah — setelah semua dicoba, baru reveal jawaban sebenarnya (bukan satu momen, tapi akumulasi hal-hal kecil).
5. Dua momen "besar" yang layak diberi efek visual spesial (confetti/heart burst/dsb): saat affection mencapai 100% di Malang, dan di reveal terakhir "Sayang" di Epilogue.

**Referensi teknis (opsional, sudah pernah dibuat, boleh dijadikan bahan):**
Sudah ada dua purwarupa dari naskah ini: satu versi HTML interaktif (visual novel scroll-per-scene), dan satu versi Ren'Py (.rpy) untuk dijadikan game desktop/mobile sungguhan. Naskah di bawah ini adalah **sumber cerita lengkapnya** — silakan dibangun ulang di tool/engine apa pun sesuai kebutuhan.

---

## BOOT SCREEN

```
LOADING...
PLAYER FOUND.

NAME: ALI
AGE: 23

MAIN CLASS: MOBILE LEGENDS PLAYER
SECONDARY CLASS: MARVEL ENJOYER

STATUS: ???
HIDDEN TRAIT: ████████████
```

> Kamu telah dipilih untuk sebuah misi penting.
> Sayangnya... kamu belum tahu apa misinya.

```
OBJECTIVE: Cari tahu apa yang terjadi pada kepribadianmu.
[ START ]
```

---

## PROLOGUE — BEFORE THE ANOMALY

> Sebelum semuanya menjadi rumit, kalian sebenarnya cuma teman kerja. Mungkin bahkan kata "teman" terasa terlalu jauh.
>
> Delapan bulan bekerja bersama. Tapi selama itu, hampir tidak pernah benar-benar ngobrol. Kalau bicara, ya karena pekerjaan. Selesai kerja, selesai juga percakapannya. Tidak ada chat random. Tidak ada cerita personal.

```
RELATIONSHIP DATABASE
ALI ↕ PLAYER
STATUS: WORK COLLEAGUES
INTERACTION LEVEL: ████░░░░░░ 4%
OUTSIDE WORK:       ░░░░░░░░░░ 0%
ROMANTIC INTEREST: NOT DETECTED
```

> Waktu itu, panggilannya masih sangat biasa.

**Player:** "Mas Ali."

```
ANOMALY STATUS: NOT DETECTED.
```

---

## QUEST 01 — COFFEE BREAK

```
NEW HABIT DETECTED.
PLAYER HAS STARTED: ORDERING COFFEE FROM ALI.
REASON: UNKNOWN.
```

> Sampai akhirnya mulai sering nitip kopi di jam istirahat. Awalnya ya cuma kopi. Sesederhana itu.

**Player:** "Masli, nitip kopi dong."
**Player (besoknya):** "Masli, nitip lagi."

> Lalu entah sejak kapan, mulai menunggu-nunggu momen itu. Bukan kopinya. **Orang yang membawakannya.**

```
NAME USAGE UPDATED
"MAS ALI" → "MASLI"
SIGNIFICANCE: UNKNOWN
AFFECTION: +1
```

> Kecil sekali. Hampir tidak kelihatan. Tapi ternyata — itulah awalnya.

---

## QUEST 02 — THE OTHER GIRL

```
NEW NPC DETECTED
[ FEMALE COWORKER ]
RELATIONSHIP WITH ALI: WORK FRIEND
THREAT LEVEL: UNKNOWN
```

> Tentu saja, cerita ini tidak akan semudah itu. Ada satu teman kerja perempuan. Dan sebenarnya, dia tidak melakukan apa-apa. Ali juga tidak melakukan apa-apa. Mereka hanya teman kerja.
>
> Tapi entah kenapa, setiap kali melihat mereka ngobrol, ada sesuatu yang terasa tidak nyaman.

```
EMOTION DETECTED
JEALOUSY:         ██████████ 100%
ROMANTIC INTEREST: ████████░░ 80%
SELF-AWARENESS:    ████░░░░░░ 40%
```

> Dan semakin itu disangkal, semakin jelas masalah sebenarnya. Masalahnya bukan perempuan itu. Masalahnya adalah — **mulai suka Masli.**

---

## QUEST 03 — SAY IT OR KEEP IT

> Bisa saja pura-pura tidak peduli. Bisa saja bilang, *"Ah, biasa aja kali."* Bisa saja meyakinkan diri sendiri kalau ini cuma overthinking.
>
> Tapi ada satu hal yang tidak bisa dibohongi: **tidak suka melihat Ali dekat dengan perempuan lain.**
>
> Kalau terus diam, tidak akan pernah tahu jawabannya. Kalau bicara, setidaknya akan tahu.

```
NEW QUEST: CONFESS.
DIFFICULTY: EXTREME
PLAYER CONFIDENCE: ████░░░░░░
CHANCE OF REGRET:  ██████████
```

```
QUEST ACCEPTED.
DESTINATION: LITTLE CAVE
DATE: 26 JULI 2026
```

---

## CHAPTER 01 — THE BEGINNING OF ANOMALY

*Setting: 26 Juli 2026, kafe Little Cave.*

> Tidak ada musik romantis. Tidak ada cinematic besar. Hanya percakapan. Ali belum tahu apa yang akan terjadi.

**Player:** "Jadi gimana, mas? Kamu kan udah tau aku suka kamu, nah yauda, gausah dibawa pusing. Apa yang aku rasakan itu bukan urusanmu. Toh aku suka kamu juga ngga ada harapan untuk dibalas sama kamu juga kok. Jadi anggep aja gaada apa apa. Jangan bingung sendiri."

*Layar berhenti beberapa detik. Sebagai Ali, player belum tahu harus menjawab apa.*

**[PILIHAN — kosmetik, tidak mengubah alur]:**
- A. "Aku bingung." → *Ali diam sejenak, kepalanya penuh pertanyaan yang belum bisa dijawab.*
- B. "Kenapa kamu ngomong begini?" → *Ali menatap lantai. Pertanyaan itu justru berbalik ke dirinya sendiri.*
- C. "Aku pikirin dulu." → *Ali tidak buru-buru menjawab. Ia butuh waktu — dan itu bukan penolakan.*

```
RELATIONSHIP STATUS
WORK COLLEAGUES → COMPLICATED
ALI'S AFFECTION: 0%
```

> Dan ternyata, pengakuan itu bukan akhir dari cerita. Itu baru permulaan.

```
ANOMALY DETECTED. LEVEL: UNKNOWN
```

**[NILAI AFFECTION DI BAB INI: 0%]**

---

## CHAPTER 02 — THE APPROACH

*Setting: 26 Juli – 8 Agustus 2026*

```
QUEST: APPROACH ALI
```

> Setelah hari itu, semuanya tidak langsung berubah. Tidak ada tombol ajaib yang membuat seseorang tiba-tiba jatuh cinta. Tidak ada progress bar yang bisa memastikan hasilnya. Yang ada cuma perlahan mencoba mendekat. Sedikit demi sedikit.

```
MONTAGE — DAILY EVENTS
COFFEE           +1
CONVERSATION     +1
TIME TOGETHER    +1
TEASING          +1
JEALOUSY         +5
DENIAL           −2
```

```
RELATIONSHIP PROGRESS
COLLEAGUES     ██████████
FRIENDS        ████░░░░░░
SOMETHING ELSE ██░░░░░░░░
```

> Dan mungkin tanpa disadari, Ali bukan satu-satunya yang mulai bergerak.

**[NILAI AFFECTION DI BAB INI: masih 0%, membangun perlahan]**

---

## CHAPTER 03 — 50%

*Setting: 8 Agustus 2026*

```
QUEST: MEET THE PARENTS
```

> Hari itu, Ali datang ke rumah orang tua Player. Sebelum datang, katanya perasaannya sudah sekitar **50%**. Setelah berbicara dengan orang tua Player — ternyata naik menjadi **60%**.

```
ALI'S AFFECTION
BEFORE: 50%
AFTER:  60%   (+10%)
REASON: MEETING THE PARENTS
```

> Entah bagaimana sistem perasaan manusia bekerja, tapi ternyata bertemu orang tua seseorang bisa memberikan +10% affection.

**[NILAI AFFECTION DI BAB INI: 50% → 60%]**

---

## CHAPTER 04 — MALANG

*Setting: 16–17 Agustus 2026, perjalanan ke Malang. Momen kunci terjadi di tanggal 16.*

**Ali:** "I love you."
**Player:** "I love you sebagai apa nih?"
**Ali:** "Gatau sebagai apa."
**Player:** "Sekalian di officialin gasih?"
**Ali:** "Iya ayo di officialin. Ayo pacaran."

*PLAYER FREEZES.*

```
SYSTEM ERROR.
PLAYER RESPONSE: NOT FOUND.
```

**Ali:** "Aku bohong nek ga suka. Udah 100% ini."
**Player:** "He em. Ayok pol."

```
RELATIONSHIP STATUS
COLLEAGUES ✓  FRIENDS ✓  SOMETHING ✓  BOYFRIEND/GIRLFRIEND ✓

ALI'S AFFECTION: 0% → 50% → 60% → 100%
```

```
ANOMALY CONFIRMED. CAUSE: UNKNOWN.
```

**[NILAI AFFECTION DI BAB INI: 100% — titik ini cocok diberi efek visual spesial (confetti/heart burst)]**

---

## CHAPTER 05 — ANOMALY (Memory Investigation)

```
STATUS: RELATIONSHIP ESTABLISHED.
NEW DATA UNLOCKED: ALI — HIDDEN TRAITS ████████████
```

> Tapi ternyata, menjadi pacarnya Player memberi akses ke sesuatu yang sebelumnya tidak pernah terlihat. Sisi yang cuek di depan banyak orang, tapi ternyata lembut ketika tidak ada yang melihat.

**[MEKANIK: galeri 11 memory fragment, bisa dibuka bebas urutan. Daftar lengkap isinya:]**

1. **THE FALL** — 21 Agustus. Player jatuh dari motor karena oli tumpah di jalan. Begitu Ali bangun, hal pertama yang dilakukan: datang ke meja kerja Player. "Mana, liat." Ngomel dikit, tapi mastiin baik-baik saja. *(Luka: lutut, siku, pinggang — ringan. Harga diri: rusak parah.)*

2. **THE BOTTLE** — Waktu Player mau ambil botol sendiri di motor, bahunya ditahan supaya tetap duduk. "Pengen lihat motornya sekalian," katanya — lalu diambilkan sendiri.

3. **YANG...** — Layar gelap. Tidak ada musik. Hanya suara: "Yang..." lalu jeda panjang, "Yang....." Tidak butuh kalimat lengkap untuk membuat orang meleleh.

4. **THE COCKROACH** — Ali tahu Player takut kecoa. Biasanya dibiarkan mendekat dulu — tapi kali ini langsung disapu pakai kaki tanpa drama. Musuh dikalahkan sebelum sempat mendekat.

5. **UNTUNG GA PARAH** — Malam itu, sebelum tidur, dengan suara pelan: "Untung ga parah." Bukan "I love you", tapi cara sayangnya sendiri.

6. **THE SHAVER** — Alat cukur elektrik baru dicoba di tangan. Hasilnya bersih, mulus. Ditunjukkan ke Ali — dan responnya: "Ah ngapain dicukur ituu. Ga estetik. Ga asik, ga asik." Penerimaan tanpa syarat, apa adanya.

7. **MILIKKU** — Bibir luka kecil bekas dikelupas. Ali nanya, "Kenapa itu bibirmu? Kaya luka gitu." Player jawab, "Iya abis tak kelopekin tadi." Ali bilang, "Kan, udah kuduga dari waktu itu. Kamu ngerusak barangku. Itu udah jadi milikku kenapa kamu rusak."

8. **NO REAL, NO FAKE** — Digoda dengan "Ya gini aslinya pacarmu", jawabannya tegas: "Gaada yg asli, gaada yg palsu. Pacarku ya pacarku."

9. **LESS CURSING** — Sejak dimarahin karena misuh pas main game, Ali jadi jauh mengurangi ngomong kasar waktu main Mobile Legends. Perubahan kecil yang tidak diminta.

10. **JOGGING RAINCHECK** — "Besok pengen jogging, tapi kamu ga ikut. Yawes besoke lagi aja. Aku pengene jogging sm kamu." (Diucapkan karena besoknya Player kebagian jatah masak.) Rencana kecil yang lebih baik ditunda daripada dijalani sendirian.

11. **CEGILKU** — Panggilan level tertinggi yang pernah keluar: "I love you, cegilku." Bukan kata-kata besar — tapi paling nempel.

**[NILAI AFFECTION DI BAB INI: tetap 100%]**

---

## CHAPTER 06 — BOCIL MATANG

```
CHARACTER PROFILE
ALI
AGE: 23
CLASS: BOCIL MATANG

SPECIAL SKILLS:
+ RESPONSIBILITY
+ PROTECTIVENESS
+ COMMON SENSE

PASSIVE: GENTLE SIDE
```

> Secara teknis, Ali memang lebih muda. Tapi anehnya, ada banyak hal yang justru membuatnya terasa lebih matang. Tidak adil memang.

---

## CHAPTER 07 — THE GIRL HE LETS BE A CHILD

> Ada bagian kecil dalam diri Player yang selama ini terbiasa menjaga dirinya sendiri. Anak kecil yang terlalu lama berdiri sendirian. Yang belajar melindungi dirinya sendiri, menyembunyikan marahnya, menyembunyikan manjanya, menyembunyikan keinginannya untuk bermain. Menjadi kuat karena merasa memang harus kuat.

```
INNER CHILD: LOCKED
```

> Tapi entah bagaimana, sisi anak kecil itu disambut dengan tangan terbuka. Seolah dipeluk erat, diajak bermain riang, dan tidak jarang juga di-bully sedikit.
>
> Marahnya kamu peluk. Riangnya kamu sambut. Keinginan spontannya kamu iyakan. Dan nakalnya pun kamu arahkan.

```
INNER CHILD: LOCKED → UNLOCKED
NEW PASSIVE: SAFE TO BE YOURSELF
```

**[MEKANIK opsional: tombol "tunggu/temani" yang perlu ditekan dulu sebelum status berubah dari LOCKED ke UNLOCKED — simbolis bahwa keamanan itu butuh kesabaran, bukan dipaksa.]**

---

## CHAPTER 08 — NO GUARANTEES

**Ali:** "Siapa yang bisa jamin kita bakal jadi, sih? Ya aku mengusahakan, bukan menjamin."

> Mungkin itu yang paling disukai dari caranya mencintai. Tidak menjanjikan sesuatu yang belum tentu bisa ditepati. Cuma memilih untuk mengusahakannya.

**Ali:** "Aku gaikut ngasih makan, gaikut ngehidupi, siapa aku ngatur. Ya nanti kalo udh sah ya aku bakal protect dgn tegas. Karena udh bukan lg soal seneng seneng, tapi udh soal tanggung jawab."

```
ALI — PASSIVE SKILL UPDATED
RESPONSIBILITY — LV. MAX
```

```
NEW QUEST: KEEP GOING.
```

---

## FINAL CHAPTER — THE ANOMALY

```
SYSTEM ARCHIVE
26 JULI   — ALI: 0%
8 AGUSTUS — ALI: 50% → 60%
16 AGUSTUS — ALI: 100%
```

> Kalau sekarang ditanya: **"Sebenarnya apa yang menyebabkan anomali ini?"**

**[MEKANIK KUIS — semua jawaban salah, tampilkan "WRONG"/"SALAH" satu-satu sampai semua opsi sudah dicoba, baru lanjut ke reveal]**

- [A] LITTLE CAVE
- [B] MALANG
- [C] COFFEE
- [D] CEGIL

> Bukan satu momen. Bukan satu percakapan. Bukan satu perjalanan. Bukan bahkan satu pengakuan.
>
> Mungkin semuanya terjadi dari hal-hal kecil yang bahkan waktu itu tidak terasa penting.
>
> Dari delapan bulan menjadi teman kerja yang hampir tidak pernah ngobrol. Dari "Mas Ali" menjadi "Masli". Dari titip kopi di jam istirahat. Dari rasa penasaran. Dari rasa cemburu. Dari keberanian untuk mengatakan perasaan.
>
> Dari 0%. Menjadi 50%. Lalu 60%. Sampai akhirnya — **100%.**

---

## EPILOGUE — SAYANG

```
NAME EVOLUTION
MAS ALI → MASLI → SAYANG
```

> Lucu ya. Dulu bahkan hampir tidak pernah ngobrol. Lalu mulai nitip kopi. "Mas Ali" berubah menjadi "Masli". Dan sekarang, ada satu panggilan yang disimpan hanya untuk hubungan ini. **Sayang.**
>
> Tidak tahu bagaimana tepatnya kamu berubah. Atau mungkin sebenarnya kamu tidak berubah sama sekali. Mungkin cuma akhirnya diberi kesempatan untuk mengenal bagian-bagian dirimu yang sebelumnya tidak pernah terlihat.

```
MEMORY FRAGMENTS
"Yang..."
"Untung ga parah."
"Jangan."
"Aku mengusahakan, bukan menjamin."
"I love you."
```

> I swear to God, manusia ini benar-benar menyambut sisi anak kecilku dengan tangan terbuka. Dan aku merasa sangat beruntung menjadi salah satu orang yang bisa mengenal sisi lembutmu sejauh ini.
>
> Your gentle side isn't something everybody gets to see. I'm just lucky enough to know you that far.

**Player:** "I love you, bocilku."

```
ANOMALY STATUS: CONFIRMED.
```

**[TITIK INI COCOK DIBERI EFEK VISUAL SPESIAL KEDUA — heart burst / glow, ini klimaks emosional penutup]**

---

## SAVE SCREEN

```
SAVE COMPLETE.

16 AGUSTUS 2026
PLAYER 1 + PLAYER 2

STATUS: ONGOING
RELATIONSHIP: ACTIVE

NEXT QUEST: ANOTHER YEAR
[ ACCEPT ]
```

*(Bisa ditambahkan satu baris personal ucapan ulang tahun di sini, mis. "Selamat ulang tahun, Sayang. Semoga tahun ini — dan seterusnya — makin banyak level yang dibuka bareng.")*

```
QUEST ACCEPTED.
TO BE CONTINUED.
```

---

## CREDITS

```
ALI.exe

A GAME MADE FOR: ALI

WRITTEN BY: YOUR CEGIL
DESIGNED BY: YOUR CEGIL
PROGRAMMED BY: YOUR CEGIL
ART DIRECTION: YOUR CEGIL
QUALITY ASSURANCE: YOUR CEGIL

EMOTIONAL DAMAGE: ALI

SPECIAL THANKS TO
THE PERSON WHO KEEPS SAYING
"Yang..."
```

---

## RINGKASAN DATA UNTUK REFERENSI CEPAT

| Bab | Tanggal | Affection |
|---|---|---|
| Chapter 1 — Little Cave | 26 Juli 2026 | 0% |
| Chapter 2 — The Approach | 26 Jul – 8 Agu 2026 | 0% (membangun) |
| Chapter 3 — 50% | 8 Agustus 2026 | 50% → 60% |
| Chapter 4 — Malang | 16 Agustus 2026 | 60% → 100% |
| Chapter 5–8 | pasca-jadian | tetap 100% |

**Latar belakang tambahan tentang Ali** (boleh dipakai sebagai detail kecil/easter egg di mana pun cocok): suka main Mobile Legends di waktu senggang, maniak film Marvel Studio.
