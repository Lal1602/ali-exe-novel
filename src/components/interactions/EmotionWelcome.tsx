'use client';

import React, { useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface EmotionWelcomeProps {
  onComplete: () => void;
}

interface Round {
  emotion: string;
  icon: string;
  prompt: string;
  right: string;
  wrong: { text: string; hint: string }[];
  result: string;
}

const ROUNDS: Round[] = [
  {
    emotion: 'MARAH',
    icon: '😤',
    prompt: 'Si kecil lagi kesal dan menahan marahnya.',
    right: 'Peluk',
    wrong: [
      { text: 'Suruh diam', hint: 'Terlalu cepat. Marah yang disuruh diam cuma pindah sembunyi.' },
      { text: 'Pura-pura nggak lihat', hint: 'Dia sudah terlalu sering sendirian. Hampiri dia.' },
    ],
    result: 'Marahnya kamu peluk.',
  },
  {
    emotion: 'RIANG',
    icon: '🥳',
    prompt: 'Si kecil tiba-tiba heboh dan ingin main.',
    right: 'Sambut',
    wrong: [
      { text: 'Bilang "dewasa dong"', hint: 'Terlalu cepat. Riang itu bukan kesalahan.' },
      { text: 'Senyum tipis saja', hint: 'Dia butuh ikut disambut, bukan cuma dilihat.' },
    ],
    result: 'Riangnya kamu sambut.',
  },
  {
    emotion: 'INGIN',
    icon: '🍦',
    prompt: 'Si kecil tiba-tiba pengen sesuatu, sekarang juga.',
    right: 'Iyakan',
    wrong: [
      { text: 'Ceramahi dulu', hint: 'Terlalu cepat. Keinginan kecil nggak perlu sidang.' },
      { text: 'Tunda "nanti aja"', hint: 'Spontan itu sifatnya sekarang. Coba iyakan.' },
    ],
    result: 'Keinginan spontannya kamu iyakan.',
  },
  {
    emotion: 'NAKAL',
    icon: '😈',
    prompt: 'Si kecil mulai usil dan jahil.',
    right: 'Arahkan',
    wrong: [
      { text: 'Marahi keras', hint: 'Terlalu cepat. Nakalnya nggak perlu dipadamkan.' },
      { text: 'Biarkan kebablasan', hint: 'Dia aman kalau ada yang menuntun pelan-pelan.' },
    ],
    result: 'Nakalnya pun kamu arahkan.',
  },
];

const shuffled = <T,>(items: T[]): T[] => {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const EmotionWelcome: React.FC<EmotionWelcomeProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const [roundIndex, setRoundIndex] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const [resolved, setResolved] = useState(false);
  const [options, setOptions] = useState(() => {
    const r = ROUNDS[0];
    return shuffled([{ text: r.right, ok: true, hint: '' }, ...r.wrong.map((w) => ({ text: w.text, ok: false, hint: w.hint }))]);
  });

  const allDone = roundIndex >= ROUNDS.length;
  const round = ROUNDS[Math.min(roundIndex, ROUNDS.length - 1)];

  const handlePick = (opt: { ok: boolean; hint: string }) => {
    if (resolved) return;
    if (opt.ok) {
      sound.playAffectionChime();
      setHint(null);
      setResolved(true);
    } else {
      sound.playErrorBuzz();
      setHint(opt.hint);
    }
  };

  const handleNextRound = () => {
    sound.playClick();
    const next = roundIndex + 1;
    setRoundIndex(next);
    setResolved(false);
    setHint(null);
    if (next < ROUNDS.length) {
      const r = ROUNDS[next];
      setOptions(shuffled([{ text: r.right, ok: true, hint: '' }, ...r.wrong.map((w) => ({ text: w.text, ok: false, hint: w.hint }))]));
    }
  };

  return (
    <InteractionShell
      title="🧸 SAMBUT 4 RASA"
      hint={allDone ? undefined : 'Sisi kecil itu datang dalam empat rasa. Pilih cara menyambut yang membuatnya merasa aman.'}
      accent="purple"
      maxWidth={560}
      onSkip={finish}
    >
      {!allDone ? (
        <>
          <div
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.55rem',
              color: '#565f89',
              marginBottom: '12px',
            }}
          >
            RASA {roundIndex + 1} / {ROUNDS.length}
          </div>

          <div
            style={{
              textAlign: 'center',
              padding: '18px 12px',
              background: resolved ? 'rgba(115, 218, 202, 0.1)' : 'rgba(187, 154, 247, 0.1)',
              border: `2px dashed ${resolved ? '#73daca' : '#bb9af7'}`,
              marginBottom: '16px',
              transition: 'background 0.3s ease, border-color 0.3s ease',
            }}
          >
            <div style={{ fontSize: '2.4rem', marginBottom: '6px' }}>{resolved ? '🤍' : round.icon}</div>
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.7rem', color: '#e2e8f0', marginBottom: '6px' }}>
              {round.emotion}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: '#c0caf5', fontStyle: 'italic' }}>
              {resolved ? `“${round.result}”` : round.prompt}
            </div>
          </div>

          {!resolved ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '12px' }}>
                {options.map((opt) => (
                  <button
                    key={opt.text}
                    onClick={() => handlePick(opt)}
                    className="pixel-btn"
                    style={{ padding: '12px 6px', fontSize: '0.62rem', lineHeight: 1.3 }}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
              <div
                style={{
                  minHeight: '36px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: '#ff9e64',
                }}
              >
                {hint}
              </div>
            </>
          ) : (
            <button
              onClick={handleNextRound}
              className="pixel-btn pixel-btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '0.72rem' }}
            >
              {roundIndex + 1 < ROUNDS.length ? 'RASA BERIKUTNYA ▶' : 'SELESAI ▶'}
            </button>
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', animation: 'fadeIn 0.4s ease' }}>
          <div style={{ fontSize: '2.4rem', marginBottom: '10px' }}>🤍</div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#e0def4', lineHeight: 1.7, marginBottom: '18px' }}>
            Marahnya kamu peluk. Riangnya kamu sambut. Keinginan spontannya kamu iyakan. Dan nakalnya pun kamu arahkan.
          </p>
          <button
            onClick={() => {
              sound.playAffectionChime();
              finish();
            }}
            className="pixel-btn pixel-btn-primary"
            style={{ fontSize: '0.75rem', padding: '12px 24px' }}
          >
            BUKA KUNCI INNER CHILD ▶
          </button>
        </div>
      )}
    </InteractionShell>
  );
};
