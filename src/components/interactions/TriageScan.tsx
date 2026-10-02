'use client';

import React, { useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface TriageScanProps {
  onComplete: () => void;
}

interface Part {
  id: string;
  icon: string;
  label: string;
  hurt: boolean;
  report: string;
}

const PARTS: Part[] = [
  { id: 'head', icon: '🙂', label: 'KEPALA', hurt: false, report: 'Aman. Cuma agak malu.' },
  { id: 'elbow', icon: '💪', label: 'SIKU', hurt: true, report: 'Luka ringan. Lecet kecil.' },
  { id: 'hand', icon: '🖐️', label: 'TANGAN', hurt: false, report: 'Aman. Masih kuat pegang HP.' },
  { id: 'waist', icon: '🧍‍♀️', label: 'PINGGANG', hurt: true, report: 'Memar ringan. Jangan banyak gerak.' },
  { id: 'knee', icon: '🦵', label: 'LUTUT', hurt: true, report: 'Luka ringan. Perlu diplester.' },
  { id: 'pride', icon: '💔', label: 'HARGA DIRI', hurt: false, report: 'RUSAK PARAH. (Ini nggak dihitung luka, tapi dicatat.)' },
];

const TARGET = PARTS.filter((p) => p.hurt).length;

export const TriageScan: React.FC<TriageScanProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const [checked, setChecked] = useState<string[]>([]);
  const [report, setReport] = useState('Ali: "Mana, liat."');

  const found = checked.filter((id) => PARTS.find((p) => p.id === id)?.hurt).length;
  const done = found >= TARGET;

  const inspect = (part: Part) => {
    if (done) return;
    if (!checked.includes(part.id)) setChecked((c) => [...c, part.id]);
    setReport(`${part.label}: ${part.report}`);
    if (part.hurt) sound.playAffectionChime();
    else sound.playClick();
  };

  return (
    <InteractionShell
      title="🩹 THE FALL: SCAN LUKA"
      hint={done ? undefined : 'Begitu bangun, hal pertama yang Ali lakukan adalah memastikan Cegil baik-baik saja. Periksa bagian tubuhnya.'}
      accent="pink"
      maxWidth={520}
      onSkip={finish}
    >
      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: '#f7768e', marginBottom: '10px' }}>
        LUKA DITEMUKAN: {found} / {TARGET}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
        {PARTS.map((p) => {
          const isChecked = checked.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => inspect(p)}
              className="pixel-btn"
              style={{
                padding: '14px 6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                borderColor: isChecked ? (p.hurt ? '#f7768e' : '#73daca') : '#3b4261',
                background: isChecked ? (p.hurt ? 'rgba(247, 118, 142, 0.15)' : 'rgba(115, 218, 202, 0.1)') : '#161928',
                touchAction: 'manipulation',
              }}
            >
              <span style={{ fontSize: '1.6rem' }}>{p.icon}</span>
              <span style={{ fontSize: '0.5rem' }}>{p.label}</span>
              {isChecked && (
                <span style={{ fontSize: '0.42rem', color: p.hurt ? '#f7768e' : '#73daca' }}>
                  {p.hurt ? 'LUKA' : 'AMAN'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ minHeight: '44px', padding: '10px 14px', borderLeft: '3px solid #bb9af7', background: 'rgba(187, 154, 247, 0.1)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#e0def4', fontStyle: 'italic', marginBottom: '14px' }}>
        {report}
      </div>

      {done && (
        <button
          onClick={() => {
            sound.playClick();
            finish();
          }}
          className="pixel-btn pixel-btn-primary"
          style={{ width: '100%', padding: '12px', fontSize: '0.75rem', animation: 'fadeIn 0.4s ease' }}
        >
          BACA KENANGANNYA ▶
        </button>
      )}
    </InteractionShell>
  );
};
