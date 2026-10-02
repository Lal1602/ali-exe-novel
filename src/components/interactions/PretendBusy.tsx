'use client';

import React, { useEffect, useRef, useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface PretendBusyProps {
  onComplete: () => void;
}

const TICK_MS = 100;
const BUSY_PER_CORRECT_CHAR = 4;
const BUSY_PER_SENTENCE = 10;
const BUSY_DECAY = 0.8; // per tick
const EAR_PER_TICK = 2.2;

// Endless pool of "office" sentences to type; picked at random, never the same twice in a row
const SENTENCES = [
  'Rekap penjualan bulan ini sudah dikirim ke Bu Rina.',
  'Mohon dicek kembali data stok gudang sebelum jam lima.',
  'Revisi proposal sudah diunggah ke folder tim.',
  'Rapat evaluasi dimulai pukul sepuluh di ruang tiga.',
  'Tolong rapikan kolom tanggal dan nomor faktur.',
  'Total anggaran kuartal ini masih menunggu persetujuan.',
  'Laporan mingguan perlu ditambah grafik perbandingan.',
  'Saya sedang menyusun daftar hadir peserta pelatihan.',
  'Data pelanggan baru sudah masuk ke lembar kedua.',
  'Jangan lupa simpan berkas sebelum meninggalkan meja.',
];

const pickSentence = (previous?: string) => {
  let next = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
  while (next === previous) next = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
  return next;
};

const BUBBLES = [
  { id: 'a', who: 'Mbak Rekan', text: 'Mas Ali, file tadi udah masuk belum ya?', side: 'left' },
  { id: 'b', who: 'Ali', text: 'Udah kok, Mbak. Tadi sempat tak cek sekalian.', side: 'right' },
  { id: 'c', who: 'Mbak Rekan', text: 'Makasih ya Mas, kamu emang paling bisa diandalkan 😄', side: 'left' },
] as const;

export const PretendBusy: React.FC<PretendBusyProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const [busy, setBusy] = useState(40);
  const [ear, setEar] = useState(0);
  const [listening, setListening] = useState<string | null>(null);
  const [sentence, setSentence] = useState<string>(() => pickSentence());
  const [typed, setTyped] = useState('');
  const [sentencesDone, setSentencesDone] = useState(0);

  const listeningRef = useRef<string | null>(null);
  const busyRef = useRef(40);
  const sentenceRef = useRef(sentence);
  const typedRef = useRef('');
  const inputRef = useRef<HTMLInputElement>(null);

  const done = ear >= 100;

  const startListening = (id: string) => {
    listeningRef.current = id;
    setListening(id);
  };
  const stopListening = () => {
    listeningRef.current = null;
    setListening(null);
  };

  const addBusy = (amount: number) => {
    const next = Math.min(100, busyRef.current + amount);
    busyRef.current = next;
    setBusy(next);
  };

  const typeChar = (ch: string) => {
    const current = typedRef.current;
    const target = sentenceRef.current;
    if (current.length >= target.length) return; // wait for backspace if the sentence is full but wrong

    const next = current + ch;
    typedRef.current = next;
    setTyped(next);

    if (ch === target[current.length]) {
      sound.playBlip(520);
      addBusy(BUSY_PER_CORRECT_CHAR);
    } else {
      sound.playErrorBuzz();
    }

    if (next === target) {
      addBusy(BUSY_PER_SENTENCE);
      setSentencesDone((n) => n + 1);
      const following = pickSentence(target);
      sentenceRef.current = following;
      typedRef.current = '';
      setSentence(following);
      setTyped('');
    }
  };

  const backspace = () => {
    if (!typedRef.current) return;
    const next = typedRef.current.slice(0, -1);
    typedRef.current = next;
    setTyped(next);
  };

  // Desktop keyboard. Virtual keyboards (key === 'Unidentified') fall through to the input's onInput.
  useEffect(() => {
    if (done) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'Backspace') {
        e.preventDefault();
        backspace();
      } else if (e.key.length === 1) {
        e.preventDefault();
        typeChar(e.key);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  useEffect(() => {
    if (done) return;
    const timer = setInterval(() => {
      const nextBusy = Math.max(0, busyRef.current - BUSY_DECAY);
      busyRef.current = nextBusy;
      setBusy(nextBusy);
      if (listeningRef.current && nextBusy > 0) {
        setEar((e) => Math.min(100, e + EAR_PER_TICK));
      }
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [done]);

  useEffect(() => {
    if (done) sound.playAffectionChime();
  }, [done]);

  const caught = listening !== null && busy <= 0;

  return (
    <InteractionShell
      title="🖥️ PURA-PURA SIBUK"
      hint={
        done
          ? undefined
          : 'Ketik kalimat di Sheet1 supaya terlihat sibuk, sambil mengarahkan kursor (atau menahan jari) ke obrolan di sebelah.'
      }
      accent="pink"
      maxWidth={600}
      onSkip={finish}
    >
      {/* Fake spreadsheet with a ghost sentence to follow */}
      <div
        onClick={() => inputRef.current?.focus()}
        style={{ position: 'relative', border: '2px solid #3b4261', background: '#0f111a', marginBottom: '14px', cursor: 'text' }}
      >
        <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.48rem', color: '#565f89', padding: '4px 8px', borderBottom: '1px solid #24283b' }}>
          Sheet1 — Book1.xlsx · kalimat selesai: {sentencesDone}
        </div>
        <div
          style={{
            minHeight: '58px',
            padding: '10px 12px',
            fontFamily: 'monospace',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            wordBreak: 'break-word',
          }}
        >
          {sentence.split('').map((ch, i) => {
            const isTyped = i < typed.length;
            const correct = isTyped && typed[i] === ch;
            const isCursor = i === typed.length;
            return (
              <span
                key={i}
                style={{
                  color: !isTyped ? '#e2e8f0' : correct ? '#73daca' : '#f7768e',
                  opacity: isTyped ? 1 : 0.5,
                  background: isTyped && !correct ? 'rgba(247, 118, 142, 0.25)' : 'transparent',
                  borderLeft: isCursor && !done ? '2px solid #4deeea' : '2px solid transparent',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>
        {/* Hidden field so touch devices can bring up a keyboard by tapping the sheet */}
        <input
          ref={inputRef}
          aria-label="Ketik kalimat di Sheet1"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          onInput={(e) => {
            const value = e.currentTarget.value;
            e.currentTarget.value = '';
            for (const ch of value) typeChar(ch);
          }}
          style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%', border: 'none', background: 'transparent' }}
        />
      </div>

      {/* Bars */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.5rem', color: busy <= 0 ? '#f7768e' : '#7aa2f7', marginBottom: '4px' }}>
            PROFESIONAL {Math.round(busy)}%
          </div>
          <div style={{ height: '10px', border: '2px solid #3b4261', background: '#161928' }}>
            <div style={{ height: '100%', width: `${busy}%`, background: '#7aa2f7', transition: 'width 0.1s linear' }} />
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.5rem', color: '#f7768e', marginBottom: '4px' }}>
            TELINGA {Math.round(ear)}%
          </div>
          <div style={{ height: '10px', border: '2px solid #3b4261', background: '#161928' }}>
            <div style={{ height: '100%', width: `${ear}%`, background: '#f7768e', transition: 'width 0.1s linear' }} />
          </div>
        </div>
      </div>

      {!done ? (
        <>
          <div
            style={{
              padding: '10px 14px',
              marginBottom: '12px',
              borderLeft: '3px solid #bb9af7',
              background: 'rgba(187, 154, 247, 0.1)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: '#c0caf5',
              lineHeight: 1.5,
            }}
          >
            💡 <strong>Petunjuk:</strong> ikuti kalimat samar di Sheet1. Ketik persis sesuai tulisannya. Huruf yang salah berwarna merah,
            hapus dengan <kbd>Backspace</kbd>. Kalimatnya tidak ada habisnya, jadi terus ketik sambil menguping.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' }}>
            {BUBBLES.map((b) => (
              <div
                key={b.id}
                onPointerEnter={() => startListening(b.id)}
                onPointerLeave={stopListening}
                onPointerDown={() => startListening(b.id)}
                onPointerUp={stopListening}
                onPointerCancel={stopListening}
                style={{
                  alignSelf: b.side === 'left' ? 'flex-start' : 'flex-end',
                  maxWidth: '82%',
                  padding: '8px 12px',
                  border: `2px solid ${listening === b.id ? '#f7768e' : '#3b4261'}`,
                  background: listening === b.id ? 'rgba(247, 118, 142, 0.18)' : '#161928',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'background 0.15s ease, border-color 0.15s ease',
                  touchAction: 'none',
                }}
              >
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.45rem', color: '#9aa5ce', marginBottom: '3px' }}>
                  {b.who}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: listening === b.id ? '#fff' : '#94a3b8' }}>
                  {listening === b.id ? b.text : '· · · (arahkan ke sini untuk menguping)'}
                </div>
              </div>
            ))}
          </div>

          <div style={{ minHeight: '22px', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#ff9e64', fontStyle: 'italic' }}>
            {caught ? 'Profesionalnya habis, jadi nggak bisa fokus nguping. Ketik lagi!' : ''}
          </div>
        </>
      ) : (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          <div
            style={{
              padding: '12px 16px',
              borderLeft: '3px solid #f7768e',
              background: 'rgba(247, 118, 142, 0.1)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              fontStyle: 'italic',
              color: '#e0def4',
              lineHeight: 1.6,
              marginBottom: '14px',
            }}
          >
            “Gila... aku beneran cemburu. Aku beneran suka sama Masli.”
          </div>
          <button
            onClick={() => {
              sound.playClick();
              finish();
            }}
            className="pixel-btn pixel-btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}
          >
            LANJUT ▶
          </button>
        </div>
      )}
    </InteractionShell>
  );
};
