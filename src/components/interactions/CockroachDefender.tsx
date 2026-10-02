'use client';

import React, { useEffect, useRef, useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface CockroachDefenderProps {
  onComplete: () => void;
}

const TARGET = 8;
const TICK_MS = 50;
const MAX_ALIVE = 3;
const SPAWN_EVERY_TICKS = 14; // ~700ms

interface Roach {
  id: number;
  x: number; // % from left
  y: number; // % from top (0 = far, 100 = reached Cegil)
  speed: number; // % per tick
}

export const CockroachDefender: React.FC<CockroachDefenderProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const [roaches, setRoaches] = useState<Roach[]>([]);
  const [killed, setKilled] = useState(0);
  const [escaped, setEscaped] = useState(0);
  const roachesRef = useRef<Roach[]>([]);
  const idRef = useRef(0);
  const tickRef = useRef(0);

  const done = killed >= TARGET;

  useEffect(() => {
    if (done) return;
    const timer = setInterval(() => {
      tickRef.current += 1;
      let slipped = 0;
      const moved: Roach[] = [];
      for (const r of roachesRef.current) {
        const y = r.y + r.speed;
        if (y >= 100) slipped += 1;
        else moved.push({ ...r, y });
      }
      if (tickRef.current % SPAWN_EVERY_TICKS === 0 && moved.length < MAX_ALIVE) {
        idRef.current += 1;
        moved.push({
          id: idRef.current,
          x: 10 + Math.random() * 78,
          y: 0,
          speed: 0.9 + Math.random() * 0.9,
        });
      }
      roachesRef.current = moved;
      setRoaches(moved);
      if (slipped > 0) setEscaped((e) => e + slipped);
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [done]);

  useEffect(() => {
    if (done) sound.playAffectionChime();
  }, [done]);

  const sweep = (id: number) => {
    if (done) return;
    sound.playBlip(240);
    if (!roachesRef.current.some((r) => r.id === id)) return;
    roachesRef.current = roachesRef.current.filter((r) => r.id !== id);
    setRoaches(roachesRef.current);
    setKilled((k) => k + 1);
  };

  return (
    <InteractionShell
      title="🪳 THE COCKROACH"
      hint={done ? undefined : 'Ali tahu Cegil takut kecoa. Sapu mereka sebelum sempat mendekat.'}
      accent="amber"
      maxWidth={520}
      onSkip={finish}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', marginBottom: '10px' }}>
        <span style={{ color: '#73daca' }}>
          DISAPU: {Math.min(killed, TARGET)} / {TARGET}
        </span>
        <span style={{ color: '#565f89' }}>LOLOS: {escaped}</span>
      </div>

      <div
        style={{
          position: 'relative',
          height: '260px',
          border: '2px solid #3b4261',
          background: 'linear-gradient(180deg, #0f111a, #1a1424)',
          overflow: 'hidden',
          marginBottom: '14px',
        }}
      >
        {roaches.map((r) => (
          <button
            key={r.id}
            onPointerDown={() => sweep(r.id)}
            aria-label="Sapu kecoa"
            style={{
              position: 'absolute',
              left: `${r.x}%`,
              top: `${r.y * 0.8}%`,
              transform: 'translate(-50%, 0)',
              background: 'none',
              border: 'none',
              fontSize: '2rem',
              cursor: 'pointer',
              padding: '6px',
              touchAction: 'manipulation',
            }}
          >
            🪳
          </button>
        ))}

        <div
          style={{
            position: 'absolute',
            bottom: '6px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '2rem' }}>{roaches.some((r) => r.y > 70) ? '😱' : '🙂'}</div>
          <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.45rem', color: '#f7768e' }}>CEGIL</div>
        </div>
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
            Disapu langsung pakai kaki, tanpa drama. Musuh dikalahkan sebelum sempat mendekat.
          </div>
          <button
            onClick={() => {
              sound.playClick();
              finish();
            }}
            className="pixel-btn pixel-btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}
          >
            BACA KENANGANNYA ▶
          </button>
        </div>
      ) : (
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#565f89', fontStyle: 'italic' }}>
          Kecoa yang lolos hanya muncul lagi. Tidak ada game over.
        </div>
      )}
    </InteractionShell>
  );
};
