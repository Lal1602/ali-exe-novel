'use client';

import React, { useEffect, useRef, useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface WordCatchProps {
  onComplete: () => void;
}

const TARGET = 6;
const TICK_MS = 50;
const MAX_ALIVE = 4;
const SPAWN_EVERY_TICKS = 12; // ~600ms
const GOOD_RATIO = 0.6;

const GOOD_WORDS = ['jujur', 'tulus', 'tanpa menuntut', 'berani', 'apa adanya', 'hangat'];
const NOISE_WORDS = ['gengsi', 'overthinking', 'kabur', 'pura-pura', 'ragu', 'salah paham'];

interface FallingWord {
  id: number;
  text: string;
  good: boolean;
  x: number; // % from left
  y: number; // % from top
  speed: number; // % per tick
}

export const WordCatch: React.FC<WordCatchProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const [words, setWords] = useState<FallingWord[]>([]);
  const [caught, setCaught] = useState(0);
  const [message, setMessage] = useState('Tangkap kata yang baik. Biarkan kata yang berisik lewat.');
  const wordsRef = useRef<FallingWord[]>([]);
  const idRef = useRef(0);
  const tickRef = useRef(0);

  const done = caught >= TARGET;

  useEffect(() => {
    if (done) return;
    const timer = setInterval(() => {
      tickRef.current += 1;
      const moved: FallingWord[] = [];
      for (const w of wordsRef.current) {
        const y = w.y + w.speed;
        if (y < 100) moved.push({ ...w, y });
      }
      if (tickRef.current % SPAWN_EVERY_TICKS === 0 && moved.length < MAX_ALIVE) {
        idRef.current += 1;
        const good = Math.random() < GOOD_RATIO;
        const pool = good ? GOOD_WORDS : NOISE_WORDS;
        // keep fresh words away from ones that are still near the top
        let x = 18 + Math.random() * 64;
        for (let attempt = 0; attempt < 6; attempt++) {
          if (!moved.some((w) => w.y < 35 && Math.abs(w.x - x) < 24)) break;
          x = 18 + Math.random() * 64;
        }
        moved.push({
          id: idRef.current,
          text: pool[Math.floor(Math.random() * pool.length)],
          good,
          x,
          y: 0,
          speed: 0.8 + Math.random() * 0.7,
        });
      }
      wordsRef.current = moved;
      setWords(moved);
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [done]);

  useEffect(() => {
    if (done) sound.playAffectionChime();
  }, [done]);

  const tap = (id: number) => {
    if (done) return;
    const word = wordsRef.current.find((w) => w.id === id);
    if (!word) return;
    wordsRef.current = wordsRef.current.filter((w) => w.id !== id);
    setWords(wordsRef.current);
    if (word.good) {
      sound.playBlip(520);
      setCaught((c) => c + 1);
      setMessage(`"${word.text}" masuk ke kepala Ali.`);
    } else {
      sound.playErrorBuzz();
      setCaught((c) => Math.max(0, c - 1));
      setMessage(`"${word.text}" cuma bising. Kata baik yang sudah ditangkap ikut goyah.`);
    }
  };

  return (
    <InteractionShell
      title="💬 TANGKAP KATA"
      hint={done ? undefined : 'Pengakuan Cegil jatuh seperti hujan kata. Tangkap makna yang sebenarnya, jangan kena kata yang cuma berisik.'}
      accent="purple"
      maxWidth={520}
      onSkip={finish}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', marginBottom: '8px' }}>
        <span style={{ color: '#73daca' }}>
          DITANGKAP: {Math.min(caught, TARGET)} / {TARGET}
        </span>
        <span style={{ color: '#565f89' }}>HIJAU = BAIK · MERAH = BISING</span>
      </div>

      <div
        style={{
          position: 'relative',
          height: '260px',
          border: '2px solid #3b4261',
          background: 'linear-gradient(180deg, #0f111a, #1a1424)',
          overflow: 'hidden',
          marginBottom: '12px',
        }}
      >
        {!done && words.map((w) => (
          <button
            key={w.id}
            onPointerDown={() => tap(w.id)}
            style={{
              position: 'absolute',
              left: `${w.x}%`,
              top: `${w.y * 0.88}%`,
              transform: 'translate(-50%, 0)',
              padding: '6px 10px',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              touchAction: 'manipulation',
              color: w.good ? '#73daca' : '#f7768e',
              background: w.good ? 'rgba(115, 218, 202, 0.12)' : 'rgba(247, 118, 142, 0.12)',
              border: `2px solid ${w.good ? '#73daca' : '#f7768e'}`,
            }}
          >
            {w.text}
          </button>
        ))}
      </div>

      {done ? (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          <div
            style={{
              padding: '12px 16px',
              borderLeft: '3px solid #73daca',
              background: 'rgba(115, 218, 202, 0.1)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.92rem',
              color: '#e0def4',
              lineHeight: 1.6,
              marginBottom: '14px',
            }}
          >
            Di antara semua suara, yang sampai ke Ali cuma satu hal: perasaan itu jujur dan tidak meminta apa-apa.
          </div>
          <button
            onClick={() => {
              sound.playClick();
              finish();
            }}
            className="pixel-btn pixel-btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}
          >
            CERNA KATA-KATANYA ▶
          </button>
        </div>
      ) : (
        <div style={{ minHeight: '22px', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#bb9af7', fontStyle: 'italic' }}>
          {message}
        </div>
      )}
    </InteractionShell>
  );
};
