'use client';

import React, { useEffect, useRef, useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface BreathSendProps {
  onComplete: () => void;
}

const PERIOD_MS = 2600; // one full breath in + out
const HIT_THRESHOLD = 0.8; // breath fullness at which a click counts
const START_CONFIDENCE = 40;
const HIT_GAIN = 20;
const MISS_LOSS = 6;
const MIN_SIZE = 56;
const MAX_SIZE = 168;

const fullness = (elapsedMs: number) => (Math.sin((elapsedMs / PERIOD_MS) * Math.PI * 2 - Math.PI / 2) + 1) / 2;

export const BreathSend: React.FC<BreathSendProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const startRef = useRef<number>(0);
  const [phase, setPhase] = useState(0); // breath fullness 0..1 (render only)
  const [confidence, setConfidence] = useState(START_CONFIDENCE);
  const [message, setMessage] = useState('Tarik napas... klik saat lingkaran penuh.');
  const [dodge, setDodge] = useState({ x: 0, y: 0 });

  const ready = confidence >= 100;

  useEffect(() => {
    startRef.current = Date.now();
    const timer = setInterval(() => setPhase(fullness(Date.now() - startRef.current)), 33);
    return () => clearInterval(timer);
  }, []);

  const attempt = () => {
    if (ready) return;
    const p = fullness(Date.now() - startRef.current);
    if (p >= HIT_THRESHOLD) {
      sound.playAffectionChime();
      setConfidence((c) => Math.min(100, c + HIT_GAIN));
      setMessage('Napas yang dalam. Confidence naik.');
    } else {
      sound.playErrorBuzz();
      setConfidence((c) => Math.max(0, c - MISS_LOSS));
      setMessage('Terlalu cepat atau terlalu lambat. Tunggu lingkaran penuh.');
    }
  };

  // Space = same as clicking the circle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== 'Space' || e.repeat) return;
      e.preventDefault();
      attempt();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const handleDodge = () => {
    if (ready) return;
    setDodge({ x: Math.round((Math.random() - 0.5) * 220), y: Math.round((Math.random() - 0.5) * 60) });
  };

  const size = MIN_SIZE + (MAX_SIZE - MIN_SIZE) * phase;
  const inZone = phase >= HIT_THRESHOLD;

  return (
    <InteractionShell
      title="🌬️ TARIK NAPAS, KIRIM"
      hint="Keberanian itu butuh napas. Klik lingkaran (atau tekan [SPACE]) saat ia sedang penuh."
      accent="cyan"
      maxWidth={520}
      onSkip={finish}
    >
      <div style={{ marginBottom: '8px', fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: '#7aa2f7' }}>
        CONFIDENCE {confidence}%
      </div>
      <div style={{ height: '12px', border: '2px solid #3b4261', background: '#161928', marginBottom: '16px' }}>
        <div
          style={{
            height: '100%',
            width: `${confidence}%`,
            background: ready ? '#73daca' : 'linear-gradient(90deg, #f7768e, #7aa2f7)',
            transition: 'width 0.25s ease',
          }}
        />
      </div>

      <div
        style={{
          position: 'relative',
          height: `${MAX_SIZE + 24}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12px',
        }}
      >
        {/* Target ring */}
        <div
          style={{
            position: 'absolute',
            width: `${MAX_SIZE}px`,
            height: `${MAX_SIZE}px`,
            borderRadius: '50%',
            border: `3px dashed ${inZone ? '#73daca' : '#3b4261'}`,
            transition: 'border-color 0.1s ease',
          }}
        />
        <button
          onClick={attempt}
          aria-label="Tarik napas"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            border: 'none',
            cursor: ready ? 'default' : 'pointer',
            background: inZone ? 'radial-gradient(circle, #73daca88, #4deeea33)' : 'radial-gradient(circle, #7aa2f766, #7aa2f722)',
            boxShadow: inZone ? '0 0 24px #73daca' : '0 0 12px #7aa2f755',
            color: '#e2e8f0',
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.55rem',
            touchAction: 'manipulation',
          }}
        >
          {phase > 0.5 ? 'HEMBUSKAN' : 'TARIK'}
        </button>
      </div>

      <div style={{ minHeight: '22px', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#bb9af7', fontStyle: 'italic', marginBottom: '14px' }}>
        {ready ? 'Cukup berani. Sekarang pilih kata-katanya.' : message}
      </div>

      <div style={{ height: '56px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button
          onPointerEnter={handleDodge}
          onClick={() => {
            if (!ready) {
              setMessage('Belum siap! Kumpulkan confidence dulu.');
              return;
            }
            sound.playAffectionChime();
            finish();
          }}
          className={ready ? 'pixel-btn pixel-btn-primary' : 'pixel-btn'}
          style={{
            padding: '12px 24px',
            fontSize: '0.75rem',
            transform: ready ? 'none' : `translate(${dodge.x}px, ${dodge.y}px)`,
            transition: 'transform 0.18s ease',
          }}
        >
          {ready ? 'SIAP MENULIS PESAN ▶' : 'SIAP (belum...)'}
        </button>
      </div>
    </InteractionShell>
  );
};
