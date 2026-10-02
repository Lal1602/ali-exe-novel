'use client';

import React, { useEffect, useRef, useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface PretendBusyProps {
  onComplete: () => void;
}

const TICK_MS = 100;
const BUSY_PER_KEY = 7;
const BUSY_DECAY = 1.1; // per tick
const EAR_PER_TICK = 2.2;

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
  const [typed, setTyped] = useState('');
  const listeningRef = useRef<string | null>(null);
  const busyRef = useRef(40);

  const done = ear >= 100;

  const startListening = (id: string) => {
    listeningRef.current = id;
    setListening(id);
  };
  const stopListening = () => {
    listeningRef.current = null;
    setListening(null);
  };

  const type = (char?: string) => {
    const next = Math.min(100, busyRef.current + BUSY_PER_KEY);
    busyRef.current = next;
    setBusy(next);
    setTyped((prev) => (prev + (char ?? '=SUM(')).slice(-28));
  };

  // Any key counts as typing in the fake spreadsheet
  useEffect(() => {
    if (done) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat && e.key.length > 1) return;
      if (e.key.length === 1) type(e.key);
      else if (e.key === 'Backspace' || e.key === 'Enter') type('');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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

  const caught = listening !== null && busy <= 0;

  useEffect(() => {
    if (done) sound.playAffectionChime();
  }, [done]);

  return (
    <InteractionShell
      title="🖥️ PURA-PURA SIBUK"
      hint={
        done
          ? undefined
          : 'Ketik apa saja supaya terlihat sibuk, sambil mengarahkan kursor (atau menahan jari) ke obrolan di sebelah.'
      }
      accent="pink"
      maxWidth={600}
      onSkip={finish}
    >
      {/* Fake spreadsheet */}
      <div style={{ border: '2px solid #3b4261', background: '#0f111a', marginBottom: '14px' }}>
        <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.48rem', color: '#565f89', padding: '4px 8px', borderBottom: '1px solid #24283b' }}>
          Sheet1 — Book1.xlsx
        </div>
        <div
          style={{
            minHeight: '34px',
            padding: '8px 10px',
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            color: '#73daca',
            wordBreak: 'break-all',
          }}
        >
          {typed || <span style={{ color: '#3b4261' }}>(kosong)</span>}
          <span className="blink">▋</span>
        </div>
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
          <button
            onClick={() => type()}
            className="pixel-btn"
            style={{ width: '100%', padding: '10px', fontSize: '0.65rem', marginBottom: '12px', touchAction: 'manipulation' }}
          >
            ⌨️ KETIK (atau tekan tombol keyboard apa saja)
          </button>

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
