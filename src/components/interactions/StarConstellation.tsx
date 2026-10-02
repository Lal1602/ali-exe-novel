'use client';

import React, { useMemo, useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface StarConstellationProps {
  onComplete: () => void;
}

const STAR_COUNT = 12;

// Classic heart curve, fitted into the sky box (viewBox is 100 x 95) with a margin.
const rawHeart = (t: number) => ({
  x: 16 * Math.pow(Math.sin(t), 3),
  y: -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)),
});

const HEART_BOUNDS = (() => {
  const pts = Array.from({ length: 360 }, (_, i) => rawHeart((i / 360) * Math.PI * 2));
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
})();

const heartPoint = (t: number) => {
  const { x, y } = rawHeart(t);
  const { minX, maxX, minY, maxY } = HEART_BOUNDS;
  return {
    x: 14 + ((x - minX) / (maxX - minX)) * 72,
    y: 12 + ((y - minY) / (maxY - minY)) * 68,
  };
};

// Stars sampled evenly along the curve, starting at the bottom tip and going around once.
const HEART_STARS = Array.from({ length: STAR_COUNT }, (_, i) => {
  const p = heartPoint(Math.PI + (i / STAR_COUNT) * Math.PI * 2);
  return { x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10 };
});

// Fixed decoys so the sky looks the same on every render
const BACKGROUND_STARS = [
  [8, 10], [22, 6], [38, 14], [62, 8], [80, 12], [92, 24], [6, 40], [14, 70],
  [30, 90], [50, 94], [70, 88], [90, 72], [94, 46], [84, 58], [18, 28], [76, 30],
].map(([x, y]) => ({ x, y }));

export const StarConstellation: React.FC<StarConstellationProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const [linked, setLinked] = useState(0); // stars connected so far
  const [shake, setShake] = useState<number | null>(null);

  const closed = linked >= STAR_COUNT;
  const done = closed;

  const path = useMemo(() => {
    const pts = HEART_STARS.slice(0, linked);
    // once every star is lit, close the shape back to the first star
    const all = closed ? [...pts, HEART_STARS[0]] : pts;
    return all.map((p) => `${p.x},${p.y}`).join(' ');
  }, [linked, closed]);

  const tap = (i: number) => {
    if (done) return;
    if (i === linked) {
      sound.playBlip(380 + i * 50);
      setLinked((n) => n + 1);
      if (i === STAR_COUNT - 1) setTimeout(() => sound.playAffectionChime(), 250);
    } else if (i > linked) {
      sound.playClick();
      setShake(i);
      setTimeout(() => setShake((s) => (s === i ? null : s)), 300);
    }
  };

  return (
    <InteractionShell
      title="✨ RASI BINTANG MALANG"
      hint={done ? undefined : 'Langit Malang malam itu penuh bintang. Sambungkan bintang yang berkedip, satu demi satu.'}
      accent="cyan"
      maxWidth={520}
      onSkip={finish}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 0.95',
          border: '2px solid #3b4261',
          background: 'radial-gradient(ellipse at 50% 30%, #1b2140, #0b0d17)',
          overflow: 'hidden',
          marginBottom: '12px',
        }}
      >
        <svg
          viewBox="0 0 100 95"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          {linked > 1 && (
            <polyline
              points={path}
              fill={closed ? 'rgba(247, 118, 142, 0.18)' : 'none'}
              stroke={closed ? '#f7768e' : '#7aa2f7'}
              strokeWidth={0.7}
              strokeLinejoin="round"
              style={{ filter: closed ? 'drop-shadow(0 0 2px #f7768e)' : undefined }}
            />
          )}
        </svg>

        {BACKGROUND_STARS.map((s, i) => (
          <span
            key={`bg-${i}`}
            style={{
              position: 'absolute',
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: '3px',
              height: '3px',
              background: '#565f89',
              pointerEvents: 'none',
            }}
          />
        ))}

        {HEART_STARS.map((s, i) => {
          const lit = i < linked;
          const next = i === linked && !done;
          return (
            <button
              key={i}
              onPointerDown={() => tap(i)}
              aria-label={`Bintang ${i + 1}`}
              style={{
                position: 'absolute',
                left: `${s.x}%`,
                top: `${(s.y / 95) * 100}%`,
                transform: `translate(-50%, -50%) ${shake === i ? 'translateX(3px)' : ''}`,
                width: '40px',
                height: '40px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: lit ? '1.5rem' : '1.2rem',
                color: lit ? (closed ? '#f7768e' : '#e0af68') : next ? '#ffffff' : '#7782a8',
                textShadow: lit ? '0 0 10px currentColor' : next ? '0 0 12px #fff' : 'none',
                animation: next ? 'pulseGlow 0.8s ease-in-out infinite alternate' : undefined,
                touchAction: 'manipulation',
                padding: 0,
              }}
            >
              {lit ? '★' : '✦'}
            </button>
          );
        })}
      </div>

      {done ? (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          <div
            style={{
              padding: '12px 16px',
              borderLeft: '3px solid #f7768e',
              background: 'rgba(247, 118, 142, 0.1)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.92rem',
              color: '#e0def4',
              lineHeight: 1.6,
              marginBottom: '14px',
            }}
          >
            Bintang-bintang itu membentuk hati. Tidak ada di peta langit mana pun, tapi malam itu terlihat jelas.
          </div>
          <button
            onClick={() => {
              sound.playClick();
              finish();
            }}
            className="pixel-btn pixel-btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}
          >
            LANJUT MENATAP LANGIT ▶
          </button>
        </div>
      ) : (
        <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: '#7aa2f7' }}>
          TERHUBUNG: {linked} / {STAR_COUNT}
        </div>
      )}
    </InteractionShell>
  );
};
