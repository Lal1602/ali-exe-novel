'use client';

import React, { useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface TimelineSortProps {
  onComplete: () => void;
}

interface Entry {
  id: string;
  date: string;
  affection: string;
  note: string;
}

// Correct chronological order
const ENTRIES: Entry[] = [
  { id: 'jul', date: '26 JULI', affection: '0%', note: 'Little Cave: sebuah pengakuan.' },
  { id: 'aug8', date: '8 AGUSTUS', affection: '50% → 60%', note: 'Bertemu orang tua.' },
  { id: 'aug16', date: '16 AGUSTUS', affection: '100%', note: 'Malang: resmi pacaran.' },
];

const shuffledUnsorted = (): Entry[] => {
  let arr = [...ENTRIES];
  const isSorted = (a: Entry[]) => a.every((e, i) => e.id === ENTRIES[i].id);
  do {
    arr = [...ENTRIES];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  } while (isSorted(arr));
  return arr;
};

export const TimelineSort: React.FC<TimelineSortProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const [order, setOrder] = useState<Entry[]>(shuffledUnsorted);
  const [solved, setSolved] = useState(false);
  const [message, setMessage] = useState('');

  const move = (index: number, delta: number) => {
    if (solved) return;
    const target = index + delta;
    if (target < 0 || target >= order.length) return;
    sound.playBlip(420 + target * 60);
    const next = [...order];
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
    setMessage('');
  };

  const check = () => {
    if (order.every((e, i) => e.id === ENTRIES[i].id)) {
      sound.playAffectionChime();
      setSolved(true);
      setMessage('');
    } else {
      sound.playErrorBuzz();
      setMessage('Belum urut. Ingat, rasa itu naik dari 0% sampai 100%.');
    }
  };

  return (
    <InteractionShell
      title="🗓️ SYSTEM ARCHIVE: SUSUN TIMELINE"
      hint={solved ? undefined : 'Urutkan arsip dari yang paling awal (atas) sampai yang paling akhir (bawah).'}
      accent="purple"
      maxWidth={520}
      onSkip={finish}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
        {order.map((e, i) => (
          <div
            key={e.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              border: `2px solid ${solved ? '#73daca' : '#3b4261'}`,
              background: solved ? 'rgba(115, 218, 202, 0.08)' : '#161928',
            }}
          >
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.6rem', color: '#565f89', width: '16px' }}>{i + 1}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.65rem', color: '#e2e8f0' }}>{e.date}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#94a3b8', marginTop: '3px' }}>
                {solved ? `${e.note} · ALI: ${e.affection}` : `ALI: ${e.affection}`}
              </div>
            </div>
            {!solved && (
              <>
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="pixel-btn"
                  style={{ padding: '6px 10px' }}
                  aria-label={`Naikkan ${e.date}`}
                >
                  ▲
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === order.length - 1}
                  className="pixel-btn"
                  style={{ padding: '6px 10px' }}
                  aria-label={`Turunkan ${e.date}`}
                >
                  ▼
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <div style={{ minHeight: '22px', fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#ff9e64', fontStyle: 'italic', marginBottom: '12px' }}>
        {message}
      </div>

      {!solved ? (
        <button onClick={check} className="pixel-btn pixel-btn-primary" style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}>
          PERIKSA URUTAN
        </button>
      ) : (
        <button
          onClick={() => {
            sound.playClick();
            finish();
          }}
          className="pixel-btn pixel-btn-primary"
          style={{ width: '100%', padding: '12px', fontSize: '0.75rem', animation: 'fadeIn 0.4s ease' }}
        >
          PERTANYAAN TERAKHIR ▶
        </button>
      )}
    </InteractionShell>
  );
};
