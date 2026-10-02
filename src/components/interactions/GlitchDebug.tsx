'use client';

import React, { useEffect, useRef, useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface GlitchDebugProps {
  onComplete: () => void;
}

const COLS = 4;
const ROWS = 3;
const CELLS = COLS * ROWS;
const TARGET = 8; // repairs needed to reboot
const SPAWN_MS = 650;
const LIFETIME_MS = 2200;
const GLITCH_CHARS = ['▓', '░', '▒', '#', '%', '@', '0', '1', '?'];

interface Glitch {
  cell: number;
  bornAt: number;
}

export const GlitchDebug: React.FC<GlitchDebugProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const [glitches, setGlitches] = useState<Glitch[]>([]);
  const [repaired, setRepaired] = useState(0);
  const [tick, setTick] = useState(0); // re-rolls glitch characters
  const doneRef = useRef(false);

  const done = repaired >= TARGET;

  useEffect(() => {
    if (done) return;
    const timer = setInterval(() => {
      const now = Date.now();
      setTick((t) => t + 1);
      setGlitches((prev) => {
        const alive = prev.filter((g) => now - g.bornAt < LIFETIME_MS);
        if (alive.length >= 4) return alive;
        const free = Array.from({ length: CELLS }, (_, i) => i).filter((i) => !alive.some((g) => g.cell === i));
        if (free.length === 0) return alive;
        const cell = free[Math.floor(Math.random() * free.length)];
        return [...alive, { cell, bornAt: now }];
      });
    }, SPAWN_MS);
    return () => clearInterval(timer);
  }, [done]);

  useEffect(() => {
    if (done && !doneRef.current) {
      doneRef.current = true;
      sound.playAffectionChime();
    }
  }, [done]);

  const handleCell = (cell: number) => {
    if (done) return;
    const hit = glitches.some((g) => g.cell === cell);
    if (!hit) return;
    sound.playBlip(660);
    setGlitches((prev) => prev.filter((g) => g.cell !== cell));
    setRepaired((r) => r + 1);
  };

  const progress = Math.min(100, Math.round((repaired / TARGET) * 100));

  return (
    <InteractionShell
      title="⚠️ SYSTEM ERROR: RESPONSE NOT FOUND"
      hint="Cegil membeku dan sistemnya error. Klik blok yang rusak sebelum hilang untuk me-reboot respons."
      accent="pink"
      maxWidth={520}
      onSkip={finish}
    >
      <div style={{ height: '14px', border: '2px solid #3b4261', background: '#161928', marginBottom: '6px' }}>
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: done ? '#73daca' : 'linear-gradient(90deg, #f7768e, #ff9e64)',
            transition: 'width 0.2s ease',
          }}
        />
      </div>
      <div
        style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.55rem',
          color: done ? '#73daca' : '#f7768e',
          marginBottom: '14px',
        }}
      >
        REBOOT: {progress}%
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 56px)`,
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        {Array.from({ length: CELLS }, (_, cell) => {
          const glitch = glitches.find((g) => g.cell === cell);
          return (
            <button
              key={cell}
              onClick={() => handleCell(cell)}
              className="pixel-btn"
              aria-label={glitch ? 'Blok rusak' : 'Blok normal'}
              style={{
                padding: 0,
                borderColor: glitch ? '#f7768e' : '#24283b',
                background: glitch ? 'rgba(247, 118, 142, 0.25)' : '#12141f',
                color: glitch ? '#f7768e' : '#2a2e45',
                fontSize: '1.1rem',
                transition: 'background 0.1s ease',
                touchAction: 'manipulation',
              }}
            >
              {glitch ? GLITCH_CHARS[(cell + tick) % GLITCH_CHARS.length] : '·'}
            </button>
          );
        })}
      </div>

      {done && (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          <div
            style={{
              padding: '12px 16px',
              background: 'rgba(115, 218, 202, 0.1)',
              borderLeft: '3px solid #73daca',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: '#e0def4',
              marginBottom: '14px',
              lineHeight: 1.6,
            }}
          >
            RESPONSE FOUND: “He em. Ayok pol.”
          </div>
          <button
            onClick={() => {
              sound.playClick();
              finish();
            }}
            className="pixel-btn pixel-btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}
          >
            REBOOT SELESAI ▶
          </button>
        </div>
      )}
    </InteractionShell>
  );
};
