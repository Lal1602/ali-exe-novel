'use client';

import React, { useEffect, useRef, useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface ShaverScratchProps {
  onComplete: () => void;
}

const COLS = 14;
const ROWS = 7;
const TOTAL = COLS * ROWS;
const DONE_RATIO = 0.94; // remaining stubborn spots are swept up automatically

export const ShaverScratch: React.FC<ShaverScratchProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const [shaved, setShaved] = useState<boolean[]>(() => Array(TOTAL).fill(false));
  const shavedRef = useRef<boolean[]>(Array(TOTAL).fill(false));
  const arm = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const lastBuzzRef = useRef(0);

  const count = shaved.filter(Boolean).length;
  const done = count >= TOTAL * DONE_RATIO;
  const percent = done ? 100 : Math.round((count / TOTAL) * 100);

  useEffect(() => {
    if (done) sound.playAffectionChime();
  }, [done]);

  const shaveCell = (next: boolean[], col: number, row: number) => {
    let changed = false;
    // the blade clears the touched cell plus its horizontal neighbours
    for (let c = col - 1; c <= col + 1; c++) {
      if (c < 0 || c >= COLS || row < 0 || row >= ROWS) continue;
      const idx = row * COLS + c;
      if (!next[idx]) {
        next[idx] = true;
        changed = true;
      }
    }
    return changed;
  };

  // Shaves from the previous pointer position to this one so quick swipes leave no gaps
  const shaveAt = (clientX: number, clientY: number) => {
    const box = arm.current?.getBoundingClientRect();
    if (!box || done) return;
    const from = lastPosRef.current ?? { x: clientX, y: clientY };
    lastPosRef.current = { x: clientX, y: clientY };
    const steps = Math.max(1, Math.ceil(Math.hypot(clientX - from.x, clientY - from.y) / (box.width / COLS / 2)));
    const next = shavedRef.current.slice();
    let changed = false;
    for (let i = 1; i <= steps; i++) {
      const x = from.x + ((clientX - from.x) * i) / steps;
      const y = from.y + ((clientY - from.y) * i) / steps;
      const col = Math.floor(((x - box.left) / box.width) * COLS);
      const row = Math.floor(((y - box.top) / box.height) * ROWS);
      if (shaveCell(next, col, row)) changed = true;
    }
    if (!changed) return;
    shavedRef.current = next;
    setShaved(next);
    const now = Date.now();
    if (now - lastBuzzRef.current > 90) {
      lastBuzzRef.current = now;
      sound.playBlip(140 + Math.random() * 40);
    }
  };

  return (
    <InteractionShell
      title="🪒 THE SHAVER"
      hint={done ? undefined : 'Alat cukur barunya baru dicoba. Geser di atas lengan sampai semuanya mulus.'}
      accent="pink"
      maxWidth={520}
      onSkip={finish}
    >
      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: '#f7768e', marginBottom: '8px' }}>
        MULUS: {percent}%
      </div>

      <div
        ref={arm}
        onPointerDown={(e) => {
          draggingRef.current = true;
          lastPosRef.current = null;
          e.currentTarget.setPointerCapture(e.pointerId);
          shaveAt(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => draggingRef.current && shaveAt(e.clientX, e.clientY)}
        onPointerUp={() => {
          draggingRef.current = false;
          lastPosRef.current = null;
        }}
        onPointerCancel={() => {
          draggingRef.current = false;
          lastPosRef.current = null;
        }}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          height: '210px',
          marginBottom: '14px',
          border: '2px solid #3b4261',
          borderRadius: '40px',
          background: '#e8b99a',
          overflow: 'hidden',
          cursor: done ? 'default' : 'crosshair',
          touchAction: 'none',
          userSelect: 'none',
        }}
      >
        {shaved.map((shavedCell, i) => {
          const clean = shavedCell || done;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                lineHeight: 1,
                color: '#5a3a2a',
                background: clean ? '#f3cfb4' : '#e8b99a',
                transition: 'background 0.15s ease',
              }}
            >
              {clean ? '' : '⸝'}
            </div>
          );
        })}
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
            Mulus bersih. Sekarang saatnya menunjukkannya ke Ali dengan bangga.
          </div>
          <button
            onClick={() => {
              sound.playClick();
              finish();
            }}
            className="pixel-btn pixel-btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}
          >
            TUNJUKKAN KE ALI ▶
          </button>
        </div>
      ) : (
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#565f89', fontStyle: 'italic' }}>
          Tidak ada yang salah di sini. Cukup geser sampai bersih.
        </div>
      )}
    </InteractionShell>
  );
};
