'use client';

import React, { useEffect, useRef, useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface CoffeeCarryProps {
  onComplete: () => void;
}

const TICK_MS = 33;
const DT = TICK_MS / 1000;
const CARRY_SECONDS = 12; // time spent in the safe zone to reach the desk
const SAFE_TILT = 0.6; // |tilt| below this keeps the cup steady
const SPILL_TILT = 1;
const SPILL_PENALTY = 6; // % of the walk lost on a spill
const PUSH = 3; // acceleration from the player's hold
const SWAY = 0.5; // how fast the cup tips over by itself

export const CoffeeCarry: React.FC<CoffeeCarryProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const tiltRef = useRef(0);
  const velRef = useRef(0);
  const progressRef = useRef(0);
  const timeRef = useRef(0);
  const inputRef = useRef<-1 | 0 | 1>(0);
  const [view, setView] = useState({ tilt: 0, progress: 0, spills: 0 });
  const [steering, setSteering] = useState<-1 | 0 | 1>(0);

  const done = view.progress >= 100;

  const setInput = (dir: -1 | 0 | 1) => {
    inputRef.current = dir;
    setSteering(dir);
  };

  useEffect(() => {
    if (done) return;
    let spills = 0;
    const timer = setInterval(() => {
      timeRef.current += DT;
      const t = timeRef.current;
      const wind = Math.sin(t * 1.3) * 0.8 + Math.sin(t * 2.9 + 1) * 0.5 + (Math.random() - 0.5) * 0.4;
      let vel = velRef.current + (wind * 0.7 + tiltRef.current * SWAY + inputRef.current * PUSH) * DT;
      vel *= 0.92;
      let tilt = tiltRef.current + vel * DT * 2.5;

      if (Math.abs(tilt) >= SPILL_TILT) {
        // A little coffee slops over; the cup recovers and the walk continues
        spills += 1;
        tilt = 0;
        vel = 0;
        progressRef.current = Math.max(0, progressRef.current - SPILL_PENALTY);
        sound.playErrorBuzz();
      } else if (Math.abs(tilt) < SAFE_TILT) {
        progressRef.current = Math.min(100, progressRef.current + (DT / CARRY_SECONDS) * 100);
      }

      tiltRef.current = tilt;
      velRef.current = vel;
      setView({ tilt, progress: progressRef.current, spills });
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [done]);

  useEffect(() => {
    if (done) sound.playAffectionChime();
  }, [done]);

  // Arrow keys / A-D steer the cup too
  useEffect(() => {
    const dirFor = (code: string): -1 | 1 | 0 =>
      code === 'ArrowLeft' || code === 'KeyA' ? -1 : code === 'ArrowRight' || code === 'KeyD' ? 1 : 0;
    const down = (e: KeyboardEvent) => {
      const dir = dirFor(e.code);
      if (!dir) return;
      e.preventDefault();
      setInput(dir);
    };
    const up = (e: KeyboardEvent) => {
      const dir = dirFor(e.code);
      if (dir && inputRef.current === dir) setInput(0);
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  const tiltDeg = view.tilt * 28;
  const steady = Math.abs(view.tilt) < SAFE_TILT;
  const walkerLeft = 6 + (view.progress / 100) * 78;

  const holdButton = (dir: -1 | 1, label: string) => (
    <button
      onPointerDown={(e) => {
        e.preventDefault();
        setInput(dir);
      }}
      onPointerUp={() => steering === dir && setInput(0)}
      onPointerLeave={() => steering === dir && setInput(0)}
      onPointerCancel={() => setInput(0)}
      onContextMenu={(e) => e.preventDefault()}
      className="pixel-btn"
      disabled={done}
      style={{
        flex: 1,
        padding: '18px 8px',
        fontSize: '0.7rem',
        borderColor: steering === dir ? '#e0af68' : undefined,
        color: steering === dir ? '#e0af68' : undefined,
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      {label}
    </button>
  );

  return (
    <InteractionShell
      title="☕ KOPI SAMPAI MEJA"
      hint={done ? undefined : 'Bawa kopi dingin itu dari pantry ke meja Cegil tanpa tumpah. Tahan tombol untuk menyeimbangkan cangkirnya.'}
      accent="amber"
      maxWidth={520}
      onSkip={finish}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', marginBottom: '8px' }}>
        <span style={{ color: '#73daca' }}>JARAK KE MEJA: {Math.round(view.progress)}%</span>
        <span style={{ color: '#565f89' }}>TUMPAH: {view.spills}</span>
      </div>

      {/* Walk track: pantry -> desk */}
      <div style={{ position: 'relative', height: '12px', border: '2px solid #3b4261', background: '#161928', marginBottom: '16px' }}>
        <div style={{ height: '100%', width: `${view.progress}%`, background: 'linear-gradient(90deg, #e0af68, #73daca)' }} />
        <span style={{ position: 'absolute', left: '-2px', top: '-20px', fontSize: '0.9rem' }}>🚪</span>
        <span style={{ position: 'absolute', right: '-2px', top: '-20px', fontSize: '0.9rem' }}>💻</span>
      </div>

      <div
        style={{
          position: 'relative',
          height: '150px',
          border: '2px solid #3b4261',
          background: 'linear-gradient(180deg, #0f111a, #1a1b26)',
          marginBottom: '14px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: `${walkerLeft}%`,
            bottom: '14px',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            transition: 'left 0.05s linear',
          }}
        >
          <div
            style={{
              fontSize: '2.6rem',
              transform: `rotate(${tiltDeg}deg)`,
              transformOrigin: '50% 90%',
              filter: steady ? 'none' : 'drop-shadow(0 0 8px #f7768e)',
            }}
          >
            ☕
          </div>
          <div style={{ fontSize: '1.4rem' }}>🧍</div>
        </div>

        {/* Balance gauge */}
        <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '8px', background: '#161928', border: '1px solid #3b4261' }}>
          <div
            style={{
              position: 'absolute',
              left: `${50 - SAFE_TILT * 50}%`,
              width: `${SAFE_TILT * 100}%`,
              height: '100%',
              background: 'rgba(115, 218, 202, 0.25)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `${50 + view.tilt * 50}%`,
              top: '-3px',
              width: '6px',
              height: '12px',
              transform: 'translateX(-50%)',
              background: steady ? '#73daca' : '#f7768e',
            }}
          />
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
            Sampai di meja. Kopinya masih dingin dan hampir utuh. Tinggal diletakkan di samping keyboard.
          </div>
          <button
            onClick={() => {
              sound.playClick();
              finish();
            }}
            className="pixel-btn pixel-btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}
          >
            LETAKKAN KOPINYA ▶
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            {holdButton(-1, '◀ TAHAN KIRI')}
            {holdButton(1, 'TAHAN KANAN ▶')}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#565f89', fontStyle: 'italic' }}>
            Cangkir miring ke kiri? Tahan kanan, begitu sebaliknya. Tumpah sedikit tidak apa-apa.
          </div>
        </>
      )}
    </InteractionShell>
  );
};
