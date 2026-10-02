'use client';

import React, { useState } from 'react';
import { sound } from '@/utils/audio';
import { useSingleShot } from '@/hooks/useSingleShot';
import { InteractionShell } from './InteractionShell';

interface CharacterBuildProps {
  onComplete: () => void;
}

const TOTAL_POINTS = 9;
const MAX_PER_STAT = 5;

const STATS = [
  { key: 'responsibility', label: 'RESPONSIBILITY', icon: '🧱', desc: 'Tahu apa yang jadi tanggung jawabnya dan tidak lari.' },
  { key: 'protectiveness', label: 'PROTECTIVENESS', icon: '🛡️', desc: 'Datang ke meja kerja begitu tahu Cegil jatuh.' },
  { key: 'commonsense', label: 'COMMON SENSE', icon: '🧠', desc: '"Aku mengusahakan, bukan menjamin."' },
] as const;

type StatKey = (typeof STATS)[number]['key'];

export const CharacterBuild: React.FC<CharacterBuildProps> = ({ onComplete }) => {
  const finish = useSingleShot(onComplete);
  const [points, setPoints] = useState<Record<StatKey, number>>({
    responsibility: 0,
    protectiveness: 0,
    commonsense: 0,
  });
  const [locked, setLocked] = useState(false);

  const used = Object.values(points).reduce((a, b) => a + b, 0);
  const remaining = TOTAL_POINTS - used;

  const change = (key: StatKey, delta: number) => {
    if (locked) return;
    const next = points[key] + delta;
    if (next < 0 || next > MAX_PER_STAT) return;
    if (delta > 0 && remaining <= 0) return;
    sound.playBlip(delta > 0 ? 520 : 380);
    setPoints({ ...points, [key]: next });
  };

  const lockBuild = () => {
    sound.playAffectionChime();
    setLocked(true);
  };

  return (
    <InteractionShell
      title="🛠️ CHARACTER BUILD: ALI"
      hint={
        locked
          ? undefined
          : `Bagikan ${TOTAL_POINTS} poin ke tiga skill utama. Maksimal ${MAX_PER_STAT} per skill.`
      }
      accent="green"
      maxWidth={560}
      onSkip={finish}
    >
      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.58rem', color: '#e0af68', marginBottom: '12px' }}>
        CLASS: BOCIL MATANG · SISA POIN: {remaining}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
        {STATS.map((s) => (
          <div key={s.key} style={{ border: '2px solid #3b4261', background: '#161928', padding: '10px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.58rem', color: '#e2e8f0', marginBottom: '6px' }}>
                  {s.label}
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {Array.from({ length: MAX_PER_STAT }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: '8px',
                        background: i < points[s.key] ? '#73daca' : '#0f111a',
                        border: '1px solid #3b4261',
                      }}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={() => change(s.key, -1)}
                disabled={locked || points[s.key] === 0}
                className="pixel-btn"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                aria-label={`Kurangi ${s.label}`}
              >
                −
              </button>
              <button
                onClick={() => change(s.key, 1)}
                disabled={locked || remaining === 0 || points[s.key] === MAX_PER_STAT}
                className="pixel-btn"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                aria-label={`Tambah ${s.label}`}
              >
                +
              </button>
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#94a3b8', marginTop: '6px', fontStyle: 'italic' }}>
              {s.desc}
            </div>
          </div>
        ))}
      </div>

      {!locked ? (
        <button
          onClick={lockBuild}
          disabled={remaining > 0}
          className="pixel-btn pixel-btn-primary"
          style={{ width: '100%', padding: '12px', fontSize: '0.72rem', opacity: remaining > 0 ? 0.5 : 1 }}
        >
          {remaining > 0 ? `HABISKAN ${remaining} POIN LAGI` : 'KUNCI BUILD ▶'}
        </button>
      ) : (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          <div
            style={{
              padding: '12px 16px',
              border: '2px dashed #73daca',
              background: 'rgba(115, 218, 202, 0.1)',
              marginBottom: '14px',
            }}
          >
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.6rem', color: '#73daca', marginBottom: '6px' }}>
              PASSIVE UNLOCKED: GENTLE SIDE
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#e0def4', fontStyle: 'italic' }}>
              Cuek di depan banyak orang, tapi lembut saat tidak ada yang melihat.
            </div>
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
