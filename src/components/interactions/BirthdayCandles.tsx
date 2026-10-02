'use client';

import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface BirthdayCandlesProps {
  onComplete: () => void;
}

const CANDLE_COUNT = 5;
const TICK_MS = 50;
const CHARGE_PER_TICK = 1.6; // while holding
const DECAY_PER_TICK = 1.2; // while released
const BREATH_PER_CANDLE = 100 / CANDLE_COUNT;

export const BirthdayCandles: React.FC<BirthdayCandlesProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const [breath, setBreath] = useState(0);
  const [holding, setHolding] = useState(false);
  const holdingRef = useRef(false);
  const celebratedRef = useRef(false);

  const litCount = CANDLE_COUNT - Math.min(CANDLE_COUNT, Math.floor(breath / BREATH_PER_CANDLE));
  const allOut = litCount === 0;

  const setHold = (value: boolean) => {
    holdingRef.current = value;
    setHolding(value);
  };

  useEffect(() => {
    if (allOut) return;
    const timer = setInterval(() => {
      setBreath((prev) => {
        const next = holdingRef.current ? prev + CHARGE_PER_TICK : prev - DECAY_PER_TICK;
        return Math.max(0, Math.min(100, next));
      });
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [allOut]);

  // Space = hold to blow (same as the on-screen button)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code !== 'Space' || e.repeat) return;
      e.preventDefault();
      setHold(true);
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === 'Space') setHold(false);
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  // Soft puff sound each time a candle goes out
  const prevLitRef = useRef(CANDLE_COUNT);
  useEffect(() => {
    if (litCount < prevLitRef.current) sound.playBlip(520 - litCount * 30);
    prevLitRef.current = litCount;
  }, [litCount]);

  useEffect(() => {
    if (!allOut || celebratedRef.current) return;
    celebratedRef.current = true;
    sound.playFanfare();
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.55 },
      colors: ['#f7768e', '#7aa2f7', '#73daca', '#ffe600', '#bb9af7'],
    });
  }, [allOut]);

  return (
    <InteractionShell
      title="🎂 TIUP LILIN"
      hint={
        allOut
          ? undefined
          : 'Tahan tombol (atau tekan [SPACE]) untuk menarik napas dan meniup. Lepas dan napasnya turun lagi, jadi tiup sampai habis dalam satu tarikan.'
      }
      accent="pink"
      maxWidth={560}
      onSkip={finish}
    >
      <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', margin: '8px 0 20px' }}>
        {Array.from({ length: CANDLE_COUNT }).map((_, i) => {
          const isLit = i < litCount;
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  fontSize: '1.6rem',
                  height: '2rem',
                  transform: holding && isLit ? 'translateX(3px) rotate(8deg)' : 'none',
                  transition: 'transform 0.12s ease, opacity 0.3s ease',
                  opacity: isLit ? 1 : 0.15,
                  filter: isLit ? 'drop-shadow(0 0 8px #ffb347)' : 'none',
                }}
              >
                🔥
              </div>
              <div
                style={{
                  width: '14px',
                  height: '56px',
                  background: i % 2 ? '#7aa2f7' : '#f7768e',
                  border: '2px solid #1a1b26',
                }}
              />
            </div>
          );
        })}
      </div>

      {!allOut ? (
        <>
          <div
            style={{
              height: '14px',
              border: '2px solid #3b4261',
              background: '#161928',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${breath}%`,
                background: 'linear-gradient(90deg, #4deeea, #7aa2f7)',
                transition: 'width 0.05s linear',
              }}
            />
          </div>
          <button
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setHold(true);
            }}
            onPointerUp={() => setHold(false)}
            onPointerCancel={() => setHold(false)}
            className="pixel-btn pixel-btn-primary"
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '0.8rem',
              userSelect: 'none',
              touchAction: 'none',
            }}
          >
            {holding ? '💨 FUUUUH...' : '😮‍💨 TAHAN UNTUK MENIUP'}
          </button>
        </>
      ) : (
        <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.02rem',
              lineHeight: 1.7,
              color: '#e0def4',
              fontStyle: 'italic',
              marginBottom: '18px',
            }}
          >
            “Selamat ulang tahun, Sayang. Semoga tahun ini, dan seterusnya, makin banyak level yang dibuka bareng.”
          </p>
          <div
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.62rem',
              color: '#73daca',
              marginBottom: '18px',
            }}
          >
            ACHIEVEMENT UNLOCKED: +1 TAHUN BARENG
          </div>
          <button
            onClick={() => {
              sound.playAffectionChime();
              finish();
            }}
            className="pixel-btn pixel-btn-primary"
            style={{ fontSize: '0.75rem', padding: '12px 24px' }}
          >
            SIMPAN KENANGAN INI ▶
          </button>
        </div>
      )}
    </InteractionShell>
  );
};
